import { Metadata } from "next";

import {
  type DynamicPageProps,
  generateMetadataForSlug,
  generateStaticParamsForCategory,
  renderDynamicContent,
} from "@/lib/content";

/**
 * Página dinâmica para exibir implementações técnicas.
 *
 * Renderiza componentes baseados no slug da URL.
 * Exemplos: /implementacoes/i18n
 */

export async function generateStaticParams() {
  return generateStaticParamsForCategory("implementation");
}

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  return generateMetadataForSlug(params);
}

export default async function ImplementacaoPage({ params }: DynamicPageProps) {
  return renderDynamicContent(params, "implementation");
}
