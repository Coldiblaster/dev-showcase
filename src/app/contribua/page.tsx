import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { ContributePage } from "@/features/contribute";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([
    getTranslations("contributePage.meta"),
    getLocale(),
  ]);
  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/contribua",
    locale,
  });
}

export default function Contribua() {
  return <ContributePage />;
}
