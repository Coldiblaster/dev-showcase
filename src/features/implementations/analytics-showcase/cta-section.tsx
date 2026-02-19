"use client";

import { BarChart3 } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";

export function AnalyticsCta() {
  const t = useTranslations("analyticsPage");

  return (
    <CTASection
      icon={BarChart3}
      title={t("cta.title")}
      description={t("cta.description")}
      buttonText={t("cta.button")}
      buttonHref={t("cta.buttonLink")}
    />
  );
}
