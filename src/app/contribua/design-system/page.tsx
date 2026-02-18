import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { DesignSystemPage } from "@/features/contribute/design-system";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([
    getTranslations("designSystemPage.meta"),
    getLocale(),
  ]);
  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/contribua/design-system",
    locale,
  });
}

export default function DesignSystem() {
  return <DesignSystemPage />;
}
