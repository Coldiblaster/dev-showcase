"use client";

import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { CardBlur } from "@/components/ui/card-blur";

import { CODE_EXAMPLES, fillCodePlaceholders } from "./code-examples";

export function LoadingErrorSection() {
  const t = useTranslations("nextjsAppRouterPage");
  const tSection = useTranslations("nextjsAppRouterPage.loadingError");
  const loadingCode = fillCodePlaceholders(CODE_EXAMPLES.loadingError.loading, {
    __LOADING__: t("code.loadingText"),
  });
  const errorCode = fillCodePlaceholders(CODE_EXAMPLES.loadingError.error, {
    __ERROR_MSG__: t("code.errorMessage"),
    __RETRY__: t("code.retryButton"),
  });

  return (
    <section id="loading-error" className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={AlertCircle}
            title={tSection("title")}
            subtitle={tSection("subtitle")}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="mb-8 max-w-2xl space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {tSection("description")}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground/90 md:text-base">
              {tSection("inPractice")}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <CardBlur radius="xl" padding="p-6" className="mb-6">
            <CodeBlock
              title={tSection("exampleLoadingTitle")}
              code={loadingCode}
            />
          </CardBlur>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <CardBlur radius="xl" padding="p-6" className="mb-6">
            <CodeBlock title={tSection("exampleErrorTitle")} code={errorCode} />
          </CardBlur>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm italic text-muted-foreground">
            {tSection("tip")}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
