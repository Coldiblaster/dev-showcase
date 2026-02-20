"use client";

import { Layers } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { CardBlur } from "@/components/ui/card-blur";

import { CONTEXT_CONSUMER_CODE, CONTEXT_PROVIDER_CODE } from "./code-examples";
import { fillCodeComments } from "./fill-code-comments";

export function ContextSection() {
  const t = useTranslations("stateManagementPage.context");
  const getMsg = (key: string) => t(key as "codeComments.0");
  const consumerCode = fillCodeComments(
    CONTEXT_CONSUMER_CODE,
    getMsg,
    "codeComments",
    1,
  );

  return (
    <section
      id="context"
      className="px-4 py-12 md:px-6 md:py-20"
      role="region"
      aria-labelledby="context-heading"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div id="context-heading">
            <SectionHeader
              icon={Layers}
              title={t("title")}
              subtitle={t("subtitle")}
            />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.05}>
          <div className="max-w-2xl space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("description")}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground/90 md:text-base">
              {t("inPractice")}
            </p>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <CardBlur padding="p-6" className="mt-6 space-y-6">
            <CodeBlock
              title={t("codeTitleProvider")}
              code={CONTEXT_PROVIDER_CODE}
            />
            <CodeBlock title={t("codeTitleConsumer")} code={consumerCode} />
          </CardBlur>
        </AnimatedSection>
      </div>
    </section>
  );
}
