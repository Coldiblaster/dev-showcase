"use client";

import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";

import type apiSecurityPage from "@/../messages/pt-BR/apiSecurityPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

import { SECURE_HEADERS } from "./code-examples";

type Header = (typeof apiSecurityPage)["headers"]["headers"][number];

/** Seção de secure headers aplicados em todas as respostas. */
export function HeadersSection() {
  const t = useTranslations("apiSecurityPage");

  return (
    <SectionWrapper id="headers" variant="default">
      <AnimatedSection>
        <SectionHeader
          icon={Globe}
          title={t("headers.title")}
          subtitle={t("headers.description")}
        />
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedSection delay={0.1}>
          <div className="space-y-3">
            {(t.raw("headers.headers") as Header[]).map((h, i) => (
              <AnimatedSection key={h.name} delay={0.1 + i * 0.06}>
                <div className="rounded-xl border border-border/60 bg-card/50 p-4">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <code className="text-xs font-mono text-primary">
                      {h.name}
                    </code>
                    <span className="text-muted-foreground/50">:</span>
                    <code className="text-xs font-mono text-foreground">
                      {h.value}
                    </code>
                  </div>
                  <p className="text-xs text-muted-foreground">{h.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <CodeBlock code={SECURE_HEADERS} title="secureJsonHeaders.ts" />
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
