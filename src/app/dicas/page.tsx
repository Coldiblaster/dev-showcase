import {
  BookOpen,
  Database,
  Palette,
  Shield,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { ContentListingPage } from "@/components/content-listing-page";
import { buildPageMetadata } from "@/lib/seo";

const iconMap = {
  "ai-tips": Sparkles,
  "tailwind-tips": Palette,
  "react-query-tips": Database,
  "dev-resources": Wrench,
  "security-tips": Shield,
};

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getTranslations("nav"), getLocale()]);
  return buildPageMetadata({
    title: t("tips"),
    description: t("tipsDesc"),
    path: "/dicas",
    locale,
  });
}

export default function DicasPage() {
  return (
    <ContentListingPage
      category="guide"
      titleKey="tips"
      descriptionKey="tipsDesc"
      badgeKey="sectionTips"
      countKey="guideCount"
      basePath="/dicas"
      iconMap={iconMap}
      defaultIcon={BookOpen}
    />
  );
}
