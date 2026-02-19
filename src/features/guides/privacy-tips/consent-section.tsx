"use client";

import { Cookie } from "lucide-react";
import { useTranslations } from "next-intl";

import type privacyTipsPage from "@/../messages/pt-BR/privacyTipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";
import { TipItem } from "@/components/tip-item";

type ConsentTip = (typeof privacyTipsPage)["consent"]["tips"][number];

/** Seção sobre consentimento (regras de ouro). */
export function ConsentSection() {
  const t = useTranslations("privacyTipsPage");

  return (
    <SectionWrapper id="consent" variant="alternate">
      <AnimatedSection>
        <SectionHeader
          icon={Cookie}
          title={t("consent.title")}
          subtitle={t("consent.subtitle")}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          {t("consent.description")}
        </p>
      </AnimatedSection>
      <div className="flex flex-col gap-4">
        {(t.raw("consent.tips") as ConsentTip[]).map((tip, i) => (
          <AnimatedSection key={tip.title} delay={0.15 + i * 0.05}>
            <TipItem
              title={tip.title}
              description={tip.description}
              index={i + 1}
            />
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
