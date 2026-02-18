import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { ArchitecturePage } from "@/features/contribute/architecture";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([
    getTranslations("architecturePage.meta"),
    getLocale(),
  ]);
  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/contribua/arquitetura",
    locale,
  });
}

export default function Arquitetura() {
  return <ArchitecturePage />;
}
