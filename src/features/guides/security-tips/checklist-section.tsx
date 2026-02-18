"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import type securityPage from "@/../messages/pt-BR/securityPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

type ChecklistItem = (typeof securityPage)["checklist"]["items"][number];

/** Seção com checklist de proteções implementadas. */
export function ChecklistSection() {
  const t = useTranslations("securityPage");

  return (
    <SectionWrapper id="checklist" variant="alternate">
      <AnimatedSection>
        <SectionHeader
          icon={Check}
          title={t("checklist.title")}
          subtitle={t("checklist.subtitle")}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          {t("checklist.description")}
        </p>
      </AnimatedSection>

      <div className="grid gap-2 sm:grid-cols-2">
        {(t.raw("checklist.items") as ChecklistItem[]).map((item, i) => (
          <AnimatedSection key={item.label} delay={0.15 + i * 0.03}>
            <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card px-4 py-3">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  item.done
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm text-foreground">{item.label}</span>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
