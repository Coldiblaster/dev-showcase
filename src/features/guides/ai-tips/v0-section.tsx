"use client";

import { Terminal, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import type tipsPage from "@/../messages/pt-BR/tipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { FeatureCard } from "@/components/feature-card";
import { SectionHeader } from "@/components/section-header";

type V0Feature = (typeof tipsPage)["v0"]["features"][number];

/** Seção sobre v0.dev para geração de UI. */
export function V0Section() {
  const t = useTranslations("tipsPage");

  return (
    <section className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={Zap}
            title={t("v0.title")}
            subtitle={t("v0.subtitle")}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
            {t("v0.description")}
          </p>
        </AnimatedSection>

        <div className="mb-10 grid gap-4 md:grid-cols-2">
          {(t.raw("v0.features") as V0Feature[]).map((feature, i) => (
            <AnimatedSection key={feature.title} delay={0.1 + i * 0.05}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
              />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="mb-3 flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {t("v0.promptExample")}
            </span>
          </div>
          <CodeBlock title={t("v0.promptTitle")} code={t("v0.promptContent")} />
        </AnimatedSection>
      </div>
    </section>
  );
}
