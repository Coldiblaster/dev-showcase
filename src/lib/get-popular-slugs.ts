import { unstable_cache } from "next/cache";

import { redis } from "@/lib/redis";

async function fetchTopSlugs(limit: number): Promise<string[]> {
  if (!redis) return [];
  try {
    // Busca mais entradas para compensar o filtro de páginas de seção
    const raw = await redis.zrange("stats:pages", 0, limit * 3 - 1, {
      rev: true,
    });

    const slugs: string[] = [];
    for (const path of raw as string[]) {
      const parts = path.split("/").filter(Boolean);
      // Ignora páginas de seção (/, /dicas, /contribua, etc.) — só conteúdo com depth ≥ 2
      if (parts.length < 2) continue;
      slugs.push(parts[parts.length - 1]);
      if (slugs.length >= limit) break;
    }
    return slugs;
  } catch {
    return [];
  }
}

/**
 * Retorna os slugs das páginas mais visitadas (top N), com cache de 1 hora.
 * Falha silenciosamente: se Redis não estiver disponível, retorna array vazio.
 */
export const getPopularSlugs = unstable_cache(
  (limit = 10) => fetchTopSlugs(limit),
  ["nav-popular-slugs"],
  { revalidate: 3600 },
);
