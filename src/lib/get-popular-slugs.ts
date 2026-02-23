import { unstable_cache } from "next/cache";

import { redis } from "@/lib/redis";

export type BadgeType = "trending" | "popular";

/** Retorna a chave Redis do ranking semanal ISO atual */
function getCurrentWeekKey(): string {
  const now = new Date();
  const d = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),
  );
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
  return `stats:pages:week:${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

/** Filtra caminhos de seção — retorna só conteúdo com depth ≥ 2 */
function filterContentPaths(raw: string[], limit: number): string[] {
  const paths: string[] = [];
  for (const path of raw) {
    if (path.split("/").filter(Boolean).length < 2) continue;
    paths.push(path);
    if (paths.length >= limit) break;
  }
  return paths;
}

async function fetchTopPaths(limit: number): Promise<string[]> {
  if (!redis) return [];
  try {
    const raw = await redis.zrange("stats:pages", 0, limit * 3 - 1, {
      rev: true,
    });
    return filterContentPaths(raw as string[], limit);
  } catch {
    return [];
  }
}

async function fetchWeeklyTrending(limit: number): Promise<string[]> {
  if (!redis) return [];
  try {
    const raw = await redis.zrange(getCurrentWeekKey(), 0, limit * 3 - 1, {
      rev: true,
    });
    const paths = filterContentPaths(raw as string[], limit);

    // Semana sem dados ainda (feature nova) → usa ranking geral como fallback,
    // limitado a metade para diferenciar visualmente dos badges "Popular".
    if (paths.length === 0) {
      const fallback = await redis.zrange(
        "stats:pages",
        0,
        Math.ceil(limit / 2) * 3 - 1,
        { rev: true },
      );
      return filterContentPaths(fallback as string[], Math.ceil(limit / 2));
    }

    return paths;
  } catch {
    return [];
  }
}

/**
 * Retorna os paths mais visitados (geral, top N).
 * Cache de 1h. Falha silenciosamente se Redis indisponível.
 */
export const getPopularSlugs = unstable_cache(
  (limit = 10) => fetchTopPaths(limit),
  ["nav-popular-paths"],
  { revalidate: 3600 },
);

/**
 * Retorna os paths mais visitados ESTA SEMANA (top N).
 * Cache de 30min — janela mais curta para refletir tendências recentes.
 */
export const getWeeklyTrending = unstable_cache(
  (limit = 10) => fetchWeeklyTrending(limit),
  ["nav-trending-paths"],
  { revalidate: 1800 },
);

/**
 * Retorna um Map com o badge de cada path popular/trending (ranking global).
 * "trending" tem prioridade sobre "popular".
 * Usado pelas listing pages para exibir badges diferenciados.
 */
export async function getBadgePaths(
  limit = 10,
): Promise<Map<string, BadgeType>> {
  const [popular, trending] = await Promise.all([
    getPopularSlugs(limit),
    getWeeklyTrending(limit),
  ]);
  const result = new Map<string, BadgeType>();
  for (const path of popular) result.set(path, "popular");
  for (const path of trending) result.set(path, "trending"); // sobrescreve popular
  return result;
}

async function fetchTopPathsByCategory(
  category: string,
  limit: number,
): Promise<string[]> {
  if (!redis) return [];
  try {
    const raw = await redis.zrange(
      `stats:pages:${category}`,
      0,
      limit * 3 - 1,
      { rev: true },
    );
    const paths = filterContentPaths(raw as string[], limit);

    // Sem dados ainda → usa stats:pages global filtrado pela categoria como fallback
    if (paths.length === 0) {
      const fallback = await redis.zrange("stats:pages", 0, limit * 6 - 1, {
        rev: true,
      });
      return filterContentPaths(
        (fallback as string[]).filter((p) => p.startsWith(`/${category}/`)),
        limit,
      );
    }
    return paths;
  } catch {
    return [];
  }
}

/**
 * Retorna os paths mais visitados dentro de uma categoria específica (ex: "dicas").
 * Cache de 1h. Falha silenciosamente se Redis indisponível.
 */
export const getPopularByCategory = unstable_cache(
  (category: string, limit = 5) => fetchTopPathsByCategory(category, limit),
  ["popular-by-category"],
  {
    revalidate: 3600,
    // tags individuais por categoria para evitar colisão de cache entre /dicas, /ferramentas, etc.
    tags: [],
  },
);

/**
 * Monta o Map de badges para uma listing page específica.
 * "trending" = Em alta esta semana (global, filtrado pela categoria).
 * "popular" = Mais visitado dentro desta categoria.
 */
export async function getCategoryBadgePaths(
  basePath: string,
  limit = 5,
): Promise<Map<string, BadgeType>> {
  const category = basePath.replace(/^\//, ""); // "/dicas" → "dicas"
  const [categoryPopular, weeklyTrending] = await Promise.all([
    getPopularByCategory(category, limit),
    getWeeklyTrending(limit * 2),
  ]);
  const result = new Map<string, BadgeType>();
  for (const path of categoryPopular) result.set(path, "popular");
  // trending sobrescreve popular, mas só para paths desta categoria
  for (const path of weeklyTrending) {
    if (path.startsWith(basePath + "/")) result.set(path, "trending");
  }
  return result;
}
