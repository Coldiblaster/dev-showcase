"use client";

import { FileCode } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";

import { AdvancedSection } from "./advanced-section";
import { GenericsSection } from "./generics-section";
import { NarrowingSection } from "./narrowing-section";
import { UtilityTypesSection } from "./utility-types-section";

export function TsPatterns() {
  const t = useTranslations("tsPatterns");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={FileCode}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
      />

      <SectionNav
        sections={[
          { id: "utility-types", label: t("sectionNav.utilityTypes") },
          { id: "generics", label: "Generics" },
          { id: "narrowing", label: t("sectionNav.narrowing") },
          { id: "advanced", label: t("sectionNav.advanced") },
        ]}
      />

      <UtilityTypesSection />
      <SectionDivider />
      <GenericsSection />
      <SectionDivider />
      <NarrowingSection />
      <SectionDivider />
      <AdvancedSection />
      <SectionDivider />

      <CTASection
        icon={FileCode}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
        buttonHref="/dicas"
      />
    </div>
  );
}
