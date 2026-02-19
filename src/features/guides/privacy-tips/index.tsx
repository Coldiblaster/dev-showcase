"use client";

import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";

import { ChecklistSection } from "./checklist-section";
import { ConsentSection } from "./consent-section";
import { ImplementationSection } from "./implementation-section";
import { OverviewSection } from "./overview-section";
import { ResourcesSection } from "./resources-section";

/** Página de dicas sobre privacidade e cookies para devs. */
export function PrivacyTips() {
  const t = useTranslations("privacyTipsPage");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={ShieldCheck}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/dicas"
        warning={t("hero.warning")}
      />
      <SectionNav
        triggerId="overview"
        sections={[
          { id: "overview", label: t("sectionNav.overview") },
          { id: "consent", label: t("sectionNav.consent") },
          { id: "implementation", label: t("sectionNav.implementation") },
          { id: "checklist", label: t("sectionNav.checklist") },
          { id: "resources", label: t("sectionNav.resources") },
        ]}
      />
      <OverviewSection />
      <SectionDivider />
      <ConsentSection />
      <SectionDivider />
      <ImplementationSection />
      <SectionDivider />
      <ChecklistSection />
      <SectionDivider />
      <ResourcesSection />
      <CTASection
        icon={ShieldCheck}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
        buttonHref="/dicas"
        secondaryButton={
          <Link
            href="/privacidade"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t("cta.privacyLink")}
          </Link>
        }
      />
    </div>
  );
}
