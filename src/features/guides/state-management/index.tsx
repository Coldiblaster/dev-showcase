"use client";

import { ExternalLink, Layers } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";

import { ContextSection } from "./context-section";
import { HooksSection } from "./hooks-section";
import { LocalStateSection } from "./local-state-section";
import { WhenToUseSection } from "./when-to-use-section";
import { ZustandSection } from "./zustand-section";

const REACT_DOCS_STATE_URL = "https://react.dev/learn/managing-state";

export function StateManagement() {
  const t = useTranslations("stateManagementPage");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Layers}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/dicas"
      >
        <AnimatedSection delay={0.22}>
          <a
            href={REACT_DOCS_STATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 hover:border-primary/50"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            {t("hero.docLink")}
          </a>
        </AnimatedSection>
      </HeroSection>

      <SectionNav
        sections={[
          { id: "local-state", label: t("sectionNav.localState") },
          { id: "hooks", label: t("sectionNav.hooks") },
          { id: "context", label: t("sectionNav.context") },
          { id: "zustand", label: t("sectionNav.zustand") },
          { id: "when-to-use", label: t("sectionNav.whenToUse") },
        ]}
      />

      <LocalStateSection />
      <SectionDivider />
      <HooksSection />
      <SectionDivider />
      <ContextSection />
      <SectionDivider />
      <ZustandSection />
      <SectionDivider />
      <WhenToUseSection />
      <SectionDivider />

      <CTASection
        icon={Layers}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
        buttonHref="/dicas"
      />
    </div>
  );
}
