/** Trechos de código exibidos na página de implementação Analytics. */

export const REDIS_CLIENT = `import { Redis } from "@upstash/redis";

const hasRedisConfig =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis = hasRedisConfig
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;`;

export const TRACK_ROUTE = `// POST /api/stats/track
import { createHash } from "node:crypto";
import { z } from "zod";
import { redis } from "@/lib/redis";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

const BOT_PATTERN = /bot|crawl|spider|slurp|.../i;
const bodySchema = z.object({ path: z.string().min(1).max(200) });

function isBot(request: Request): boolean {
  const ua = request.headers.get("user-agent") ?? "";
  return !ua || ua.length < 10 || BOT_PATTERN.test(ua);
}

export async function POST(request: Request) {
  if (!redis) return Response.json({ ok: true });
  if (isBot(request)) return Response.json({ ok: true });

  const ip = getClientIp(request);
  const rl = rateLimit(ip, { prefix: "stats-track", limit: 60, windowSeconds: 60 });
  if (!rl.success) return rateLimitResponse(rl);

  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Invalid" }, { status: 400 });

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
}`;

export const STATS_ROUTE = `// GET /api/stats
const CACHE_TTL = 60_000;
let cache = { data: null, updatedAt: 0 };

export async function GET(request: Request) {
  if (!redis) return Response.json(EMPTY_STATS, { headers: { "Cache-Control": "public, s-maxage=60" } });

  const rl = rateLimit(ip, { prefix: "stats-read", limit: 30, windowSeconds: 60 });
  if (!rl.success) return rateLimitResponse(rl);

  if (cache.data && Date.now() - cache.updatedAt < CACHE_TTL) {
    return Response.json(cache.data, { headers: { "X-Cache": "HIT", ... } });
  }

  const pipeline = redis.pipeline();
  pipeline.get("stats:views");
  pipeline.pfcount("stats:visitors");
  pipeline.zrange("stats:pages", 0, 4, { rev: true, withScores: true });
  const results = await pipeline.exec();

  const data = { views, visitors, topPages };
  cache = { data, updatedAt: Date.now() };
  return Response.json(data, { headers: { "X-Cache": "MISS", "Cache-Control": "..." } });
}`;

export const VIEW_TRACKER = `"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const path = pathname.replace(/^\\/(pt-BR|en|es|de)/, "") || "/";
    const storageKey = \`tracked:\${path}\`;
    if (sessionStorage.getItem(storageKey)) return;

    sessionStorage.setItem(storageKey, "1");
    const body = JSON.stringify({ path });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/stats/track", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/stats/track", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
    }
  }, [pathname]);

  return null;
}`;

export const USE_SITE_STATS = `"use client";
import { useCallback, useEffect, useState } from "react";

export function useSiteStats() {
  const [stats, setStats] = useState({ views: 0, visitors: 0, topPages: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/stats");
      if (!res.ok) throw new Error();
      setStats(await res.json());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);
  return { stats, loading, error, retry: fetchStats };
}`;
