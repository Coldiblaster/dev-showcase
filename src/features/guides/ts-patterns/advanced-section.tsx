"use client";

import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import type tsPatterns from "@/../messages/pt-BR/tsPatterns.json";
import { AnimatedSection } from "@/components/animated-section";
import { CardBlur } from "@/components/ui/card-blur";

import { CodeBlock } from "./code-block";

type AdvancedItem = (typeof tsPatterns)["advanced"]["items"][number];

export function AdvancedSection() {
  const t = useTranslations("tsPatterns");

  return (
    <section
      id="advanced"
      className="bg-secondary/20 px-4 py-12 md:px-6 md:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="mb-8 flex items-center gap-3 md:mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
              <Sparkles className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                {t("advanced.title")}
              </h2>
              <p className="font-mono text-sm text-muted-foreground">
                {t("advanced.subtitle")}
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <p className="mb-8 max-w-2xl text-sm text-muted-foreground md:text-base">
            {t("advanced.description")}
          </p>
        </AnimatedSection>

        <div className="flex flex-col gap-6">
          {(t.raw("advanced.items") as AdvancedItem[]).map((item, i) => (
            <AnimatedSection key={item.name} delay={0.1 + i * 0.05}>
              <CardBlur radius="xl" padding="p-6">
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {item.name}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <CodeBlock code={item.code} label={t("codeLabel")} />
              </CardBlur>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
