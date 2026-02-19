"use client";

import { Component } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";

import { CompositionSection } from "./composition-section";
import { HooksSection } from "./hooks-section";
import { PerformanceSection } from "./performance-section";
import { StatePatternsSection } from "./state-patterns-section";

export function ReactPatterns() {
  const t = useTranslations("reactPatterns");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Component}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/dicas"
      />

      <SectionNav
        sections={[
          { id: "composition", label: t("sectionNav.composition") },
          { id: "hooks", label: t("sectionNav.hooks") },
          { id: "state-patterns", label: t("sectionNav.statePatterns") },
          { id: "performance", label: t("sectionNav.performance") },
        ]}
      />

      <CompositionSection />
      <SectionDivider />
      <HooksSection />
      <SectionDivider />
      <StatePatternsSection />
      <SectionDivider />
      <PerformanceSection />
      <SectionDivider />

      <CTASection
        icon={Component}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
        buttonHref="/dicas"
      />
    </div>
  );
}
