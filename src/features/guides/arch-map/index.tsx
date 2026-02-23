"use client";

import { Network } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";

import { ArchitectureMap } from "./architecture-map";

export function ArchMap() {
  const t = useTranslations("archMapPage");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Network}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/dicas"
      />

      <section
        id="arch-map"
        className="px-4 py-12 md:px-6 md:py-20"
        role="region"
        aria-label={t("hero.title")}
      >
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <ArchitectureMap />
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider />

      <CTASection
        icon={Network}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
        buttonHref="/dicas"
      />
    </div>
  );
}
