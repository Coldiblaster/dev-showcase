/**
 * /api/search — Rastreia e retorna buscas populares.
 *
 * POST { term } → registra um termo de busca no Sorted Set stats:searches
 * GET           → retorna os top 8 termos mais buscados
 *
 * Termos são normalizados (lowercase, trim) e limitados a 60 chars.
 * Rate limiting leve para evitar manipulação do ranking.
 */

import { z } from "zod";

import { getClientIp, rateLimitResponse } from "@/lib/rate-limit";
import { redis } from "@/lib/redis";
import { rateLimitAsync } from "@/lib/redis-rate-limit";

const SEARCH_KEY = "stats:searches";
const MAX_TERMS = 8;

const postSchema = z.object({
  term: z
    .string()
    .min(2)
    .max(60)
    .transform((s) => s.trim().toLowerCase()),
});

export async function GET() {
  if (!redis) return Response.json({ terms: [] });
  try {
    const raw = await redis.zrange(SEARCH_KEY, 0, MAX_TERMS - 1, { rev: true });
    return Response.json(
      { terms: raw as string[] },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      },
    );
  } catch {
    return Response.json({ terms: [] });
  }
}

export async function POST(request: Request) {
  if (!redis) return Response.json({ ok: true });
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return Response.json({ error: "Invalid" }, { status: 400 });
    }

    const ip = getClientIp(request);
    const rl = await rateLimitAsync(ip, {
      prefix: "search-track",
      limit: 30,
      windowSeconds: 60,
    });
    if (!rl.success) return rateLimitResponse(rl);

    const body = await request.json().catch(() => null);
    const parsed = postSchema.safeParse(body);
    if (!parsed.success) return Response.json({ ok: true });

    await redis.zincrby(SEARCH_KEY, 1, parsed.data.term);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: true });
  }
}
