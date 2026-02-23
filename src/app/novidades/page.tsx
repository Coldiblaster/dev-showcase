import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { ChangelogPage } from "@/features/changelog";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([
    getTranslations("changelogPage.meta"),
    getLocale(),
  ]);

  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/novidades",
    locale,
  });
}

export default function Novidades() {
  return <ChangelogPage />;
}
