/**
 * GET /api/lighthouse — Scores do Lighthouse via Google PageSpeed Insights API.
 *
 * Fluxo:
 * 1. Se PAGESPEED_INSIGHTS_API_KEY ausente → fallback estático
 * 2. Se Redis configurado → tenta cache (24h)
 * 3. Se cache in-memory válido → retorna do cache
 * 4. Chama https://pagespeedonline.googleapis.com/.../runPagespeed
 * 5. Salva no cache e retorna
 *
 * A API do Google demora ~5–10s; cache é essencial.
 */

import { PERSONAL } from "@/lib/constants";
import { redis } from "@/lib/redis";
import type {
  LighthouseMetrics,
  LighthouseResponse,
  LighthouseScores,
} from "@/types/lighthouse";

const CACHE_KEY_PREFIX = "lighthouse:scores";
const CACHE_TTL = 86_400; // 24 horas em segundos
type Strategy = "mobile" | "desktop";
const PAGE_SPEED_API =
  "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed";

interface CachedData {
  scores: LighthouseScores;
  metrics: LighthouseMetrics;
}
/** Cache in-memory por chave strategy:path (ex.: desktop:/dicas). */
const memoryCache = new Map<string, { data: CachedData; updatedAt: number }>();

/**
 * Normaliza path para cache: começa com /, sem trailing slash; "" vira "/".
 * Rejeita path que não seja do próprio site (ex.: "//evil.com").
 */
function normalizePath(path: string | null): string {
  if (!path || typeof path !== "string") return "/";
  const trimmed = path.trim();
  if (!trimmed || !trimmed.startsWith("/") || trimmed.startsWith("//"))
    return "/";
  return trimmed.replace(/\/+$/, "") || "/";
}

/** Fallback quando a API não está configurada ou falha */
const FALLBACK_SCORES: LighthouseScores = {
  performance: 95,
  accessibility: 100,
  bestPractices: 100,
  seo: 100,
};

const AUDIT_IDS = {
  lcp: "largest-contentful-paint",
  fcp: "first-contentful-paint",
  ttfb: "server-response-time", // ou document-request-latency (Lighthouse 13+)
  cls: "cumulative-layout-shift",
  tbt: "total-blocking-time",
} as const;

function toNum(val: unknown): number | undefined {
  if (typeof val === "number" && !Number.isNaN(val)) return val;
  if (typeof val === "string") {
    const n = parseFloat(val);
    return Number.isNaN(n) ? undefined : n;
  }
  return undefined;
}

function parseDisplayValue(displayValue: unknown): number | undefined {
  if (typeof displayValue !== "string") return undefined;
  const match = displayValue.match(/[\d.,]+/);
  if (!match) return undefined;
  const num = parseFloat(match[0].replace(",", ""));
  if (Number.isNaN(num)) return undefined;
  if (displayValue.includes("s") && !displayValue.includes("ms"))
    return num * 1000;
  return num;
}

function parseMetrics(
  audits: Record<string, { numericValue?: unknown; displayValue?: unknown }>,
): LighthouseMetrics {
  const metrics: LighthouseMetrics = {};
  const getVal = (id: string, altId?: string) => {
    const a = audits[id] ?? (altId ? audits[altId] : undefined);
    return toNum(a?.numericValue) ?? parseDisplayValue(a?.displayValue);
  };
  const lcp = getVal(AUDIT_IDS.lcp);
  const fcp = getVal(AUDIT_IDS.fcp);
  const ttfb = getVal(AUDIT_IDS.ttfb, "document-request-latency");
  const cls = getVal(AUDIT_IDS.cls);
  const tbt = getVal(AUDIT_IDS.tbt);
  if (lcp != null) metrics.lcp = Math.round(lcp);
  if (fcp != null) metrics.fcp = Math.round(fcp);
  if (ttfb != null) metrics.ttfb = Math.round(ttfb);
  if (cls != null) metrics.cls = Math.round(cls * 1000) / 1000;
  if (tbt != null) metrics.tbt = Math.round(tbt);
  return metrics;
}

