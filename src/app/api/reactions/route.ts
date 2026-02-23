/**
 * /api/reactions — Reactions por página (❤️ 🔥 💡).
 *
 * GET  ?path=/dicas/ai-tips  → { heart, fire, bulb, userVote }
 * POST { path, type }        → { ok, userVote }
 *
 * Comportamento do voto:
 *  - Sem voto anterior  → adiciona
 *  - Mesmo tipo votado  → remove (toggle off)
 *  - Tipo diferente     → troca (remove antigo, adiciona novo)
 *
 * Deduplicação: TTL key de 24h por IP+path+type.
 * Os counts são gerenciados pelo cliente via optimistic update + localStorage.
 */

import { createHash } from "node:crypto";

import { z } from "zod";

import { getClientIp, rateLimitResponse } from "@/lib/rate-limit";
import { redis } from "@/lib/redis";
import { rateLimitAsync } from "@/lib/redis-rate-limit";

const REACTION_TYPES = ["heart", "fire", "bulb"] as const;
type ReactionType = (typeof REACTION_TYPES)[number];

const SAFE_PATH_REGEX = /^\/[a-zA-Z0-9\-/_]*$/;

const postSchema = z.object({
  path: z
    .string()
    .min(1)
    .max(200)
    .refine((p) => SAFE_PATH_REGEX.test(p)),
  type: z.enum(REACTION_TYPES),
});

type ReactionCounts = Record<ReactionType, number>;

function reactionsKey(path: string) {
  return `reactions:${path}`;
}

function lockKey(ipHash: string, path: string, type: ReactionType) {
  return `reaction:lock:${ipHash}:${path}:${type}`;
}

function getIpHash(ip: string): string {
  const salt = process.env.ANALYTICS_SALT ?? "";
  return createHash("sha256")
    .update(ip + salt)
    .digest("hex")
    .slice(0, 16);
}

async function getCounts(path: string): Promise<ReactionCounts> {
  if (!redis) return { heart: 0, fire: 0, bulb: 0 };
  try {
    const raw = (await redis.hmget(
      reactionsKey(path),
      "heart",
      "fire",
      "bulb",
    )) as unknown as (string | null)[];
    return {
      heart: Math.max(0, Number(raw?.[0]) || 0),
      fire: Math.max(0, Number(raw?.[1]) || 0),
      bulb: Math.max(0, Number(raw?.[2]) || 0),
    };
  } catch {
    return { heart: 0, fire: 0, bulb: 0 };
  }
}

async function getCurrentVote(
  ipHash: string,
  path: string,
): Promise<ReactionType | null> {
  if (!redis) return null;
  // Pipeline: 1 HTTP call em vez de 3 sequenciais (Upstash é REST-based)
  const pipeline = redis.pipeline();
  for (const type of REACTION_TYPES) {
    pipeline.exists(lockKey(ipHash, path, type));
  }
  const results = (await pipeline.exec()) as number[];
  for (let i = 0; i < REACTION_TYPES.length; i++) {
    if (results[i]) return REACTION_TYPES[i];
  }
  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") ?? "";

  if (!path || !SAFE_PATH_REGEX.test(path)) {
    return Response.json({ heart: 0, fire: 0, bulb: 0, userVote: null });
  }

  const counts = await getCounts(path);

  let userVote: ReactionType | null = null;
  if (redis) {
    try {
      const ip = getClientIp(request);
      userVote = await getCurrentVote(getIpHash(ip), path);
    } catch {
      // silencioso
    }
  }

  return Response.json({ ...counts, userVote });
}

export async function POST(request: Request) {
  // Sem Redis: retorna só ok para preservar o optimistic update no cliente
  if (!redis) return Response.json({ ok: true });

  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return Response.json({ error: "Invalid" }, { status: 400 });
    }

    const ip = getClientIp(request);
    const rl = await rateLimitAsync(ip, {
      prefix: "reactions",
      limit: 15,
      windowSeconds: 60,
    });
    if (!rl.success) return rateLimitResponse(rl);

    const body = await request.json().catch(() => null);
    const parsed = postSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: "Invalid" }, { status: 400 });
    }

    const { path, type } = parsed.data;
    const ipHash = getIpHash(ip);
    const previousVote = await getCurrentVote(ipHash, path);

    const pipeline = redis.pipeline();

    if (previousVote === type) {
      // Toggle off: remove voto
      pipeline.del(lockKey(ipHash, path, type));
      pipeline.hincrby(reactionsKey(path), type, -1);
    } else {
      if (previousVote) {
        // Troca: remove voto anterior
        pipeline.del(lockKey(ipHash, path, previousVote));
        pipeline.hincrby(reactionsKey(path), previousVote, -1);
      }
      // Adiciona novo voto
      pipeline.set(lockKey(ipHash, path, type), "1", { ex: 86400 });
      pipeline.hincrby(reactionsKey(path), type, 1);
    }

    await pipeline.exec();

    // Não relemos counts do Redis: o optimistic update do cliente já é exato.
    // Retornamos só o userVote confirmado para sincronizar o estado de seleção.
    const userVote = previousVote === type ? null : type;

    return Response.json({ ok: true, userVote });
  } catch (err) {
    console.error("[Reactions API]", err);
    return Response.json({ ok: true });
  }
}
