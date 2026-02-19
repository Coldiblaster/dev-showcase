"use client";

import { Code2 } from "lucide-react";
import { useTranslations } from "next-intl";

import type privacyTipsPage from "@/../messages/pt-BR/privacyTipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";
import { TipItem } from "@/components/tip-item";

type ImplementationPoint =
  (typeof privacyTipsPage)["implementation"]["points"][number];

/** Seção sobre implementação (o que este site faz). */
export function ImplementationSection() {
  const t = useTranslations("privacyTipsPage");

  return (
    <SectionWrapper id="implementation">
      <AnimatedSection>
        <SectionHeader
          icon={Code2}
          title={t("implementation.title")}
          subtitle={t("implementation.subtitle")}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          {t("implementation.description")}
        </p>
      </AnimatedSection>
      <div className="flex flex-col gap-4">
        {(t.raw("implementation.points") as ImplementationPoint[]).map(
          (point, i) => (
            <AnimatedSection key={point.title} delay={0.15 + i * 0.05}>
              <TipItem
                title={point.title}
                description={point.description}
                index={i + 1}
              />
            </AnimatedSection>
          ),
        )}
      </div>
    </SectionWrapper>
  );
}
