"use client";

import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";

import type a11yGuidePage from "@/../messages/pt-BR/a11yGuidePage.json";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

type ChecklistItem = (typeof a11yGuidePage)["checklist"]["items"][number];

/** Checklist de acessibilidade para usar em PRs. */
export function ChecklistSection() {
  const t = useTranslations("a11yGuidePage");

  return (
    <SectionWrapper id="checklist" variant="default">
      <AnimatedSection>
        <SectionHeader
          icon={Check}
          title={t("checklist.title")}
          subtitle={t("checklist.description")}
        />
      </AnimatedSection>

      <div className="grid gap-2 sm:grid-cols-2">
        {(t.raw("checklist.items") as ChecklistItem[]).map((item, i) => (
          <AnimatedSection key={item.label} delay={0.1 + i * 0.04}>
            <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card px-4 py-3">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  item.done
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {item.done ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <X className="h-3.5 w-3.5" />
                )}
              </div>
              <span className="text-sm text-foreground">{item.label}</span>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
