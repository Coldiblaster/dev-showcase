"use client";

import { Accessibility } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";
import { REPOS } from "@/lib/constants";

import { AriaSection } from "./aria-section";
import { ChecklistSection } from "./checklist-section";
import { ContrastSection } from "./contrast-section";
import { FocusSection } from "./focus-section";
import { SemanticsSection } from "./semantics-section";

/** Guia prático de acessibilidade: ARIA, foco, semântica, contraste e checklist. */
export function A11yGuide() {
  const t = useTranslations("a11yGuidePage");

  const sections = [
    { id: "aria", label: t("sectionNav.aria") },
    { id: "focus", label: t("sectionNav.focus") },
    { id: "semantics", label: t("sectionNav.semantics") },
    { id: "contrast", label: t("sectionNav.contrast") },
    { id: "checklist", label: t("sectionNav.checklist") },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Accessibility}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/dicas"
        warning={t("hero.warning")}
      />

      <SectionNav sections={sections} triggerId="aria" />

      <AriaSection />
      <SectionDivider />
      <FocusSection />
      <SectionDivider />
      <SemanticsSection />
      <SectionDivider />
      <ContrastSection />
      <SectionDivider />
      <ChecklistSection />

      <SectionDivider />
      <CTASection
        icon={Accessibility}
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
