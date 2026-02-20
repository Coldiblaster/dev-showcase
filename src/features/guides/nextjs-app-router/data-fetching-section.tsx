"use client";

import { Database } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { CardBlur } from "@/components/ui/card-blur";

import { CODE_EXAMPLES } from "./code-examples";

export function DataFetchingSection() {
  const t = useTranslations("nextjsAppRouterPage.dataFetching");

  return (
    <section id="data-fetching" className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={Database}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="mb-8 max-w-2xl space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("description")}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground/90 md:text-base">
              {t("inPractice")}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <CardBlur radius="xl" padding="p-6" className="mb-6">
            <CodeBlock
              title={t("exampleTitle")}
              code={CODE_EXAMPLES.dataFetching.page}
            />
          </CardBlur>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm italic text-muted-foreground">
            {t("tip")}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
