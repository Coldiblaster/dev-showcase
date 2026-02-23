/**
 * POST /api/stats/track — Registra page view no Upstash Redis.
 *
 * Incrementa: total de views (INCR), visitantes únicos (HyperLogLog),
 * ranking geral de páginas (Sorted Set) e ranking semanal (Sorted Set c/ TTL).
 * Filtra bots conhecidos via User-Agent.
 */

import { createHash } from "node:crypto";

import { z } from "zod";

import { getClientIp, rateLimitResponse } from "@/lib/rate-limit";
import { redis } from "@/lib/redis";
import { rateLimitAsync } from "@/lib/redis-rate-limit";
import { getIsoWeekKey } from "@/lib/week-key";

const BOT_PATTERN =
  /bot|crawl|spider|slurp|facebookexternalhit|mediapartners|google|bing|yandex|baidu|duckduck|semrush|ahrefs|mj12bot|dotbot|petalbot|bytespider|gptbot|claude|headless|phantom|selenium|puppeteer|playwright|lighthouse|pagespeed|pingdom|uptimerobot|curl|wget|python[\s/-]|python-requests|node-fetch|axios|java\/|go-http-client|okhttp|ruby|perl|php/i;

/** Apenas paths relativos seguros para armazenar e exibir (evita XSS/redirect via javascript:, data:, //). */
const SAFE_PATH_REGEX = /^\/[a-zA-Z0-9\-/_]*$/;

const bodySchema = z.object({
  path: z
    .string()
    .min(1)
    .max(200)
    .refine((p) => SAFE_PATH_REGEX.test(p), { message: "Invalid path format" }),
});

function isBot(request: Request): boolean {
  const ua = request.headers.get("user-agent") ?? "";
  if (!ua || ua.length < 10) return true;
  return BOT_PATTERN.test(ua);
}

export async function POST(request: Request) {
  if (!redis) {
    return Response.json({ ok: true });
  }

  try {
    if (isBot(request)) {
      return Response.json({ ok: true });
    }

    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return Response.json({ error: "Invalid" }, { status: 400 });
    }

    const ip = getClientIp(request);
    const rl = await rateLimitAsync(ip, {
      prefix: "stats-track",
      limit: 60,
      windowSeconds: 60,
    });
    if (!rl.success) return rateLimitResponse(rl);

    const body = await request.json().catch(() => null);
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: "Invalid" }, { status: 400 });
    }

    // Usa salt dedicado para não depender do token do Redis.
    // Se ANALYTICS_SALT não estiver definido, usa o token como fallback temporário.
    const salt =
      process.env.ANALYTICS_SALT ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? "";
    const ipHash = createHash("sha256")
      .update(ip + salt)
      .digest("hex")
      .slice(0, 16);

    const weekKey = getIsoWeekKey();
    const pathParts = parsed.data.path.split("/").filter(Boolean);
    const pipeline = redis.pipeline();
    pipeline.incr("stats:views");
    pipeline.pfadd("stats:visitors", ipHash);
    pipeline.zincrby("stats:pages", 1, parsed.data.path);
    pipeline.zincrby(weekKey, 1, parsed.data.path);
    // TTL de 14 dias — NX: só define se ainda não tem TTL (evita reset a cada view)
    pipeline.expire(weekKey, 14 * 24 * 3600, "NX");
    // Ranking por categoria (ex: stats:pages:dicas) — apenas para conteúdo com depth ≥ 2
    if (pathParts.length >= 2) {
      pipeline.zincrby(`stats:pages:${pathParts[0]}`, 1, parsed.data.path);
    }
    await pipeline.exec();

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[Stats Track]", err);
    return Response.json({ ok: true });
  }
}