function parseScores(data: unknown): {
  scores: LighthouseScores;
  metrics: LighthouseMetrics;
} | null {
  try {
    const obj = data as {
      lighthouseResult?: {
        categories?: {
          performance?: { score?: number };
          accessibility?: { score?: number };
          "best-practices"?: { score?: number };
          seo?: { score?: number };
        };
        audits?: Record<
          string,
          { numericValue?: unknown; displayValue?: unknown }
        >;
      };
    };
    const lr = obj?.lighthouseResult;
    const cats = lr?.categories;
    if (!cats) return null;

    const toPercent = (s: number | undefined) =>
      s != null ? Math.round(s * 100) : null;

    const performance = toPercent(cats.performance?.score);
    const accessibility = toPercent(cats.accessibility?.score);
    const bestPractices = toPercent(cats["best-practices"]?.score);
    const seo = toPercent(cats.seo?.score);

    if (
      performance == null ||
      accessibility == null ||
      bestPractices == null ||
      seo == null
    ) {
      return null;
    }

    const metrics = lr?.audits ? parseMetrics(lr.audits) : {};

    return {
      scores: { performance, accessibility, bestPractices, seo },
      metrics,
    };
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const apiKey = process.env.PAGESPEED_INSIGHTS_API_KEY;
  const pathParam = searchParams.get("path");
  const urlParam = searchParams.get("url");
  const forceRefresh = searchParams.get("refresh") === "1";
  const strategyParam = searchParams.get("strategy");
  const strategy: Strategy =
    strategyParam === "mobile" || strategyParam === "desktop"
      ? strategyParam
      : "desktop";

  // URL a analisar: path (pathname do site) ou url explícita (mesmo host) ou home
  const normalizedPath = normalizePath(pathParam ?? null);
  const siteHost = new URL(PERSONAL.siteUrl).hostname;
  const urlToAnalyze =
    urlParam && urlParam.startsWith("http")
      ? (() => {
          try {
            const u = new URL(urlParam);
            if (u.hostname !== siteHost)
              return new URL(normalizedPath, PERSONAL.siteUrl).href;
            return urlParam;
          } catch {
            return new URL(normalizedPath, PERSONAL.siteUrl).href;
          }
        })()
      : new URL(normalizedPath, PERSONAL.siteUrl).href;

  const cacheKey = `${CACHE_KEY_PREFIX}:${strategy}:${normalizedPath}`;
  const memoryCacheKey = `${strategy}:${normalizedPath}`;

  if (!apiKey) {
    return Response.json(
      {
        scores: FALLBACK_SCORES,
        source: "fallback" as const,
        reason: "PAGESPEED_INSIGHTS_API_KEY não configurada em .env.local",
      } satisfies LighthouseResponse,
      { headers: { "Cache-Control": "public, s-maxage=3600" } },
    );
  }

  const jsonResponse = (
    scores: LighthouseScores,
    source: LighthouseResponse["source"],
    cacheControl = "public, s-maxage=3600, stale-while-revalidate=86400",
    reason?: string,
    metrics?: LighthouseMetrics,
  ) =>
    Response.json(
      {
        scores,
        source,
        strategy,
        ...(metrics && Object.keys(metrics).length > 0 && { metrics }),
        ...(reason && { reason }),
      } satisfies LighthouseResponse,
      { headers: { "Cache-Control": cacheControl } },
    );

  try {
    // 1. Cache Redis (24h) — ignorado se ?refresh=1
    if (redis && !forceRefresh) {
      const cached = await redis.get(cacheKey);
      if (cached) {
        const raw = typeof cached === "string" ? JSON.parse(cached) : cached;
        const parsed = raw as CachedData | LighthouseScores;
        const scores = "scores" in parsed ? parsed.scores : parsed;
        const metrics = "metrics" in parsed ? parsed.metrics : undefined;
        return jsonResponse(scores, "redis", undefined, undefined, metrics);
      }
    }

    // 2. Cache in-memory (24h) — ignorado se ?refresh=1
    const now = Date.now();
    const mem = memoryCache.get(memoryCacheKey);
    if (!forceRefresh && mem && now - mem.updatedAt < CACHE_TTL * 1000) {
      return jsonResponse(
        mem.data.scores,
        "memory",
        undefined,
        undefined,
        mem.data.metrics,
      );
    }

    // 3. Chamar Google PageSpeed Insights API
    const apiUrl = new URL(PAGE_SPEED_API);
    apiUrl.searchParams.set("url", urlToAnalyze);
    apiUrl.searchParams.set("key", apiKey);
    apiUrl.searchParams.set("strategy", strategy);
    // Sem category, a API retorna apenas Performance — precisamos das 4 categorias
    ["PERFORMANCE", "ACCESSIBILITY", "BEST_PRACTICES", "SEO"].forEach((cat) =>
      apiUrl.searchParams.append("category", cat),
    );

    const res = await fetch(apiUrl.toString());

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Lighthouse API] PageSpeed error:", res.status, errText);
      return jsonResponse(
        FALLBACK_SCORES,
        "fallback",
        "public, s-maxage=300",
        `Google API retornou ${res.status}`,
      );
    }

    const json = await res.json();
    const parsed = parseScores(json);

    if (!parsed) {
      return jsonResponse(
        FALLBACK_SCORES,
        "fallback",
        "public, s-maxage=300",
        "Resposta do Google em formato inesperado",
      );
    }

    const { scores, metrics } = parsed;

    // 4. Salvar no cache
    const cacheData: CachedData = { scores, metrics };
    const cacheJson = JSON.stringify(cacheData);
    if (redis) {
      await redis.setex(cacheKey, CACHE_TTL, cacheJson);
    }
    memoryCache.set(memoryCacheKey, { data: cacheData, updatedAt: now });

    return jsonResponse(scores, "api", undefined, undefined, metrics);
  } catch (err) {
    console.error("[Lighthouse API]", err);
    return jsonResponse(
      FALLBACK_SCORES,
      "fallback",
      "public, s-maxage=300",
      err instanceof Error ? err.message : "Erro ao chamar Google API",
    );
  }
}
