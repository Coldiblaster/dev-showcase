"use client";

import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

import { SANITIZE_INPUT, SANITIZE_OUTPUT } from "./code-examples";

/** Seção de sanitização: anti-prompt-injection e anti-XSS. */
export function SanitizationSection() {
  const t = useTranslations("apiSecurityPage");

  return (
    <SectionWrapper id="sanitization" variant="alternate">
      <AnimatedSection>
        <SectionHeader icon={AlertTriangle} title={t("sanitization.title")} />
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <AnimatedSection delay={0.1}>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
            <p className="mb-2 font-semibold text-foreground">
              {t("sanitization.inputTitle")}
            </p>
            <p className="mb-3 text-sm text-muted-foreground">
              {t("sanitization.inputDesc")}
            </p>
            <ul className="mb-4 space-y-1.5">
              {(t.raw("sanitization.patterns") as string[]).map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm">
                  <span className="text-amber-400">⚠</span>
                  <code className="text-xs text-muted-foreground">{p}</code>
                </li>
              ))}
            </ul>
            <CodeBlock code={SANITIZE_INPUT} title="sanitizeUserInput.ts" />
          </div>
        </AnimatedSection>

        {/* Output */}
        <AnimatedSection delay={0.15}>
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
            <p className="mb-2 font-semibold text-foreground">
              {t("sanitization.outputTitle")}
            </p>
            <p className="mb-3 text-sm text-muted-foreground">
              {t("sanitization.outputDesc")}
            </p>
            <ul className="mb-4 space-y-1.5">
              {(t.raw("sanitization.outputPoints") as string[]).map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-0.5 text-destructive/70">✗</span>
                  {p}
                </li>
              ))}
            </ul>
            <CodeBlock code={SANITIZE_OUTPUT} title="sanitizeOutput.ts" />
          </div>
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
