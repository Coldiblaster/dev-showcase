"use client";

import { useRef } from "react";

import { Architecture } from "./architecture-section";
import { BestPractices } from "./best-practices-section";
import { CTASection } from "./cta-section";
import { FileStructure } from "./file-structure-section";
import { GitHubRepo } from "./github-repo-section";
import { I18nHero } from "./hero-section";
import I18nNewVsLegacySection from "./i18n-new-vs-legacy-section";
import { LiveDemo } from "./live-demo";
import { Methods } from "./methods-section";
import { Performance } from "./performance-section";
import { Scripts } from "./scripts-section";
import { TranslationEngine } from "./translation-engine-section";
import I18nTroubleshootingSection from "./troubleshooting-section";
import { Workflow } from "./workflow-section";

/**
 * Showcase completo de internacionalização.
 *
 * Demonstração interativa do sistema de i18n com next-intl,
 * incluindo demo ao vivo, arquitetura, métodos e boas práticas.
 */
export function I18nShowcase() {
  const demoRef = useRef<HTMLDivElement>(null);
  const scrollToDemo = () =>
    demoRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div>
      <I18nHero onScrollToDemo={scrollToDemo} />
      <div ref={demoRef}>
        <LiveDemo />
      </div>
      <Architecture />
      <I18nNewVsLegacySection />
      <TranslationEngine />
      <Performance />
      <Methods />
      <Workflow />
      <Scripts />
      <BestPractices />
      <I18nTroubleshootingSection />
      <FileStructure />
      <GitHubRepo />
      <CTASection />
    </div>
  );
}
