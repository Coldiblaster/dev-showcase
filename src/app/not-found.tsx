import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { NotFoundContent } from "@/features/not-found/not-found-content";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: { canonical: `${SITE_URL}/404` },
    robots: { index: false, follow: true },
    openGraph: {
      title: `${t("meta.title")} | ${SITE_NAME}`,
      description: t("meta.ogDescription"),
      url: `${SITE_URL}/404`,
      siteName: SITE_NAME,
    },
  };
}

export default function NotFound() {
  return <NotFoundContent />;
}
