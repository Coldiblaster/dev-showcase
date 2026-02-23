"use client";

import { Boxes } from "lucide-react";
import { useTranslations } from "next-intl";

import type tsPatterns from "@/../messages/pt-BR/tsPatterns.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { CardBlur } from "@/components/ui/card-blur";

type GenericItem = (typeof tsPatterns)["generics"]["items"][number];

export function GenericsSection() {
  const t = useTranslations("tsPatterns");

  return (
    <section
      id="generics"
      className="bg-secondary/20 px-4 py-12 md:px-6 md:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="mb-8 flex items-center gap-3 md:mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
              <Boxes className="h-5 w-5 text-violet-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                {t("generics.title")}
              </h2>
              <p className="font-mono text-sm text-muted-foreground">
                {t("generics.subtitle")}
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <p className="mb-8 max-w-2xl text-sm text-muted-foreground md:text-base">
            {t("generics.description")}
          </p>
        </AnimatedSection>

        <div className="flex flex-col gap-6">
          {(t.raw("generics.items") as GenericItem[]).map((item, i) => (
            <AnimatedSection key={item.name} delay={0.1 + i * 0.05}>
              <CardBlur radius="xl" padding="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">
                    {item.name}
                  </h3>
                  {item.tag && (
                    <Badge variant="outline" className="text-[10px]">
                      {item.tag}
                    </Badge>
                  )}
                </div>
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
