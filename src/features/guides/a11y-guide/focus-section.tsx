"use client";

import { Focus } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

import { FOCUS_TRAP, SKIP_LINK } from "./a11y-data";

/** Seção de gerenciamento de foco: skip links, focus trap e foco visível. */
export function FocusSection() {
  const t = useTranslations("a11yGuidePage");

  return (
    <SectionWrapper id="focus" variant="alternate">
      <AnimatedSection>
        <SectionHeader
          icon={Focus}
          title={t("focus.title")}
          subtitle={t("focus.description")}
        />
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedSection delay={0.1}>
          <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
            <p className="mb-2 font-semibold text-foreground">
              {t("focus.skipLinkTitle")}
            </p>
            <p className="mb-4 text-sm text-muted-foreground">
              {t("focus.skipLinkDesc")}
            </p>
            <CodeBlock code={SKIP_LINK} title="skip-link.tsx" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
            <p className="mb-2 font-semibold text-foreground">
              {t("focus.trapTitle")}
            </p>
            <p className="mb-4 text-sm text-muted-foreground">
              {t("focus.trapDesc")}
            </p>
            <CodeBlock code={FOCUS_TRAP} title="focus-trap.tsx" />
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.2}>
        <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <p className="mb-3 font-semibold text-foreground">
            {t("focus.visibleTitle")}
          </p>
          <p className="mb-4 text-sm text-muted-foreground">
            {t("focus.visibleDesc")}
          </p>
          <ul className="space-y-2">
            {(t.raw("focus.rules") as string[]).map((rule) => (
              <li
                key={rule}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-0.5 text-primary shrink-0">→</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
