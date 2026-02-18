import { Code2, Regex } from "lucide-react";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { ContentListingPage } from "@/components/content-listing-page";
import { buildPageMetadata } from "@/lib/seo";

const iconMap = {
  "code-review": Code2,
  regex: Regex,
};

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getTranslations("nav"), getLocale()]);
  return buildPageMetadata({
    title: t("tools"),
    description: t("toolsDesc"),
    path: "/ferramentas",
    locale,
  });
}

export default function FerramentasPage() {
  return (
    <ContentListingPage
      category="tool"
      titleKey="tools"
      descriptionKey="toolsDesc"
      badgeKey="sectionTools"
      countKey="toolCount"
      basePath="/ferramentas"
      iconMap={iconMap}
      defaultIcon={Code2}
    />
  );
}
