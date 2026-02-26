import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getMessages } from "next-intl/server";

import {
  CONTENT_ITEMS,
  type ContentItem,
  getContentBySlug,
} from "@/data/content";
import { getCategoryPath } from "@/lib/content-paths";
import { buildPageMetadata } from "@/lib/seo";

import { COMPONENT_MAP } from "./component-map";
import { ContentPageLayout } from "./content-page-layout";

type SearchItems = Record<string, { title: string; description: string }>;

/**
 * Props padrão para páginas dinâmicas do Next.js.
 */
export type DynamicPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Gera parâmetros estáticos para páginas de uma categoria específica.
 *
 * @param category - Categoria do conteúdo ("guide", "implementation" ou "tool")
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

  const messages = await getMessages();
  const searchItems = (messages.search as { items: SearchItems }).items;
  const title = searchItems[slug]?.title ?? content.title;
  const description = searchItems[slug]?.description ?? content.description;
  const prefix = getCategoryPath(content.category);
  const locale = await getLocale();

  return buildPageMetadata({
    title,
    description,
    path: `/${prefix}/${content.slug}`,
    locale,
  });
}

/**
 * Renderiza um componente dinâmico baseado no slug e categoria.
 *
 * @param params - Parâmetros da rota contendo o slug
 * @param category - Categoria esperada do conteúdo
 * @returns Componente React renderizado ou notFound()
 *
 * @example
 * ```tsx
 * export default async function DicaPage({ params }: DynamicPageProps) {
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

  if (!content || content.category !== category) {
    notFound();
  }

  const Component = COMPONENT_MAP[content.component];

  if (!Component) {
    notFound();
  }

  return (
    <ContentPageLayout content={content}>
      <Component />
    </ContentPageLayout>
  );
}
