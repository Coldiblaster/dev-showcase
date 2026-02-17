import type { Metadata } from "next";

import { NotFoundContent } from "@/features/not-found/not-found-content";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "404 — Página não encontrada",
  description:
    "A página que você procura não existe ou foi removida. Explore o portfolio, implementações e guias disponíveis.",
  alternates: { canonical: `${SITE_URL}/404` },
  robots: { index: false, follow: true },
  openGraph: {
    title: `404 — Página não encontrada | ${SITE_NAME}`,
    description:
      "Oops! Essa rota fez um git checkout pra outra dimensão. Volte ao portfolio e explore o conteúdo.",
    url: `${SITE_URL}/404`,
    siteName: SITE_NAME,
  },
};

export default function NotFound() {
  return <NotFoundContent />;
}
