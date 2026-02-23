"use client";

import { Bug } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

import { SECURITY_HEADERS_CODE } from "./code-examples";

/** Seção sobre headers de segurança (HSTS, X-Frame, etc.). */
export function HeadersSection() {
  const t = useTranslations("securityPage");

  return (
    <SectionWrapper>
      <AnimatedSection>
        <SectionHeader
          icon={Bug}
          title={t("headers.title")}
          subtitle={t("headers.subtitle")}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          {t("headers.description")}
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <CodeBlock title="next.config.ts" code={SECURITY_HEADERS_CODE} />
      </AnimatedSection>
    </SectionWrapper>
  );
}
