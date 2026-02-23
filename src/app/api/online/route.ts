/**
 * /api/online — Rastreia e retorna usuários ativos nos últimos 5 minutos.
 *
 * POST: registra presença do usuário (chamado pelo ViewTracker).
 * GET:  retorna contagem de usuários ativos (polled pelo OnlineCounter).
 *
 * Estratégia: Sorted Set com score = timestamp Unix (segundos).
 * ZADD adiciona/atualiza o membro, ZREMRANGEBYSCORE limpa os expirados,
 * ZCARD retorna o total. Sem TTL global — limpeza é feita a cada chamada.
 */

import { createHash } from "node:crypto";

import { getClientIp } from "@/lib/rate-limit";
import { redis } from "@/lib/redis";

const KEY = "online:sessions";
const WINDOW_SECONDS = 300; // 5 minutos

function getIpHash(ip: string): string {
  const salt = process.env.ANALYTICS_SALT ?? "";
  return createHash("sha256")
    .update(ip + salt)
    .digest("hex")
    .slice(0, 16);
}

export async function POST(request: Request) {
  if (!redis) return Response.json({ ok: true });

  try {
    const ip = getClientIp(request);
    if (ip === "unknown") return Response.json({ ok: true });

    const ipHash = getIpHash(ip);
    const now = Math.floor(Date.now() / 1000);
    const cutoff = now - WINDOW_SECONDS;

    const pipeline = redis.pipeline();
    pipeline.zadd(KEY, { score: now, member: ipHash });
    pipeline.zremrangebyscore(KEY, 0, cutoff);
    pipeline.zcard(KEY);
    const results = await pipeline.exec();

    const count = (results[2] as number) ?? 0;
    return Response.json({ count });
  } catch {
    return Response.json({ count: 0 });
  }
}

export async function GET() {
  if (!redis) return Response.json({ count: 0 });

  try {
    const now = Math.floor(Date.now() / 1000);
    const cutoff = now - WINDOW_SECONDS;

    const pipeline = redis.pipeline();
    pipeline.zremrangebyscore(KEY, 0, cutoff);
    pipeline.zcard(KEY);
    const results = await pipeline.exec();

    const count = (results[1] as number) ?? 0;
    return Response.json(
      { count },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json({ count: 0 });
  }
}
