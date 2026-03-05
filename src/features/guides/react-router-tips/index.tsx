"use client";

import { Waypoints } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionNav } from "@/components/section-nav";
import { SimpleFooter } from "@/components/simples-footer";

import { ApiDataSection } from "./api-data-section";
import { FundamentalsSection } from "./fundamentals-section";
import { ResourcesSection } from "./resources-section";
import { SecurityFlowSection } from "./security-flow-section";
import { StructuresSection } from "./structures-section";

export function ReactRouterTips() {
  const t = useTranslations("reactRouterTipsPage") as (key: string) => string;

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/dicas"
        badgeIcon={Waypoints}
        warning={t("hero.warning")}
      />
      <SectionNav
        sections={[
          { id: "fundamentals", label: "Fundamentals" },
          { id: "structures", label: t("sectionNav.structures") },
          { id: "apidata", label: "Dados de API" },
          { id: "security", label: "Segurança e Fluxo" },
          { id: "resources", label: t("sectionNav.resources") },
        ]}
      />
      <FundamentalsSection />
      <StructuresSection />
      <ApiDataSection />
      <SecurityFlowSection />
      <ResourcesSection />
      <SimpleFooter />;
      <CTASection
        icon={Waypoints}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
        buttonHref="/dicas"
      />
    </div>
  );
}
