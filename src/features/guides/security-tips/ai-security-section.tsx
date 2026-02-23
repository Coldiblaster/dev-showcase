"use client";

import { Bot, ShieldAlert, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import type securityPage from "@/../messages/pt-BR/securityPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";
import { StepCard } from "@/components/step-card";
import { TipItem } from "@/components/tip-item";

import {
  AI_SECURITY_MODULE_CODE,
  OUTPUT_SANITIZATION_CODE,
  OUTPUT_VALIDATION_CODE,
  PROMPT_INJECTION_CODE,
  SYSTEM_PROMPT_HARDENING_CODE,
} from "./code-examples";

type Step = (typeof securityPage)["aiSecurity"]["steps"][number];
type Tip =
  (typeof securityPage)["aiSecurity"]["promptInjection"]["tips"][number];

const STEP_ICONS = [ShieldAlert, Bot, ShieldCheck, Sparkles] as const;

/** Seção sobre segurança em APIs com IA (prompt injection, output validation, XSS). */
export function AISecuritySection() {
  const t = useTranslations("securityPage");

  const subsections = [
    {
      key: "promptInjection" as const,
      code: PROMPT_INJECTION_CODE,
      codeTitle: "lib/api-security.ts — Anti Prompt Injection",
    },
    {
      key: "systemPrompt" as const,
      code: SYSTEM_PROMPT_HARDENING_CODE,
      codeTitle: "System Prompt",
    },
    {
      key: "outputValidation" as const,
      code: OUTPUT_VALIDATION_CODE,
      codeTitle: "Zod Output Validation",
    },
    {
      key: "outputSanitization" as const,
      code: OUTPUT_SANITIZATION_CODE,
      codeTitle: "Output Sanitization",
    },
    {
      key: "centralModule" as const,
      code: AI_SECURITY_MODULE_CODE,
      codeTitle: "lib/api-security.ts",
    },
  ];

  return (
    <SectionWrapper id="ai-security">
      <AnimatedSection>
        <SectionHeader
          icon={Bot}
          title={t("aiSecurity.title")}
          subtitle={t("aiSecurity.subtitle")}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          {t.rich("aiSecurity.description", {
            strong: (chunks) => (
              <strong className="font-semibold text-foreground">
                {chunks}
              </strong>
            ),
          })}
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <div className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {(t.raw("aiSecurity.steps") as Step[]).map((step, i) => (
            <StepCard
              key={step.title}
              icon={STEP_ICONS[i]}
              title={step.title}
              description={step.description}
              step={i + 1}
            />
          ))}
        </div>
      </AnimatedSection>

      {subsections.map((sub, idx) => (
        <AnimatedSection key={sub.key} delay={0.2 + idx * 0.05}>
          <h3 className="mb-4 text-lg font-semibold">
            {t(`aiSecurity.${sub.key}.title`)}
          </h3>
          <div className="mb-4 flex flex-col gap-3">
            {(t.raw(`aiSecurity.${sub.key}.tips`) as Tip[]).map((tip) => (
              <TipItem
                key={tip.title}
                title={tip.title}
                description={tip.description}
              />
            ))}
          </div>
          <div className="mb-10">
            <CodeBlock title={sub.codeTitle} code={sub.code} />
          </div>
        </AnimatedSection>
      ))}
    </SectionWrapper>
  );
}
