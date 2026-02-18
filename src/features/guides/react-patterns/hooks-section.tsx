"use client";

import { Cable } from "lucide-react";
import { useTranslations } from "next-intl";

import type reactPatterns from "@/../messages/pt-BR/reactPatterns.json";
import { AnimatedSection } from "@/components/animated-section";
import { CardBlur } from "@/components/ui/card-blur";
import { CodeBlock } from "@/features/guides/ts-patterns/code-block";

type HookItem = (typeof reactPatterns)["hooks"]["items"][number];

export function HooksSection() {
  const t = useTranslations("reactPatterns.hooks");
  const items = t.raw("items") as HookItem[];

  return (
    <section id="hooks" className="bg-secondary/20 px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="mb-8 flex items-center gap-3 md:mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
              <Cable className="h-5 w-5 text-violet-500" />
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

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <AnimatedSection key={item.name} delay={0.1 + i * 0.05}>
              <CardBlur className="h-full" padding="p-6">
                <code className="mb-2 block rounded-lg bg-primary/10 px-2.5 py-1 font-mono text-sm font-semibold text-primary w-fit">
                  {item.name}
                </code>
                <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
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
