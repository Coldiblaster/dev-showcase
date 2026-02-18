import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { ApiDocsPage } from "@/features/contribute/api-docs";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([
    getTranslations("apiDocsPage.meta"),
    getLocale(),
  ]);
  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/contribua/api",
    locale,
  });
}

export default function ApiDocs() {
  return <ApiDocsPage />;
}
