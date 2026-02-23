/**
 * Rate limiter distribuído via Upstash Redis.
 *
 * Usa fixed window por IP com dois comandos atômicos (INCR + EXPIRE).
 * Funciona corretamente entre múltiplas instâncias serverless — diferente do
 * in-memory que reseta a cada cold start.
 *
 * Fallback: se Redis não estiver disponível, delega ao rate limiter in-memory.
 */

import {
  rateLimit as inMemoryRateLimit,
  type RateLimitConfig,
  type RateLimitResult,
} from "@/lib/rate-limit";
import { redis } from "@/lib/redis";

/**
 * Verifica o rate limit via Redis. Cai silenciosamente para in-memory se Redis
 * estiver indisponível, garantindo zero downtime.
 */
export async function rateLimitAsync(
  identifier: string,
  config: RateLimitConfig,
): Promise<RateLimitResult> {
  if (!redis) {
    return inMemoryRateLimit(identifier, config);
  }

  if (identifier === "unknown") {
    return {
      success: true,
      limit: config.limit,
      remaining: config.limit,
      resetAt: Date.now() + config.windowSeconds * 1000,
    };
  }

  try {
    const window = Math.floor(Date.now() / (config.windowSeconds * 1000));
    const key = `rl:${config.prefix}:${identifier}:${window}`;

    const pipeline = redis.pipeline();
    pipeline.incr(key);
    pipeline.expire(key, config.windowSeconds);
    const results = await pipeline.exec();

    const count = (results[0] as number) ?? 1;
    const resetAt = (window + 1) * config.windowSeconds * 1000;

    if (count > config.limit) {
      return { success: false, limit: config.limit, remaining: 0, resetAt };
    }

    return {
      success: true,
      limit: config.limit,
      remaining: Math.max(0, config.limit - count),
      resetAt,
    };
  } catch {
    // Redis com falha temporária → fallback in-memory sem impacto
    return inMemoryRateLimit(identifier, config);
  }
}
