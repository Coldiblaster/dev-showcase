"use client";

import { Code2 } from "lucide-react";
import { useTranslations } from "next-intl";

import type designPatternsPage from "@/../messages/pt-BR/designPatternsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

import { PatternCard } from "./pattern-card";
import {
  COMMAND_AFTER,
  COMMAND_BEFORE,
  DECORATOR_AFTER,
  DECORATOR_BEFORE,
  FACTORY_AFTER,
  FACTORY_BEFORE,
  OBSERVER_AFTER,
  OBSERVER_BEFORE,
  STRATEGY_AFTER,
  STRATEGY_BEFORE,
} from "./patterns-data";

type PatternItem = (typeof designPatternsPage)["patterns"]["items"][number];

const CODE_MAP: Record<string, { before: string; after: string }> = {
  observer: { before: OBSERVER_BEFORE, after: OBSERVER_AFTER },
  strategy: { before: STRATEGY_BEFORE, after: STRATEGY_AFTER },
  factory: { before: FACTORY_BEFORE, after: FACTORY_AFTER },
  decorator: { before: DECORATOR_BEFORE, after: DECORATOR_AFTER },
  command: { before: COMMAND_BEFORE, after: COMMAND_AFTER },
};

/** Seção com os 5 padrões — cada um com toggle antes/depois. */
export function PatternsSection() {
  const t = useTranslations("designPatternsPage");

  return (
    <SectionWrapper id="patterns" variant="alternate">
      <AnimatedSection>
        <SectionHeader icon={Code2} title={t("patterns.title")} />
      </AnimatedSection>

      <div className="space-y-6">
        {(t.raw("patterns.items") as PatternItem[]).map((item) => {
          const codes = CODE_MAP[item.id];
          if (!codes) return null;
          return (
            <PatternCard
              key={item.id}
              id={item.id}
              name={item.name}
              category={item.category}
              tagline={item.tagline}
              description={item.description}
              realWorld={item.realWorld}
              beforeCode={codes.before}
              afterCode={codes.after}
            />
          );
        })}
      </div>
    </SectionWrapper>
  );
}
