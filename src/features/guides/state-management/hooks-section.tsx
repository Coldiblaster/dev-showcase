"use client";

import { Layers } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { CardBlur } from "@/components/ui/card-blur";

import {
  USECALLBACK_BASIC_CODE,
  USECALLBACK_DEPS_CODE,
  USEMEMO_EXPENSIVE_CODE,
  USEMEMO_FILTER_CODE,
  USEREDUCER_CODE,
  USEREF_FOCUS_CODE,
  USEREF_INTERVAL_CODE,
  USEREF_PREVIOUS_CODE,
} from "./code-examples";
import { fillCodeComments } from "./fill-code-comments";

export function HooksSection() {
  const t = useTranslations("stateManagementPage.hooks");
  const getMsg = (key: string) => t(key as Parameters<typeof t>[0]);
  const useCallbackBasicCode = fillCodeComments(
    USECALLBACK_BASIC_CODE,
    getMsg,
    "codeCommentsUseCallbackBasic",
    1,
  );
  const useCallbackDepsCode = fillCodeComments(
    USECALLBACK_DEPS_CODE,
    getMsg,
    "codeCommentsUseCallbackDeps",
    2,
  );
  const useMemoExpensiveCode = fillCodeComments(
    USEMEMO_EXPENSIVE_CODE,
    getMsg,
    "codeCommentsUseMemoExpensive",
    1,
  );
  const useRefPreviousCode = fillCodeComments(
    USEREF_PREVIOUS_CODE,
    getMsg,
    "codeCommentsUseRefPrevious",
    1,
  );
  const useRefIntervalCode = fillCodeComments(
    USEREF_INTERVAL_CODE,
    getMsg,
    "codeCommentsUseRefInterval",
    1,
  );

  return (
    <section
      id="hooks"
      className="px-4 py-12 md:px-6 md:py-20"
      role="region"
      aria-labelledby="hooks-heading"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div id="hooks-heading">
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

        {/* useCallback */}
        <AnimatedSection delay={0.1}>
          <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">
            {t("useCallbackTitle")}
          </h3>
          <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
            {t("useCallbackDesc")}
          </p>
          <CardBlur padding="p-6" className="mb-6 space-y-6">
            <CodeBlock
              title={t("useCallbackBasic")}
              code={useCallbackBasicCode}
            />
            <CodeBlock
              title={t("useCallbackDeps")}
              code={useCallbackDepsCode}
            />
          </CardBlur>
        </AnimatedSection>

        {/* useMemo */}
        <AnimatedSection delay={0.15}>
          <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">
            {t("useMemoTitle")}
          </h3>
          <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
            {t("useMemoDesc")}
          </p>
          <CardBlur padding="p-6" className="mb-6 space-y-6">
            <CodeBlock title={t("useMemoFilter")} code={USEMEMO_FILTER_CODE} />
            <CodeBlock
              title={t("useMemoExpensive")}
              code={useMemoExpensiveCode}
            />
          </CardBlur>
        </AnimatedSection>

        {/* useRef */}
        <AnimatedSection delay={0.2}>
          <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">
            {t("useRefTitle")}
          </h3>
          <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
            {t("useRefDesc")}
          </p>
          <CardBlur padding="p-6" className="mb-6 space-y-6">
            <CodeBlock title={t("useRefFocus")} code={USEREF_FOCUS_CODE} />
            <CodeBlock title={t("useRefPrevious")} code={useRefPreviousCode} />
            <CodeBlock title={t("useRefInterval")} code={useRefIntervalCode} />
          </CardBlur>
        </AnimatedSection>

        {/* useReducer */}
        <AnimatedSection delay={0.25}>
          <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">
            {t("useReducerTitle")}
          </h3>
          <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
            {t("useReducerDesc")}
          </p>
          <CardBlur padding="p-6">
            <CodeBlock title={t("useReducerExample")} code={USEREDUCER_CODE} />
          </CardBlur>
        </AnimatedSection>
      </div>
    </section>
  );
}
