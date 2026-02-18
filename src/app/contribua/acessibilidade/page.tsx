import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { AccessibilityPage } from "@/features/contribute/accessibility";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([
    getTranslations("accessibilityPage.meta"),
    getLocale(),
  ]);
  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/contribua/acessibilidade",
    locale,
  });
}

export default function Acessibilidade() {
  return <AccessibilityPage />;
}
