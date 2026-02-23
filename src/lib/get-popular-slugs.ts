import { unstable_cache } from "next/cache";

import { redis } from "@/lib/redis";
import { getIsoWeekKey } from "@/lib/week-key";

export type BadgeType = "trending" | "popular";

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
    const raw = await redis.zrange(getIsoWeekKey(), 0, limit * 3 - 1, {
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
  ["nav-trending-paths-v2"],
  { revalidate: 1800 },
);

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
  { revalidate: 3600 },
);

/**
 * Retorna os paths mais em alta ESTA SEMANA dentro de uma categoria.
 * Filtra o sorted set semanal global pelo prefixo da categoria.
 * Falha silenciosamente retornando [] se Redis indisponível.
 */
async function fetchWeeklyByCategory(
  basePath: string,
  limit: number,
): Promise<string[]> {
  if (!redis) return [];
  try {
    // Busca bastante entradas do semanal global para encontrar N da categoria
    const raw = await redis.zrange(getIsoWeekKey(), 0, limit * 10 - 1, {
      rev: true,
    });
    return filterContentPaths(
      (raw as string[]).filter((p) => p.startsWith(basePath + "/")),
      limit,
    );
  } catch {
    return [];
  }
}

/**
 * Monta o Map de badges para uma listing page específica.
 * "trending" = Em alta esta semana dentro desta categoria.
 * "popular"  = Mais visitado geral dentro desta categoria.
 *
 * Quando não há dados semanais reais ainda (feature nova), divide os populares
 * da categoria: top metade → "trending", resto → "popular" (garante badge visível).
 */
export async function getCategoryBadgePaths(
  basePath: string,
  limit = 5,
): Promise<Map<string, BadgeType>> {
  const category = basePath.replace(/^\//, ""); // "/dicas" → "dicas"
  const trendingCount = Math.ceil(limit / 2);

  const [categoryPopular, weeklyCategory] = await Promise.all([
    getPopularByCategory(category, limit),
    fetchWeeklyByCategory(basePath, trendingCount),
  ]);

  const result = new Map<string, BadgeType>();
  for (const path of categoryPopular) result.set(path, "popular");

  if (weeklyCategory.length > 0) {
    // Dados semanais reais disponíveis → sobrescreve com trending real
    for (const path of weeklyCategory) result.set(path, "trending");
  } else {
    // Sem dados semanais ainda → top metade dos populares da categoria = "trending"
    for (let i = 0; i < trendingCount && i < categoryPopular.length; i++) {
      result.set(categoryPopular[i], "trending");
    }
  }

  return result;
}

/**
 * Retorna um Map com o badge de cada path popular/trending para o navbar.
 *
 * Delega para getCategoryBadgePaths em cada categoria de conteúdo — mesma
 * lógica usada nas listing pages, garantindo badges consistentes entre
 * navbar e listagens.
 */
export async function getBadgePaths(
  limit = 10,
): Promise<Map<string, BadgeType>> {
  const CONTENT_CATEGORIES = [
    "/implementacoes",
    "/dicas",
    "/ferramentas",
    "/contribuir",
  ];
  // MAX_PREVIEW_ITEMS no navbar = 4; usa o mesmo valor para cada categoria
  const perCategory = Math.max(4, Math.ceil(limit / CONTENT_CATEGORIES.length));

  const maps = await Promise.all(
    CONTENT_CATEGORIES.map((basePath) =>
      getCategoryBadgePaths(basePath, perCategory),
    ),
  );

  const result = new Map<string, BadgeType>();
  for (const map of maps) {
    for (const [path, badge] of map) {
      result.set(path, badge);
    }
  }
  return result;
}
