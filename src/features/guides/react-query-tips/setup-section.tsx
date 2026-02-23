"use client";

import { Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";

import { INSTALL_CODE, LAYOUT_SETUP_CODE } from "./code-examples";

export function SetupSection() {
  const t = useTranslations("reactQueryTipsPage");

  return (
    <section id="setup" className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={Zap}
            title={t("setup.title")}
            subtitle={t("setup.subtitle")}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
            {t("setup.description")}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mb-6">
            <CodeBlock title="terminal" code={INSTALL_CODE} />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <CodeBlock title="app/layout.tsx" code={LAYOUT_SETUP_CODE} />
        </AnimatedSection>
      </div>
    </section>
  );
}
