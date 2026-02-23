"use client";

import { Layers } from "lucide-react";
import { useTranslations } from "next-intl";

import type designPatternsPage from "@/../messages/pt-BR/designPatternsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

type Card = (typeof designPatternsPage)["overview"]["cards"][number];

/** Introdução: por que usar design patterns. */
export function OverviewSection() {
  const t = useTranslations("designPatternsPage");

  return (
    <SectionWrapper id="overview" variant="default">
      <AnimatedSection>
        <SectionHeader
          icon={Layers}
          title={t("overview.title")}
          subtitle={t("overview.description")}
        />
      </AnimatedSection>

      <div className="grid gap-4 sm:grid-cols-3">
        {(t.raw("overview.cards") as Card[]).map((card, i) => (
          <AnimatedSection key={card.title} delay={0.1 + i * 0.07}>
            <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
              <p className="mb-2 font-semibold text-foreground">{card.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {card.desc}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
