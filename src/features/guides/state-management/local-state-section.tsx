"use client";

import { Layers } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { CardBlur } from "@/components/ui/card-blur";
import { fillCodeComments } from "@/lib/fill-code-placeholders";

import { LOCAL_STATE_CODE, LOCAL_STATE_INPUT_CODE } from "./code-examples";

export function LocalStateSection() {
  const t = useTranslations("stateManagementPage.localState");
  const getMsg = (key: string) =>
    t(key as "codeComments.0" | "codeCommentsInput.0");
  const code1 = fillCodeComments(LOCAL_STATE_CODE, getMsg, "codeComments", 1);
  const code2 = fillCodeComments(
    LOCAL_STATE_INPUT_CODE,
    getMsg,
    "codeCommentsInput",
    1,
  );

  return (
    <section
      id="local-state"
      className="px-4 py-12 md:px-6 md:py-20"
      role="region"
      aria-labelledby="local-state-heading"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div id="local-state-heading">
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
            <CodeBlock title={t("codeTitle")} code={code1} />
            <CodeBlock title={t("codeTitleInput")} code={code2} />
          </CardBlur>
        </AnimatedSection>
      </div>
    </section>
  );
}
