"use client";

import { Code2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { CardBlur } from "@/components/ui/card-blur";

import {
  COMPONENT_TEST_CODE,
  CONFIG_TEST_CODE,
  HOOK_TEST_CODE,
  JEST_CONFIG_TEST_CODE,
  UTIL_TEST_CODE,
} from "./examples-code";

const EXAMPLE_BLOCKS: Array<{
  titleKey:
    | "configTest.title"
    | "utilTest.title"
    | "hookTest.title"
    | "componentTest.title"
    | "jestTest.title";
  code: string;
}> = [
  { titleKey: "configTest.title", code: CONFIG_TEST_CODE },
  { titleKey: "utilTest.title", code: UTIL_TEST_CODE },
  { titleKey: "hookTest.title", code: HOOK_TEST_CODE },
  { titleKey: "componentTest.title", code: COMPONENT_TEST_CODE },
  { titleKey: "jestTest.title", code: JEST_CONFIG_TEST_CODE },
];

export function ExamplesSection() {
  const t = useTranslations("testingPage.examples");

  return (
    <section
      id="examples"
      className="px-4 py-12 md:px-6 md:py-20"
      role="region"
      aria-labelledby="examples-heading"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div id="examples-heading">
            <SectionHeader
              icon={Code2}
              title={t("title")}
              subtitle={t("subtitle")}
            />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.05}>
          <p className="mb-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {t("description")}
          </p>
          <p className="mb-8 text-xs text-muted-foreground/90">
            {t("exampleStep")}
          </p>
        </AnimatedSection>

        {EXAMPLE_BLOCKS.map(({ titleKey, code }, i) => (
          <AnimatedSection key={titleKey} delay={0.1 + i * 0.05}>
            <CardBlur radius="xl" padding="p-6" className="mb-6">
              <CodeBlock title={t(titleKey)} code={code} />
            </CardBlur>
          </AnimatedSection>
        ))}

        <AnimatedSection delay={0.35}>
          <p className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm italic text-muted-foreground">
            {t("tip")}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
