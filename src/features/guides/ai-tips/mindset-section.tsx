"use client";

import { Shield } from "lucide-react";
import { useTranslations } from "next-intl";

import type tipsPage from "@/../messages/pt-BR/tipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { TipItem } from "@/components/tip-item";

type MindsetPrinciple = (typeof tipsPage)["mindset"]["principles"][number];

/** Seção de mindset e princípios para uso de IA. */
export function MindsetSection() {
  const t = useTranslations("tipsPage");

  return (
    <section className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={Shield}
            title={t("mindset.title")}
            subtitle={t("mindset.subtitle")}
            iconBgColor="bg-amber-500/10"
            iconColor="text-amber-500"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="mb-10 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
            {t("mindset.description")}
          </p>
        </AnimatedSection>

        <div className="flex flex-col gap-4">
          {(t.raw("mindset.principles") as MindsetPrinciple[]).map(
            (principle, i) => (
              <AnimatedSection key={principle.title} delay={0.1 + i * 0.05}>
                <TipItem
                  index={i + 1}
                  title={principle.title}
                  description={principle.description}
                />
              </AnimatedSection>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
