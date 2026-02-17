import type { Metadata } from "next";

export const SITE_URL = "https://viniciusbastazin.vercel.app";
export const SITE_NAME = "Vinicius Bastazin";
export const SITE_AUTHOR = "Vinicius Bastazin Araujo";

/**
 * Gera metadata completa para uma página, herdando as configurações base do site.
 * Inclui Open Graph, canonical URL e herda o title template do layout.
 */
export function buildPageMetadata(page: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${SITE_URL}${page.path ?? ""}`;

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
      locale: "pt_BR",
    },
  };
}
