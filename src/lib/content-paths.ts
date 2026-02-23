import type { ContentCategory } from "@/data/content";

/**
 * Mapeamento canônico de categoria → prefixo de rota.
 * Fonte única de verdade: usada em dynamic-page-helper, sitemap, search-data e terminal.
 */
export const CATEGORY_PATH_MAP: Record<ContentCategory, string> = {
  implementation: "implementacoes",
  guide: "dicas",
  tool: "ferramentas",
};

/** Retorna o prefixo de rota para uma categoria (sem barra inicial). */
export function getCategoryPath(category: ContentCategory): string {
  return CATEGORY_PATH_MAP[category] ?? "dicas";
}

/** Retorna a URL completa de um item de conteúdo (com barra inicial). */
export function getContentUrl(category: ContentCategory, slug: string): string {
  return `/${getCategoryPath(category)}/${slug}`;
}
