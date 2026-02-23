"use client";

import { Database } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionNav } from "@/components/section-nav";
import { Separator } from "@/components/ui/separator";

import { BestPracticesSection } from "./best-practices-section";
import { ResourcesSection } from "./resources-section";
import { SetupSection } from "./setup-section";
import { UseMutationSection } from "./use-mutation-section";
import { UseQuerySection } from "./use-query-section";

export function ReactQueryTips() {
  const t = useTranslations("reactQueryTipsPage");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Database}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/dicas"
        warning={t("hero.warning")}
      />

      <SectionNav
        sections={[
          { id: "setup", label: "Setup" },
          { id: "use-query", label: "useQuery" },
          { id: "use-mutation", label: "useMutation" },
          { id: "best-practices", label: t("sectionNav.bestPractices") },
          { id: "resources", label: t("sectionNav.resources") },
        ]}
      />

      <SetupSection />

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <UseQuerySection />

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <UseMutationSection />

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <BestPracticesSection />

      <ResourcesSection />

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <CTASection
        icon={Database}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
        buttonHref="/dicas"
      />
    </div>
  );
}
