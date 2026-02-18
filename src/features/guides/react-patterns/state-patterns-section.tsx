"use client";

import { Database } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import type reactPatterns from "@/../messages/pt-BR/reactPatterns.json";
import { AnimatedSection } from "@/components/animated-section";
import { CardBlur } from "@/components/ui/card-blur";
import { CodeBlock } from "@/features/guides/ts-patterns/code-block";

type StateItem = (typeof reactPatterns)["statePatterns"]["items"][number];

export function StatePatternsSection() {
  const t = useTranslations("reactPatterns.statePatterns");
  const items = t.raw("items") as StateItem[];

  return (
    <section id="state-patterns" className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="mb-8 flex items-center gap-3 md:mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
              <Database className="h-5 w-5 text-emerald-500" />
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
              <StateCard
                item={item}
                beforeLabel={t("before")}
                afterLabel={t("after")}
                withLabel={t("withPattern")}
                withoutLabel={t("withoutPattern")}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function StateCard({
  item,
  beforeLabel,
  afterLabel,
  withLabel,
  withoutLabel,
}: {
  item: StateItem;
  beforeLabel: string;
  afterLabel: string;
  withLabel: string;
  withoutLabel: string;
}) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <CardBlur radius="xl" padding="p-6">
      <h3 className="mb-2 text-base font-semibold text-foreground">
        {item.name}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>

      <div className="mb-3 flex gap-2">
        <button
          onClick={() => setShowAfter(false)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            !showAfter
              ? "bg-red-500/10 text-red-400 ring-1 ring-red-500/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {beforeLabel}
        </button>
        <button
          onClick={() => setShowAfter(true)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            showAfter
              ? "bg-green-500/10 text-green-400 ring-1 ring-green-500/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {afterLabel}
        </button>
      </div>

      <CodeBlock
        code={showAfter ? item.after : item.before}
        label={showAfter ? withLabel : withoutLabel}
      />
    </CardBlur>
  );
}
