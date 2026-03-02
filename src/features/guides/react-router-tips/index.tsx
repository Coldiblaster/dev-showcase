"use client";

import { Waypoints } from "lucide-react";
import { useTranslations } from "next-intl";

import { HeroSection } from "@/components/hero-section";
import { SectionWrapper } from "@/components/section-wrapper";

export function ReactRouterTips() {
  const t = useTranslations("reactRouterTipsPage") as (key: string) => string;

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        title={t("hero.title")}
        description={t("hero.description")}
        showBackLink
        backHref="/dicas"
        badgeIcon={Waypoints}
      />
      <SectionWrapper id="content">
        <h2>Minha Seção</h2>
      </SectionWrapper>
    </div>
  );
}
