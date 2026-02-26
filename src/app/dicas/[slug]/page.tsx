import { Metadata } from "next";

import {
  type DynamicPageProps,
  generateMetadataForSlug,
  generateStaticParamsForCategory,
  renderDynamicContent,
} from "@/lib/content";

/**
 * Página dinâmica para exibir dicas e guias.
 *
 * Renderiza componentes baseados no slug da URL.
 * Exemplos: /dicas/ai-tips, /dicas/tailwind-tips
 */

export async function generateStaticParams() {
  return generateStaticParamsForCategory("guide");
}

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  return generateMetadataForSlug(params);
}

export default async function DicaPage({ params }: DynamicPageProps) {
  return renderDynamicContent(params, "guide");
}
