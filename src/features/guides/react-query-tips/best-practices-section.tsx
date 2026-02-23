"use client";

import { Code2 } from "lucide-react";
import { useTranslations } from "next-intl";

import type reactQueryTipsPage from "@/../messages/pt-BR/reactQueryTipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { TipItem } from "@/components/tip-item";

type Tip = (typeof reactQueryTipsPage)["bestPractices"]["tips"][number];

export function BestPracticesSection() {
  const t = useTranslations("reactQueryTipsPage");

  return (
    <section
      id="best-practices"
      className="bg-secondary/20 px-6 py-12 md:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={Code2}
            title={t("bestPractices.title")}
            subtitle={t("bestPractices.subtitle")}
          />
        </AnimatedSection>

        <div className="flex flex-col gap-4">
          {(t.raw("bestPractices.tips") as Tip[]).map((tip, i) => (
            <AnimatedSection key={tip.title} delay={0.1 + i * 0.05}>
              <TipItem title={tip.title} description={tip.description} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
