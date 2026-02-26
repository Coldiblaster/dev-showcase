import { Metadata } from "next";

import {
  type DynamicPageProps,
  generateMetadataForSlug,
  generateStaticParamsForCategory,
  renderDynamicContent,
} from "@/lib/content";

/**
 * Página dinâmica para exibir ferramentas interativas.
 *
 * Renderiza componentes baseados no slug da URL.
 * Exemplos: /ferramentas/code-review
 */

export async function generateStaticParams() {
  return generateStaticParamsForCategory("tool");
}

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  return generateMetadataForSlug(params);
}

export default async function FerramentaPage({ params }: DynamicPageProps) {
  return renderDynamicContent(params, "tool");
}
