import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getLocale, getMessages } from "next-intl/server";

import {
  CONTENT_ITEMS,
  type ContentItem,
  getContentBySlug,
} from "@/data/content";
import { buildPageMetadata } from "@/lib/seo";

/**
 * Mapeamento de componentes com lazy loading.
 * Cada rota carrega apenas o bundle do seu componente.
 */
const COMPONENT_MAP: Record<string, React.ComponentType<unknown>> = {
  I18nShowcase: dynamic(() =>
    import("@/features/implementations/i18n-showcase").then(
      (m) => m.I18nShowcase,
    ),
  ),
  SeoShowcase: dynamic(() =>
    import("@/features/implementations/seo-showcase").then(
      (m) => m.SeoShowcase,
    ),
  ),
  AiChatbotShowcase: dynamic(() =>
    import("@/features/implementations/ai-chatbot-showcase").then(
      (m) => m.AiChatbotShowcase,
    ),
  ),
  AnalyticsShowcase: dynamic(() =>
    import("@/features/implementations/analytics-showcase").then(
      (m) => m.AnalyticsShowcase,
    ),
  ),
  CodeReviewShowcase: dynamic(() =>
    import("@/features/implementations/code-review").then(
      (m) => m.CodeReviewShowcase,
    ),
  ),
  AITips: dynamic(() =>
    import("@/features/guides/ai-tips").then((m) => m.AITips),
  ),
  TailwindTips: dynamic(() =>
    import("@/features/guides/tailwind-tips").then((m) => m.TailwindTips),
  ),
  ReactQueryTips: dynamic(() =>
    import("@/features/guides/react-query-tips").then((m) => m.ReactQueryTips),
  ),
  DevResourcesPage: dynamic(() =>
    import("@/features/guides/dev-resources").then((m) => m.DevResourcesPage),
  ),
  SecurityTips: dynamic(() =>
    import("@/features/guides/security-tips").then((m) => m.SecurityTips),
  ),
  PrivacyTips: dynamic(() =>
    import("@/features/guides/privacy-tips").then((m) => m.PrivacyTips),
  ),
  RegexPlayground: dynamic(() =>
    import("@/features/implementations/regex-playground").then(
      (m) => m.RegexPlayground,
    ),
  ),
  TsPatterns: dynamic(() =>
    import("@/features/guides/ts-patterns").then((m) => m.TsPatterns),
  ),
  GitWorkflow: dynamic(() =>
    import("@/features/guides/git-workflow").then((m) => m.GitWorkflow),
  ),
  ReactPatterns: dynamic(() =>
    import("@/features/guides/react-patterns").then((m) => m.ReactPatterns),
  ),
  NextjsAppRouter: dynamic(() =>
    import("@/features/guides/nextjs-app-router").then(
      (m) => m.NextjsAppRouter,
    ),
  ),
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

  const messages = await getMessages();
  const searchItems = (
    messages.search as {
      items: Record<string, { title: string; description: string }>;
    }
  ).items;
  const CATEGORY_PATH_MAP: Record<string, string> = {
    implementation: "implementacoes",
    guide: "dicas",
    tool: "ferramentas",
  };
  const prefix = CATEGORY_PATH_MAP[content.category] ?? "dicas";

  const locale = await getLocale();
  return buildPageMetadata({
    title: searchItems[slug]?.title ?? content.title,
    description: searchItems[slug]?.description ?? content.description,
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
