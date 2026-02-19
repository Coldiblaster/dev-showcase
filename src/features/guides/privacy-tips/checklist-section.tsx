"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import type privacyTipsPage from "@/../messages/pt-BR/privacyTipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

type ChecklistItems = (typeof privacyTipsPage)["checklist"]["items"];

/** Seção com checklist para o dev aplicar no próprio site. */
export function ChecklistSection() {
  const t = useTranslations("privacyTipsPage");

  return (
    <SectionWrapper id="checklist" variant="alternate">
      <AnimatedSection>
        <SectionHeader
          icon={Check}
          title={t("checklist.title")}
          subtitle={t("checklist.subtitle")}
        />
      </AnimatedSection>
      <ul
        className="grid gap-2 sm:grid-cols-2"
        role="list"
        aria-label={t("checklist.title")}
      >
        {(t.raw("checklist.items") as ChecklistItems).map((item, i) => (
          <AnimatedSection key={i} delay={0.1 + i * 0.03}>
            <li className="flex items-center gap-3 rounded-lg border border-border/50 bg-card px-4 py-3">
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary"
                aria-hidden
              >
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm text-foreground">{item}</span>
            </li>
          </AnimatedSection>
        ))}
      </ul>
    </SectionWrapper>
  );
}
