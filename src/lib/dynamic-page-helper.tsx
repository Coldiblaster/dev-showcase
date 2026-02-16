import { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  CONTENT_ITEMS,
  type ContentItem,
  getContentBySlug,
} from "@/data/content";
import { AITips } from "@/features/guides/ai-tips";
import { ReactQueryTips } from "@/features/guides/react-query-tips";
import { TailwindTips } from "@/features/guides/tailwind-tips";
import { I18nShowcase } from "@/features/implementations/i18n-showcase";

/**
 * Mapeamento de componentes disponíveis para renderização dinâmica.
 * Adicione novos componentes aqui conforme necessário.
 */
const COMPONENT_MAP: Record<string, React.ComponentType<unknown>> = {
  I18nShowcase,
  AITips,
  TailwindTips,
  ReactQueryTips,
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
 * Gera metadata para uma página dinâmica baseada no slug.
 *
 * @param params - Parâmetros da rota contendo o slug
 * @returns Metadata do Next.js com título e descrição
 *
 * @example
 * ```ts
 * export async function generateMetadata({ params }: Props) {
 *   return generateMetadataForSlug(params);
 * }
 * ```
 */
export async function generateMetadataForSlug(
  params: Promise<{ slug: string }>,
): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentBySlug(slug);

  if (!content) return { title: "Not Found" };

  return {
    title: content.title,
    description: content.description,
  };
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
