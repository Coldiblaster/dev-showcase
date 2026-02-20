import { BarChart3, Bot, Globe, Mail, Search, TestTube } from "lucide-react";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { ContentListingPage } from "@/components/content-listing-page";
import { buildPageMetadata } from "@/lib/seo";

const iconMap = {
  i18n: Globe,
  seo: Search,
  "ai-chatbot": Bot,
  analytics: BarChart3,
  testing: TestTube,
  "contact-form": Mail,
};

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getTranslations("nav"), getLocale()]);
  return buildPageMetadata({
    title: t("implementations"),
    description: t("implementationsDesc"),
    path: "/implementacoes",
    locale,
  });
}

export default function ImplementacoesPage() {
  return (
    <ContentListingPage
      category="implementation"
      titleKey="implementations"
      descriptionKey="implementationsDesc"
      badgeKey="sectionImplementations"
      countKey="implementationCount"
      basePath="/implementacoes"
      iconMap={iconMap}
      defaultIcon={Globe}
    />
  );
}
