"use client";

import { Palette } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";

import { ComponentsSection } from "./components-section";
import { PatternsSection } from "./patterns-section";
import { ResourcesSection } from "./resources-section";
import { SetupSection } from "./setup-section";
import { TipsSection } from "./tips-section";

/** Página de dicas de Tailwind CSS com setup, componentes, patterns e recursos. */
export function TailwindTips() {
  const t = useTranslations("tailwindTipsPage");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Palette}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        warning={t("hero.warning")}
      />

      <SectionNav
        sections={[
          { id: "setup", label: "Setup" },
          { id: "components", label: t("sectionNav.components") },
          { id: "patterns", label: "Patterns" },
          { id: "tips", label: "Do vs Don't" },
          { id: "resources", label: t("sectionNav.resources") },
        ]}
      />

      <SetupSection />
      <SectionDivider />
      <ComponentsSection />
      <SectionDivider />
      <PatternsSection />
      <SectionDivider />
      <TipsSection />

      <ResourcesSection />
      <SectionDivider />

      <CTASection
        icon={Palette}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
      />
    </div>
  );
}
