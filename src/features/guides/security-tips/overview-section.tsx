"use client";

import { Shield } from "lucide-react";
import { useTranslations } from "next-intl";

import type securityPage from "@/../messages/pt-BR/securityPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { FeatureCard } from "@/components/feature-card";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

type OverviewItem = (typeof securityPage)["overview"]["items"][number];

/** Seção com visão geral dos conceitos de segurança. */
export function OverviewSection() {
  const t = useTranslations("securityPage");

  return (
    <SectionWrapper id="overview">
      <AnimatedSection>
        <SectionHeader
          icon={Shield}
          title={t("overview.title")}
          subtitle={t("overview.subtitle")}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          {t("overview.description")}
        </p>
      </AnimatedSection>
      <div className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(t.raw("overview.items") as OverviewItem[]).map((item, i) => (
          <AnimatedSection key={item.title} delay={0.2 + i * 0.05}>
            <FeatureCard title={item.title} description={item.description} />
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
