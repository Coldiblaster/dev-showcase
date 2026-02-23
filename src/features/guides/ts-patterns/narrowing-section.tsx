"use client";

import { ScanSearch } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import type tsPatterns from "@/../messages/pt-BR/tsPatterns.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { CardBlur } from "@/components/ui/card-blur";

type NarrowingItem = (typeof tsPatterns)["narrowing"]["items"][number];

export function NarrowingSection() {
  const t = useTranslations("tsPatterns");

  return (
    <section id="narrowing" className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="mb-8 flex items-center gap-3 md:mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
              <ScanSearch className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                {t("narrowing.title")}
              </h2>
              <p className="font-mono text-sm text-muted-foreground">
                {t("narrowing.subtitle")}
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <p className="mb-8 max-w-2xl text-sm text-muted-foreground md:text-base">
            {t("narrowing.description")}
          </p>
        </AnimatedSection>

        <div className="flex flex-col gap-6">
          {(t.raw("narrowing.items") as NarrowingItem[]).map((item, i) => (
            <AnimatedSection key={item.name} delay={0.1 + i * 0.05}>
              <NarrowingCard item={item} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function NarrowingCard({ item }: { item: NarrowingItem }) {
  const t = useTranslations("tsPatterns.narrowing");
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
          {t("before")}
        </button>
        <button
          onClick={() => setShowAfter(true)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            showAfter
              ? "bg-green-500/10 text-green-400 ring-1 ring-green-500/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t("after")}
        </button>
      </div>

      <CodeBlock
        code={showAfter ? item.after : item.before}
        label={showAfter ? t("withNarrowing") : t("withoutNarrowing")}
      />
    </CardBlur>
  );
}
