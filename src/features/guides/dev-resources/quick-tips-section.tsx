"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";

import { quickTips } from "./data/quick-tips";
import { type DevLevelFilter, levelColors } from "./data/types";

interface QuickTipsSectionProps {
  level: DevLevelFilter;
}

export function QuickTipsSection({ level }: QuickTipsSectionProps) {
  const t = useTranslations("devResourcesPage.quickTips");
  const tData = useTranslations("devResourcesData.quickTips") as unknown as {
    (key: string): string;
    raw(key: string): unknown;
  };
  const tLevel = useTranslations("devResourcesPage.levelSelector.levels");

  const filteredTips = useMemo(
    () =>
      level === "all"
        ? quickTips
        : quickTips.filter((tip) => tip.level === level),
    [level],
  );

  if (filteredTips.length === 0) return null;

  return (
    <section id="tips" className="relative px-4 py-16 md:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection>
          <div className="mb-6 text-center md:mb-12">
            <Badge variant="secondary" className="mb-4 font-mono text-xs">
              {t("badge")}
            </Badge>
            <h2 className="mb-3 text-balance text-3xl font-bold tracking-tight md:mb-4 md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-sm text-muted-foreground md:text-lg">
              {t("description")}
            </p>
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          <motion.div
            key={level}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3"
          >
            {filteredTips.map((tip, index) => (
              <AnimatedSection key={tip.id} delay={0.1 + index * 0.05}>
                <div className="group relative h-full rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30 md:p-5">
                  <div className="mb-2.5 flex items-start justify-between gap-2 md:mb-3 md:gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 md:h-8 md:w-8">
                      <Lightbulb className="h-3.5 w-3.5 text-primary md:h-4 md:w-4" />
                    </div>
                    <div className="flex gap-1.5">
                      <Badge variant="outline" className="text-[10px]">
                        {String(tData.raw(`${tip.id}.category`))}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${levelColors[tip.level]}`}
                      >
                        {tLevel(tip.level)}
                      </Badge>
                    </div>
                  </div>

                  <p className="mb-1.5 text-sm font-semibold leading-snug text-foreground md:mb-2 md:text-base">
                    {String(tData.raw(`${tip.id}.tip`))}
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
                    {String(tData.raw(`${tip.id}.detail`))}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
