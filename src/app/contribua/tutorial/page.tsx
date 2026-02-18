import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { TutorialPage } from "@/features/contribute/tutorial";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([
    getTranslations("tutorialPage.meta"),
    getLocale(),
  ]);
  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/contribua/tutorial",
    locale,
  });
}

export default function Tutorial() {
  return <TutorialPage />;
}
