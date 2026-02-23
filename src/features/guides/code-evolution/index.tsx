"use client";

import { GitCommitHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";

import { EvolutionPlayer } from "./evolution-player";

export function CodeEvolution() {
  const t = useTranslations("codeEvolutionPage");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={GitCommitHorizontal}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/dicas"
      />

      <section
        id="evolution-player"
        className="px-4 py-12 md:px-6 md:py-20"
        role="region"
        aria-labelledby="evolution-heading"
      >
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <EvolutionPlayer />
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider />

      <CTASection
        icon={GitCommitHorizontal}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
        buttonHref="/dicas"
      />
    </div>
  );
}
