import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { TechStackPage } from "@/features/contribute/tech-stack";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([
    getTranslations("techStackPage.meta"),
    getLocale(),
  ]);
  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/contribua/tech-stack",
    locale,
  });
}

export default function TechStack() {
  return <TechStackPage />;
}
