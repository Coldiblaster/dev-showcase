"use client";

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import type tailwindTipsPage from "@/../messages/pt-BR/tailwindTipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { CardBlur } from "@/components/ui/card-blur";

type PatternItem = (typeof tailwindTipsPage)["patterns"]["items"][number];

/** Seção de patterns responsivos e utilitários do Tailwind. */
export function PatternsSection() {
  const t = useTranslations("tailwindTipsPage");

  return (
    <section className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={ChevronRight}
            title={t("patterns.title")}
            subtitle={t("patterns.subtitle")}
          />
        </AnimatedSection>

        <div className="flex flex-col gap-6 md:gap-8">
          {(t.raw("patterns.items") as PatternItem[]).map((pattern, i) => (
            <AnimatedSection key={pattern.title} delay={0.1 + i * 0.05}>
              <CardBlur radius="xl" padding="p-6">
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {pattern.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {pattern.description}
                </p>
                <CodeBlock code={pattern.code} title={pattern.title} />
              </CardBlur>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
