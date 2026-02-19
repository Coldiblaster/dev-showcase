"use client";

import { AlertTriangle, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import type tipsPage from "@/../messages/pt-BR/tipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";

type EfficientUseSections = keyof (typeof tipsPage)["efficientUse"]["sections"];
type CommonErrorsExamples =
  (typeof tipsPage)["efficientUse"]["sections"]["commonErrors"]["examples"];
type PracticesItems = (typeof tipsPage)["efficientUse"]["practices"]["items"];

const SECTION_KEYS: EfficientUseSections[] = [
  "consciousUse",
  "reduceTokens",
  "structuredPrompts",
  "premiumModels",
  "commonErrors",
] as const;

/** Seção de uso eficiente e econômico de IA (tokens, modelos, prompts e boas práticas). */
export function EfficientUseSection() {
  const t = useTranslations("tipsPage.efficientUse");

  return (
    <section
      id="efficient-use"
      className="px-6 py-12 md:py-20"
      aria-label={t("intro.title")}
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={Zap}
            title={t("intro.title")}
            subtitle={t("intro.purpose")}
            iconBgColor="bg-emerald-500/10"
            iconColor="text-emerald-500"
          />
        </AnimatedSection>

        <div className="mt-8 flex flex-col gap-10">
          {SECTION_KEYS.map((key, i) => (
            <AnimatedSection key={key} delay={0.15 + i * 0.05}>
              <article
                className="rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm"
                aria-labelledby={`efficient-${key}-title`}
              >
                <h3
                  id={`efficient-${key}-title`}
                  className="mb-3 text-lg font-semibold text-foreground"
                >
                  {t(`sections.${key}.title`)}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {t(`sections.${key}.description`)}
                </p>
                {key === "commonErrors" && (
                  <ul
                    className="list-inside list-disc space-y-2 text-sm text-muted-foreground"
                    aria-label={t("sections.commonErrors.description")}
                  >
                    {(
                      t.raw(
                        "sections.commonErrors.examples",
                      ) as CommonErrorsExamples
                    ).map((example, j) => (
                      <li key={j}>{example}</li>
                    ))}
                  </ul>
                )}
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.45}>
          <h3 className="mb-4 mt-12 text-lg font-semibold text-foreground">
            {t("practices.title")}
          </h3>
          <ol
            className="flex flex-col gap-4"
            role="list"
            aria-label={t("practices.title")}
          >
            {(t.raw("practices.items") as PracticesItems).map((item, i) => (
              <li key={i}>
                <div className="flex gap-4 rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
                    {i + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <div
            role="alert"
            className="mt-10 flex gap-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5"
            aria-labelledby="alert-excessive-title"
          >
            <AlertTriangle
              className="h-6 w-6 shrink-0 text-amber-500"
              aria-hidden
            />
            <div>
              <h4
                id="alert-excessive-title"
                className="mb-1 font-semibold text-amber-700 dark:text-amber-400"
              >
                {t("alerts.excessiveUse.title")}
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("alerts.excessiveUse.description")}
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.55}>
          <article
            className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6"
            aria-labelledby="efficient-cta-title"
          >
            <h4
              id="efficient-cta-title"
              className="mb-2 text-lg font-semibold text-foreground"
            >
              {t("cta.title")}
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("cta.description")}
            </p>
          </article>
        </AnimatedSection>
      </div>
    </section>
  );
}
