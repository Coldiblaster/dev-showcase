/**
 * POST /api/stats/track — Registra page view no Upstash Redis.
 *
 * Incrementa: total de views (INCR), visitantes únicos (HyperLogLog),
 * e ranking de páginas (Sorted Set).
 * Filtra bots conhecidos via User-Agent.
 */

import { createHash } from "node:crypto";

import { z } from "zod";

import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { redis } from "@/lib/redis";

const BOT_PATTERN =
  /bot|crawl|spider|slurp|facebookexternalhit|mediapartners|google|bing|yandex|baidu|duckduck|semrush|ahrefs|mj12bot|dotbot|petalbot|bytespider|gptbot|claude|headless|phantom|selenium|puppeteer|playwright|lighthouse|pagespeed|pingdom|uptimerobot/i;

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

    const ip = getClientIp(request);
    const rl = rateLimit(ip, {
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

    const ipHash = createHash("sha256")
      .update(ip + process.env.UPSTASH_REDIS_REST_TOKEN)
      .digest("hex")
      .slice(0, 16);

    const pipeline = redis.pipeline();
    pipeline.incr("stats:views");
    pipeline.pfadd("stats:visitors", ipHash);
    pipeline.zincrby("stats:pages", 1, parsed.data.path);
    await pipeline.exec();

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[Stats Track]", err);
    return Response.json({ ok: true });
  }
}
