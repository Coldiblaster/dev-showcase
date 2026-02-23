"use client";

import { CheckSquare } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

import { ZOD_INPUT, ZOD_OUTPUT } from "./code-examples";

/** Seção de validação com Zod — input e output da IA. */
export function ValidationSection() {
  const t = useTranslations("apiSecurityPage");

  return (
    <SectionWrapper id="validation" variant="default">
      <AnimatedSection>
        <SectionHeader
          icon={CheckSquare}
          title={t("validation.title")}
          subtitle={t("validation.description")}
        />
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedSection delay={0.1}>
          <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
            <p className="mb-3 font-semibold text-foreground">
              {t("validation.inputSchemaTitle")}
            </p>
            <CodeBlock code={ZOD_INPUT} title="bodySchema" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
            <p className="mb-3 font-semibold text-foreground">
              {t("validation.outputSchemaTitle")}
            </p>
            <CodeBlock code={ZOD_OUTPUT} title="outputSchema" />
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.2}>
        <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <p className="mb-3 font-semibold text-foreground">
            {t("validation.whyTitle")}
          </p>
          <ul className="space-y-2">
            {(t.raw("validation.whyPoints") as string[]).map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-0.5 text-primary">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
