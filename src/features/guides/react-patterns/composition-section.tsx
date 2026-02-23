"use client";

import { Layers } from "lucide-react";
import { useTranslations } from "next-intl";

import type reactPatterns from "@/../messages/pt-BR/reactPatterns.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { CardBlur } from "@/components/ui/card-blur";

type CompositionItem = (typeof reactPatterns)["composition"]["items"][number];

export function CompositionSection() {
  const t = useTranslations("reactPatterns.composition");
  const items = t.raw("items") as CompositionItem[];

  return (
    <section id="composition" className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="mb-8 flex items-center gap-3 md:mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
              <Layers className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                {t("title")}
              </h2>
              <p className="font-mono text-sm text-muted-foreground">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <p className="mb-8 max-w-2xl text-sm text-muted-foreground md:text-base">
            {t("description")}
          </p>
        </AnimatedSection>

        <div className="flex flex-col gap-6">
          {items.map((item, i) => (
            <AnimatedSection key={item.name} delay={0.1 + i * 0.05}>
              <CardBlur radius="xl" padding="p-6">
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {item.name}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <CodeBlock code={item.code} label={t("codeLabel")} />
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {t("useCasesLabel")}:
                  </span>
                  {item.useCases.map((uc) => (
                    <Badge key={uc} variant="outline" className="text-[10px]">
                      {uc}
                    </Badge>
                  ))}
                </div>
              </CardBlur>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
