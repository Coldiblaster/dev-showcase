"use client";

import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

import { ENV_VARS_CODE } from "./code-examples";

/** Seção sobre variáveis de ambiente e boas práticas. */
export function EnvVarsSection() {
  const t = useTranslations("securityPage");

  return (
    <SectionWrapper>
      <AnimatedSection>
        <SectionHeader
          icon={Eye}
          title={t("envVars.title")}
          subtitle={t("envVars.subtitle")}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          {t("envVars.description")}
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <CodeBlock title=".env.local" code={ENV_VARS_CODE} />
      </AnimatedSection>
    </SectionWrapper>
  );
}
