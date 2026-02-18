/**
 * GET /api/stats — Retorna stats agregados da plataforma.
 *
 * Dados: total de views, visitantes únicos (HyperLogLog) e top 5 páginas.
 * Cache: in-memory 60s + Cache-Control para CDN.
 */

import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { redis } from "@/lib/redis";

interface StatsResponse {
  views: number;
  visitors: number;
  topPages: Array<{ path: string; views: number }>;
}

const CACHE_TTL = 60_000;
let cache: { data: StatsResponse | null; updatedAt: number } = {
  data: null,
  updatedAt: 0,
};

const EMPTY_STATS: StatsResponse = { views: 0, visitors: 0, topPages: [] };

export async function GET(request: Request) {
  if (!redis) {
    return Response.json(EMPTY_STATS, {
      headers: { "Cache-Control": "public, s-maxage=60" },
    });
  }

  try {
    const ip = getClientIp(request);
    const rl = rateLimit(ip, {
      prefix: "stats-read",
      limit: 30,
      windowSeconds: 60,
    });
    if (!rl.success) return rateLimitResponse(rl);

    const now = Date.now();
    if (cache.data && now - cache.updatedAt < CACHE_TTL) {
      return Response.json(cache.data, {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          "X-Cache": "HIT",
        },
      });
    }

    const pipeline = redis.pipeline();
    pipeline.get("stats:views");
    pipeline.pfcount("stats:visitors");
    pipeline.zrange("stats:pages", 0, 4, { rev: true, withScores: true });

    const results = await pipeline.exec();

    const views = (results[0] as number) ?? 0;
    const visitors = (results[1] as number) ?? 0;
    const rawPages = (results[2] as string[]) ?? [];

    const topPages: StatsResponse["topPages"] = [];
    for (let i = 0; i < rawPages.length; i += 2) {
      topPages.push({
        path: rawPages[i],
        views: Number(rawPages[i + 1]) || 0,
      });
    }

    const data: StatsResponse = { views, visitors, topPages };
    cache = { data, updatedAt: now };

    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "X-Cache": "MISS",
      },
    });
  } catch (err) {
    console.error("[Stats API]", err);

    if (cache.data) {
      return Response.json(cache.data, {
        headers: { "Cache-Control": "public, s-maxage=30", "X-Cache": "STALE" },
      });
    }

    return Response.json(EMPTY_STATS, { status: 500 });
  }
}
