"use client";

import { Check, Code2 } from "lucide-react";
import { useTranslations } from "next-intl";

import type apiSecurityPage from "@/../messages/pt-BR/apiSecurityPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

import { FULL_ROUTE_PATTERN } from "./code-examples";

type ChecklistItem = (typeof apiSecurityPage)["checklist"]["items"][number];

/** Checklist interativo + template completo de rota segura. */
export function ChecklistSection() {
  const t = useTranslations("apiSecurityPage");

  return (
    <SectionWrapper id="checklist" variant="alternate">
      <AnimatedSection>
        <SectionHeader
          icon={Check}
          title={t("checklist.title")}
          subtitle={t("checklist.description")}
        />
      </AnimatedSection>

      <div className="grid gap-8 lg:grid-cols-2">
        <AnimatedSection delay={0.1}>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {(t.raw("checklist.items") as ChecklistItem[]).map((item, i) => (
              <AnimatedSection key={item.label} delay={0.1 + i * 0.04}>
                <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card px-4 py-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm text-foreground">{item.label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Code2 className="h-4 w-4 text-primary" />
              <p className="font-semibold text-foreground">
                {t("checklist.templateTitle")}
              </p>
            </div>
            <CodeBlock code={FULL_ROUTE_PATTERN} title="route.ts" />
          </div>
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
