"use client";

import { Server } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

import {
  RATE_LIMIT_CODE,
  RECAPTCHA_VERIFY_CODE,
  ZOD_VALIDATION_CODE,
} from "../examples/security-examples";

/** Seção de segurança no backend (rate limit, Zod, reCAPTCHA). */
export function BackendSection() {
  const t = useTranslations("securityPage");

  return (
    <SectionWrapper id="backend">
      <AnimatedSection>
        <SectionHeader
          icon={Server}
          title={t("backend.title")}
          subtitle={t("backend.subtitle")}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          {t("backend.description")}
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="mb-6">
          <CodeBlock title="lib/rate-limit.ts" code={RATE_LIMIT_CODE} />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <div className="mb-6">
          <CodeBlock
            title="app/api/contact/route.ts — Zod validation"
            code={ZOD_VALIDATION_CODE}
          />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <CodeBlock
          title="app/api/contact/route.ts — reCAPTCHA verify"
          code={RECAPTCHA_VERIFY_CODE}
        />
      </AnimatedSection>
    </SectionWrapper>
  );
}
