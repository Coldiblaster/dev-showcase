"use client";

import { RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";

import { USE_MUTATION_CODE } from "./code-examples";

export function UseMutationSection() {
  const t = useTranslations("reactQueryTipsPage");

  return (
    <section id="use-mutation" className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={RefreshCw}
            title={t("useMutation.title")}
            subtitle={t("useMutation.subtitle")}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
            {t("useMutation.description")}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <CodeBlock
            title="components/create-user-form.tsx"
            code={USE_MUTATION_CODE}
          />
        </AnimatedSection>
      </div>
    </section>
  );
}
