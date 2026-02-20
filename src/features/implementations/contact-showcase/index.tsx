"use client";

import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";

import { ApiSection } from "./api-section";
import { FlowSection } from "./flow-section";
import { LibsSection } from "./libs-section";
import { OverviewSection } from "./overview-section";

/**
 * Showcase de como este projeto implementa o formulário de contato:
 * API route, Zod, rate limit, reCAPTCHA e Resend.
 */
export function ContactFormShowcase() {
  const t = useTranslations("contactFormPage");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Mail}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/implementacoes"
      />

      <SectionNav
        sections={[
          { id: "overview", label: t("sectionNav.overview") },
          { id: "flow", label: t("sectionNav.flow") },
          { id: "api", label: t("sectionNav.api") },
          { id: "libs", label: t("sectionNav.libs") },
        ]}
      />

      <OverviewSection />
      <SectionDivider />
      <FlowSection />
      <SectionDivider />
      <LibsSection />
      <SectionDivider />
      <ApiSection />
      <SectionDivider />

      <CTASection
        icon={Mail}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
        buttonHref="/implementacoes"
      />
    </div>
  );
}
