"use client";

import { Shield } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";
import { REPOS } from "@/lib/constants";

import { AISecuritySection } from "./ai-security-section";
import { BackendSection } from "./backend-section";
import { ChecklistSection } from "./checklist-section";
import { EnvVarsSection } from "./env-vars-section";
import { FrontendSection } from "./frontend-section";
import { HeadersSection } from "./headers-section";
import { OverviewSection } from "./overview-section";
import { ResourcesSection } from "./resources-section";

/** Página de guia de segurança frontend, backend e IA. */
export function SecurityTips() {
  const t = useTranslations("securityPage");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Shield}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        warning={t("hero.warning")}
      />
      <SectionNav
        sections={[
          { id: "overview", label: t("sectionNav.overview") },
          { id: "frontend", label: t("sectionNav.frontend") },
          { id: "backend", label: t("sectionNav.backend") },
          { id: "ai-security", label: t("sectionNav.ai") },
          { id: "checklist", label: t("sectionNav.checklist") },
        ]}
      />

      <OverviewSection />
      <SectionDivider />
      <FrontendSection />
      <SectionDivider />
      <BackendSection />
      <SectionDivider />
      <AISecuritySection />
      <SectionDivider />
      <HeadersSection />
      <SectionDivider />
      <EnvVarsSection />
      <ChecklistSection />
      <ResourcesSection />
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
