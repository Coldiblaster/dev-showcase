"use client";

import { Code2, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

import type tipsPage from "@/../messages/pt-BR/tipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { FeatureCard } from "@/components/feature-card";
import { PromptCard } from "@/components/prompt-card";
import { SectionHeader } from "@/components/section-header";

type CopilotFeature = (typeof tipsPage)["copilot"]["features"][number];
type CopilotPrompt = (typeof tipsPage)["copilot"]["prompts"][number];

/** Seção sobre GitHub Copilot e boas práticas. */
export function CopilotSection() {
  const t = useTranslations("tipsPage");

  return (
    <section className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={Code2}
            title={t("copilot.title")}
            subtitle={t("copilot.subtitle")}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
            {t("copilot.description")}
          </p>
        </AnimatedSection>

        <div className="mb-10 grid gap-4 md:grid-cols-2">
          {(t.raw("copilot.features") as CopilotFeature[]).map((feature, i) => (
            <AnimatedSection key={feature.title} delay={0.1 + i * 0.05}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
              />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {t("copilot.promptTitle")}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {(t.raw("copilot.prompts") as CopilotPrompt[]).map((item, i) => (
              <PromptCard
                key={i}
                prompt={item.prompt}
                description={item.description}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
