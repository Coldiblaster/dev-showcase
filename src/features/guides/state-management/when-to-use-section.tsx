"use client";

import { Layers } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { CardBlur } from "@/components/ui/card-blur";

import {
  WHEN_USE_CONTEXT_CODE,
  WHEN_USE_STATE_CODE,
  WHEN_USE_ZUSTAND_CODE,
} from "./code-examples";
import { fillCodeComments } from "./fill-code-comments";

export function WhenToUseSection() {
  const t = useTranslations("stateManagementPage.whenToUse");
  const getMsg = (key: string) => t(key as Parameters<typeof t>[0]);
  const whenStateCode = fillCodeComments(
    WHEN_USE_STATE_CODE,
    getMsg,
    "whenStateComments",
    2,
  );
  const whenContextCode = fillCodeComments(
    WHEN_USE_CONTEXT_CODE,
    getMsg,
    "whenContextComments",
    5,
  );
  const whenZustandCode = fillCodeComments(
    WHEN_USE_ZUSTAND_CODE,
    getMsg,
    "whenZustandComments",
    5,
  );

  return (
    <section
      id="when-to-use"
      className="px-4 py-12 md:px-6 md:py-20"
      role="region"
      aria-labelledby="when-to-use-heading"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div id="when-to-use-heading">
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
          <p className="mb-4 mt-8 text-sm font-medium text-foreground">
            {t("examplesIntro")}
          </p>
          <CardBlur padding="p-6" className="space-y-6">
            <CodeBlock title={t("codeTitleState")} code={whenStateCode} />
            <CodeBlock title={t("codeTitleContext")} code={whenContextCode} />
            <CodeBlock title={t("codeTitleStore")} code={whenZustandCode} />
          </CardBlur>
        </AnimatedSection>
      </div>
    </section>
  );
}
