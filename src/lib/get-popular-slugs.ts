import { unstable_cache } from "next/cache";

import { redis } from "@/lib/redis";

async function fetchTopPaths(limit: number): Promise<string[]> {
  if (!redis) return [];
  try {
    // Busca mais entradas para compensar o filtro de páginas de seção
    const raw = await redis.zrange("stats:pages", 0, limit * 3 - 1, {
      rev: true,
    });

    const paths: string[] = [];
    for (const path of raw as string[]) {
      const parts = path.split("/").filter(Boolean);
      // Ignora páginas de seção (/, /dicas, /contribua, etc.) — só conteúdo com depth ≥ 2
      if (parts.length < 2) continue;
      paths.push(path);
      if (paths.length >= limit) break;
    }
    return paths;
  } catch {
    return [];
  }
}

/**
 * Retorna os paths completos das páginas de conteúdo mais visitadas (top N),
 * com cache de 1 hora. Falha silenciosamente se Redis não estiver disponível.
 *
 * Retorna paths completos (ex: "/dicas/ai-tips") para evitar colisão de slugs
 * entre categorias diferentes.
 */
export const getPopularSlugs = unstable_cache(
  (limit = 10) => fetchTopPaths(limit),
  ["nav-popular-paths"],
  { revalidate: 3600 },
);
