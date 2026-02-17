"use client";

import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { StepCard } from "@/components/step-card";

import { HOW_IT_WORKS_ICONS } from "./constants";

/** Seção que explica os passos de como funciona a revisão de código. */
export function HowItWorks() {
  const t = useTranslations("codeReviewPage");
  const steps = t.raw("how.steps") as {
    title: string;
    description: string;
  }[];

  return (
    <section className="mt-20">
      <AnimatedSection>
        <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">
          {t("how.title")}
        </h2>
      </AnimatedSection>

      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        {steps.map((step, i) => (
          <AnimatedSection key={i} delay={i * 0.15}>
            <StepCard
              icon={HOW_IT_WORKS_ICONS[i]}
              title={step.title}
              description={step.description}
              step={i + 1}
            />
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
