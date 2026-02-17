"use client";

import { Bot } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";

export function AiChatbotCta() {
  const t = useTranslations("aiChatbotPage");

  return (
    <CTASection
      icon={Bot}
      title={t("cta.title")}
      description={t("cta.description")}
      buttonText={t("cta.button")}
      buttonHref={t("cta.buttonLink")}
    />
  );
}
