"use client";

import { Shield } from "lucide-react";
import { useTranslations } from "next-intl";

import type apiSecurityPage from "@/../messages/pt-BR/apiSecurityPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

type Layer = (typeof apiSecurityPage)["overview"]["layers"][number];

/** Diagrama do pipeline de segurança com 7 camadas. */
export function OverviewSection() {
  const t = useTranslations("apiSecurityPage");

  return (
    <SectionWrapper id="overview" variant="default">
      <AnimatedSection>
        <SectionHeader
          icon={Shield}
          title={t("overview.title")}
          subtitle={t("overview.description")}
        />
      </AnimatedSection>

      <div className="relative mx-auto max-w-xl">
        {/* Linha vertical conectando os steps */}
        <div
          className="absolute left-[19px] top-4 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-primary/40 via-border to-transparent"
          aria-hidden
        />

        <div className="space-y-3">
          {(t.raw("overview.layers") as Layer[]).map((layer, i) => (
            <AnimatedSection key={layer.step} delay={0.1 + i * 0.06}>
              <div className="flex items-start gap-4">
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-sm font-bold text-primary">
                  {layer.step}
                </div>
                <div className="rounded-xl border border-border/60 bg-card/50 p-4 flex-1">
                  <p className="font-semibold text-foreground">{layer.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {layer.desc}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
