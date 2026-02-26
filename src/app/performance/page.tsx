import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { PerformancePage } from "@/features/performance";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([
    getTranslations("performancePage.meta"),
    getLocale(),
  ]);

  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/performance",
    locale,
  });
}

export default function Page() {
  return <PerformancePage />;
}
