import type { Metadata } from "next";

import { PERSONAL } from "@/lib/constants";

export const SITE_URL = PERSONAL.siteUrl;
export const SITE_NAME = PERSONAL.siteName;
export const SITE_AUTHOR = PERSONAL.fullName;

/**
 * Converte locale da app (ex: pt-BR) para formato Open Graph (ex: pt_BR).
 */
function toOpenGraphLocale(locale: string): string {
  return locale.replace("-", "_");
}

/**
 * Gera metadata completa para uma página, herdando as configurações base do site.
 * Inclui Open Graph, canonical URL e herda o title template do layout.
 * @param page.title - Título da página
 * @param page.description - Descrição da página
 * @param page.path - Caminho relativo da página (ex: /dicas/ai-tips)
 * @param page.locale - Locale atual para Open Graph (ex: pt-BR, en). Se omitido, usa pt_BR.
 */
export function buildPageMetadata(page: {
  title: string;
  description: string;
  path?: string;
  locale?: string;
}): Metadata {
  const url = `${SITE_URL}${page.path ?? ""}`;
  const ogLocale = page.locale ? toOpenGraphLocale(page.locale) : "pt_BR";

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}
