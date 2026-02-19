"use client";

import { GitBranch } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";

import { BranchingSection } from "./branching-section";
import { CheatSheetSection } from "./cheat-sheet-section";
import { CommandsSection } from "./commands-section";
import { CommitsSection } from "./commits-section";
import { WorkflowsSection } from "./workflows-section";

export function GitWorkflow() {
  const t = useTranslations("gitWorkflow");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={GitBranch}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/dicas"
      />

      <SectionNav
        sections={[
          { id: "commands", label: t("sectionNav.commands") },
          { id: "branching", label: t("sectionNav.branching") },
          { id: "commits", label: t("sectionNav.commits") },
          { id: "workflows", label: t("sectionNav.workflows") },
          { id: "cheat-sheet", label: t("sectionNav.cheatSheet") },
        ]}
      />

      <CommandsSection />
      <SectionDivider />
      <BranchingSection />
      <SectionDivider />
      <CommitsSection />
      <SectionDivider />
      <WorkflowsSection />
      <SectionDivider />
      <CheatSheetSection />
      <SectionDivider />

      <CTASection
        icon={GitBranch}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
        buttonHref="/dicas"
      />
    </div>
  );
}
