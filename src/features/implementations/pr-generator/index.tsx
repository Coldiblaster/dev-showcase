"use client";

import { GitPullRequest, Lightbulb } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { HeroSection } from "@/components/hero-section";
import { SectionWrapper } from "@/components/section-wrapper";

import { type PrFormData, type PrResult } from "./pr-data";
import { PrForm } from "./pr-form";
import { PrOutput } from "./pr-output";

/** Ferramenta de geração de PR descriptions com IA. */
export function PRGenerator() {
  const t = useTranslations("prGeneratorPage");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PrResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastForm, setLastForm] = useState<PrFormData | null>(null);

  async function generate(data: PrFormData) {
    setLoading(true);
    setError(null);
    setLastForm(data);

    try {
      const res = await fetch("/api/pr-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          type: data.type,
          description: data.description,
          filesChanged: data.filesChanged || undefined,
          locale,
        }),
      });

      if (res.status === 429) {
        setError(t("errors.rateLimit"));
        return;
      }

      if (!res.ok) {
        setError(t("errors.generic"));
        return;
      }

      const pr = (await res.json()) as PrResult;
      setResult(pr);
    } catch {
      setError(t("errors.generic"));
    } finally {
      setLoading(false);
    }
  }

  function regenerate() {
    if (lastForm) generate(lastForm);
  }

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={GitPullRequest}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/ferramentas"
        warning={t("hero.warning")}
      />

      <SectionWrapper id="generator" variant="default">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Formulário */}
          <AnimatedSection>
            <div className="rounded-2xl border border-border bg-card/50 p-5">
              <PrForm onSubmit={generate} loading={loading} />
            </div>
          </AnimatedSection>

          {/* Resultado ou dicas */}
          <div>
            {result && !error ? (
              <PrOutput
                result={result}
                type={lastForm!.type}
                title={lastForm!.title}
                onRegenerate={regenerate}
                loading={loading}
              />
            ) : (
              <AnimatedSection delay={0.1}>
                <div className="rounded-2xl border border-border/60 bg-secondary/20 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <p className="font-semibold text-foreground">
                      {t("tips.title")}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {(t.raw("tips.items") as string[]).map((tip) => (
                      <li
                        key={tip}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-0.5 text-primary shrink-0">→</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            )}

            {error && (
              <AnimatedSection delay={0.1}>
                <div
                  role="alert"
                  className="rounded-xl border border-destructive/30 bg-destructive/10 p-4"
                >
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
