"use client";

import { Wrench } from "lucide-react";
import { useTranslations } from "next-intl";

import type tsPatterns from "@/../messages/pt-BR/tsPatterns.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { CardBlur } from "@/components/ui/card-blur";

type UtilityItem = (typeof tsPatterns)["utilityTypes"]["items"][number];

export function UtilityTypesSection() {
  const t = useTranslations("tsPatterns");

  return (
    <section id="utility-types" className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="mb-8 flex items-center gap-3 md:mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
              <Wrench className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                {t("utilityTypes.title")}
              </h2>
              <p className="font-mono text-sm text-muted-foreground">
                {t("utilityTypes.subtitle")}
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <p className="mb-8 max-w-2xl text-sm text-muted-foreground md:text-base">
            {t("utilityTypes.description")}
          </p>
        </AnimatedSection>

        <div className="flex flex-col gap-6">
          {(t.raw("utilityTypes.items") as UtilityItem[]).map((item, i) => (
            <AnimatedSection key={item.name} delay={0.1 + i * 0.05}>
              <CardBlur radius="xl" padding="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <code className="rounded-lg bg-primary/10 px-2.5 py-1 font-mono text-sm font-semibold text-primary">
                    {item.name}
                  </code>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <CodeBlock
                  code={item.code}
                  highlight={item.highlight}
                  label={t("codeLabel")}
                />
              </CardBlur>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
