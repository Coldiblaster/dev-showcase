import { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  CONTENT_ITEMS,
  type ContentItem,
  getContentBySlug,
} from "@/data/content";
import { AITips } from "@/features/guides/ai-tips";
import { DevResourcesPage } from "@/features/guides/dev-resources";
import { ReactQueryTips } from "@/features/guides/react-query-tips";
import { TailwindTips } from "@/features/guides/tailwind-tips";
import { I18nShowcase } from "@/features/implementations/i18n-showcase";
import { SeoShowcase } from "@/features/implementations/seo-showcase";
import { buildPageMetadata } from "@/lib/seo";

/**
 * Mapeamento de componentes disponíveis para renderização dinâmica.
 * Adicione novos componentes aqui conforme necessário.
 */
const COMPONENT_MAP: Record<string, React.ComponentType<unknown>> = {
  I18nShowcase,
  SeoShowcase,
  AITips,
  TailwindTips,
  ReactQueryTips,
  DevResourcesPage,
};

/**
 * Props padrão para páginas dinâmicas do Next.js
 */
export type DynamicPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Gera parâmetros estáticos para páginas de uma categoria específica.
 *
 * @param category - Categoria do conteúdo ("implementation" ou "guide")
 * @returns Array de objetos com slugs para geração estática
 *
 * @example
 * ```ts
 * export async function generateStaticParams() {
 *   return generateStaticParamsForCategory("guide");
 * }
 * ```
 */
export function generateStaticParamsForCategory(
  category: ContentItem["category"],
) {
  return CONTENT_ITEMS.filter((item) => item.category === category).map(
    (item) => ({
      slug: item.slug,
    }),
  );
}

/**
 * Gera metadata completa para uma página dinâmica baseada no slug.
 * Inclui título, descrição, Open Graph e canonical URL.
 *
 * @param params - Parâmetros da rota contendo o slug
 * @returns Metadata do Next.js
 */
export async function generateMetadataForSlug(
  params: Promise<{ slug: string }>,
): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentBySlug(slug);

  if (!content) return { title: "Not Found" };

  const prefix =
    content.category === "implementation" ? "implementacoes" : "dicas";

  return buildPageMetadata({
    title: content.title,
    description: content.description,
    path: `/${prefix}/${content.slug}`,
  });
}

/**
 * Renderiza um componente dinâmico baseado no slug e categoria.
 *
 * @param params - Parâmetros da rota contendo o slug
 * @param category - Categoria esperada do conteúdo
 * @returns Componente React renderizado ou notFound()
 *
 * @throws notFound() se o conteúdo não existir, categoria não bater ou componente não for encontrado
 *
 * @example
 * ```tsx
 * export default async function DicaPage({ params }: Props) {
 *   return renderDynamicContent(params, "guide");
 * }
 * ```
 */
export async function renderDynamicContent(
  params: Promise<{ slug: string }>,
  category: ContentItem["category"],
) {
  const { slug } = await params;
  const content = getContentBySlug(slug);

  // Valida se o conteúdo existe e pertence à categoria correta
  if (!content || content.category !== category) {
    notFound();
  }

  // Busca o componente no mapeamento
  const Component = COMPONENT_MAP[content.component];

  if (!Component) {
    notFound();
  }

  return <Component />;
}
