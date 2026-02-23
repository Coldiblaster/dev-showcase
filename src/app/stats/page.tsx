import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { StatsPage } from "@/features/stats";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([
    getTranslations("statsPage.meta"),
    getLocale(),
  ]);

  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/stats",
    locale,
  });
}

export default function Page() {
  return <StatsPage />;
}
