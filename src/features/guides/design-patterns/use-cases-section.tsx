"use client";

import { Check, Lightbulb, X } from "lucide-react";
import { useTranslations } from "next-intl";

import type designPatternsPage from "@/../messages/pt-BR/designPatternsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

type UseCase = (typeof designPatternsPage)["useCases"]["items"][number];

/** Guia de quando usar (e não usar) cada padrão. */
export function UseCasesSection() {
  const t = useTranslations("designPatternsPage");

  return (
    <SectionWrapper id="use-cases" variant="default">
      <AnimatedSection>
        <SectionHeader
          icon={Lightbulb}
          title={t("useCases.title")}
          subtitle={t("useCases.description")}
        />
      </AnimatedSection>

      <div className="space-y-5">
        {(t.raw("useCases.items") as UseCase[]).map((item, i) => (
          <AnimatedSection key={item.pattern} delay={0.1 + i * 0.06}>
            <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
              <p className="mb-4 font-bold text-foreground">{item.pattern}</p>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Quando usar */}
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <Check className="h-3.5 w-3.5" />
                    {t("useCases.doTitle")}
                  </p>
                  <ul className="space-y-1.5">
                    {item.do.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-0.5 text-primary shrink-0">✓</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quando não usar */}
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-destructive/80">
                    <X className="h-3.5 w-3.5" />
                    {t("useCases.dontTitle")}
                  </p>
                  <ul className="space-y-1.5">
                    {item.dont.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-0.5 text-destructive/60 shrink-0">
                          ✗
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
