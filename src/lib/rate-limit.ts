/**
 * Rate limiter in-memory para API routes.
 *
 * Usa fixed window por IP (não sliding window — o contador reseta num ponto
 * fixo no tempo, não em janela deslizante).
 * Funciona em serverless (Vercel Functions) com a ressalva de que cada cold
 * start reseta o contador. Para produção com alto tráfego, use Upstash Redis.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, entry] of store) {
    if (now > entry.resetAt) {
      store.delete(key);
    }
  }
}

interface RateLimitConfig {
  /** Identificador do rate limiter (ex: "chat", "contact") */
  prefix: string;
  /** Máximo de requests permitidos na janela */
  limit: number;
  /** Janela de tempo em segundos */
  windowSeconds: number;
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
}

/**
 * Extrai o IP do request (Vercel, Cloudflare, fallback).
 */
export function getClientIp(request: Request): string {
  const headers = new Headers(request.headers);
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

/**
 * Verifica se o request está dentro do limite.
 *
 * @example
 * ```ts
 * const ip = getClientIp(request);
 * const result = rateLimit(ip, { prefix: "chat", limit: 20, windowSeconds: 60 });
 * if (!result.success) {
 *   return new Response("Too many requests", { status: 429 });
 * }
 * ```
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig,
): RateLimitResult {
  cleanup();

  const key = `${config.prefix}:${identifier}`;
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + config.windowSeconds * 1000;
    store.set(key, { count: 1, resetAt });
    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - 1,
      resetAt,
    };
  }

  entry.count += 1;

  if (entry.count > config.limit) {
    return {
      success: false,
      limit: config.limit,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  return {
    success: true,
    limit: config.limit,
    remaining: config.limit - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Helper para retornar Response 429 com headers padrão.
 */
export function rateLimitResponse(result: RateLimitResult): Response {
  const retryAfter = Math.ceil((result.resetAt - Date.now()) / 1000);

  return new Response(
    JSON.stringify({ error: "Muitas requisições. Tente novamente em breve." }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfter),
        "X-RateLimit-Limit": String(result.limit),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": String(result.resetAt),
      },
    },
  );
}
