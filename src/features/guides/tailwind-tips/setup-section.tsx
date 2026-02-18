"use client";

import { Terminal } from "lucide-react";
import { useTranslations } from "next-intl";

import type tailwindTipsPage from "@/../messages/pt-BR/tailwindTipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";

type SetupStep = (typeof tailwindTipsPage)["setup"]["steps"][number];

/** Seção de setup e instalação do Tailwind. */
export function SetupSection() {
  const t = useTranslations("tailwindTipsPage");

  return (
    <section id="setup" className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={Terminal}
            title={t("setup.title")}
            subtitle={t("setup.subtitle")}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="mb-10 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
            {t("setup.description")}
          </p>
        </AnimatedSection>

        <div className="flex flex-col gap-6 md:gap-8">
          {(t.raw("setup.steps") as SetupStep[]).map((step, i) => (
            <AnimatedSection key={step.title} delay={0.1 + i * 0.05}>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1.5 text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                  <CodeBlock code={step.code} title={`step-${i + 1}`} />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
