"use client";

import { Shield } from "lucide-react";
import { useTranslations } from "next-intl";

import { HeroSection } from "@/components/hero-section";

export function PrivacyHero() {
  const t = useTranslations("privacyPage.hero");

  return (
    <HeroSection
      badge={t("title")}
      badgeIcon={Shield}
      title={t("title")}
      subtitle={t("subtitle")}
      description={t("subtitle")}
      backHref="/"
      showBackLink
    />
  );
}
