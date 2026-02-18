"use client";

import { useTranslations } from "next-intl";

import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";

import { ContributorsSection } from "./contributors-section";
import { ContributeCtaSection } from "./cta-section";
import { ExploreSection } from "./explore-section";
import { ContributeHero } from "./hero-section";
import { HistorySection } from "./history-section";
import { HowItWorksSection } from "./how-it-works-section";
import { StandardsSection } from "./standards-section";
import { WhatYouCanDoSection } from "./what-you-can-do-section";

/** Página "Contribua" — história do projeto, como contribuir, padrões e contribuidores. */
export function ContributePage() {
  const t = useTranslations("contributePage.sectionNav");

  const sections = [
    { id: "explore", label: t("explore") },
    { id: "history", label: t("history") },
    { id: "what-you-can-do", label: t("whatYouCanDo") },
    { id: "how-it-works", label: t("howItWorks") },
    { id: "standards", label: t("standards") },
    { id: "contributors", label: t("contributors") },
    { id: "cta", label: t("cta") },
  ];

  return (
    <div className="min-h-screen">
      <ContributeHero />
      <SectionNav sections={sections} triggerId="explore" />
      <ExploreSection />
      <SectionDivider />
      <HistorySection />
      <SectionDivider />
      <WhatYouCanDoSection />
      <SectionDivider />
      <HowItWorksSection />
      <SectionDivider />
      <StandardsSection />
      <SectionDivider />
      <ContributorsSection />
      <SectionDivider />
      <ContributeCtaSection />
    </div>
  );
}
