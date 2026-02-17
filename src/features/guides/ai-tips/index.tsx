"use client";

import { BookOpen, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";

import { CopilotSection } from "./copilot-section";
import { MindsetSection } from "./mindset-section";
import { PromptsSection } from "./prompts-section";
import { ToolsSection } from "./tools-section";
import { V0Section } from "./v0-section";

/** Página de dicas de IA com v0, Copilot, prompts, ferramentas e mindset. */
export function AITips() {
  const t = useTranslations("tipsPage");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Sparkles}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        warning={t("hero.warning")}
      />

      <V0Section />
      <SectionDivider />
      <CopilotSection />
      <SectionDivider />
      <PromptsSection />
      <SectionDivider />
      <ToolsSection />
      <SectionDivider />
      <MindsetSection />

      <CTASection
        icon={BookOpen}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
      />
    </div>
  );
}
