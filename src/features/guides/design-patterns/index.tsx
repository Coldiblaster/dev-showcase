"use client";

import { Layers } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";
import { REPOS } from "@/lib/constants";

import { OverviewSection } from "./overview-section";
import { PatternsSection } from "./patterns-section";
import { UseCasesSection } from "./use-cases-section";

/** Guia interativo dos 5 design patterns GoF mais usados com TypeScript. */
export function DesignPatternsGuide() {
  const t = useTranslations("designPatternsPage");

  const sections = [
    { id: "overview", label: t("sectionNav.overview") },
    { id: "patterns", label: t("sectionNav.patterns") },
    { id: "use-cases", label: t("sectionNav.useCases") },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Layers}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/dicas"
      />

      <SectionNav sections={sections} triggerId="overview" />

      <OverviewSection />
      <SectionDivider />
      <PatternsSection />
      <SectionDivider />
      <UseCasesSection />

      <SectionDivider />
      <CTASection
        icon={Layers}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
        buttonHref="/dicas"
        secondaryButton={
          <a
            href={REPOS.devShowcase}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            {t("cta.github")}
          </a>
        }
      />
    </div>
  );
}
