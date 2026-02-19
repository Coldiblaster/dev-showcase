import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { PrivacyPage } from "@/features/privacy";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([
    getTranslations("privacyPage.meta"),
    getLocale(),
  ]);
  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/privacidade",
    locale,
  });
}

export default function Privacidade() {
  return <PrivacyPage />;
}
