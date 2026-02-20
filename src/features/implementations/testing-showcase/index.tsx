"use client";

import { TestTube } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";

import { ChecklistSection } from "./checklist-section";
import { ExamplesSection } from "./examples-section";
import { OverviewSection } from "./overview-section";
import { StructureSection } from "./structure-section";
import { ToolsSection } from "./tools-section";

/**
 * Showcase: como implementar testes unitários no geral.
 * Stack que usamos (Vitest, Testing Library, Playwright) e alternativas (Jest, Cypress).
 * Estrutura de pastas, exemplos e checklist.
 */
export function TestingShowcase() {
  const t = useTranslations("testingPage");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={TestTube}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/implementacoes"
      />

      <SectionNav
        sections={[
          { id: "overview", label: t("sectionNav.overview") },
          { id: "tools", label: t("sectionNav.tools") },
          { id: "structure", label: t("sectionNav.structure") },
          { id: "examples", label: t("sectionNav.examples") },
          { id: "checklist", label: t("sectionNav.checklist") },
        ]}
      />

      <OverviewSection />
      <SectionDivider />
      <ToolsSection />
      <SectionDivider />
      <StructureSection />
      <SectionDivider />
      <ExamplesSection />
      <SectionDivider />
      <ChecklistSection />
      <SectionDivider />

      <CTASection
        icon={TestTube}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
        buttonHref="/implementacoes"
      />
    </div>
  );
}
