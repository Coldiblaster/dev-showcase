"use client";

import { Shield } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";
import { REPOS } from "@/lib/constants";

import { ChecklistSection } from "./checklist-section";
import { HeadersSection } from "./headers-section";
import { OverviewSection } from "./overview-section";
import { RateLimitSection } from "./rate-limit-section";
import { SanitizationSection } from "./sanitization-section";
import { ValidationSection } from "./validation-section";

/** Guia completo de segurança para APIs Next.js com código real do projeto. */
export function ApiSecurityGuide() {
  const t = useTranslations("apiSecurityPage");

  const sections = [
    { id: "overview", label: t("sectionNav.overview") },
    { id: "rate-limit", label: t("sectionNav.rateLimit") },
    { id: "validation", label: t("sectionNav.validation") },
    { id: "sanitization", label: t("sectionNav.sanitization") },
    { id: "headers", label: t("sectionNav.headers") },
    { id: "checklist", label: t("sectionNav.checklist") },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Shield}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/dicas"
        warning={t("hero.warning")}
      />

      <SectionNav sections={sections} triggerId="overview" />

      <OverviewSection />
      <SectionDivider />
      <RateLimitSection />
      <SectionDivider />
      <ValidationSection />
      <SectionDivider />
      <SanitizationSection />
      <SectionDivider />
      <HeadersSection />
      <SectionDivider />
      <ChecklistSection />

      <SectionDivider />
      <CTASection
        icon={Shield}
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
