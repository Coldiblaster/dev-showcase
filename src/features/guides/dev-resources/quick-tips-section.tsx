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
    <section id="tips" className="relative px-6 py-16 md:py-32">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection>
          <div className="mb-8 text-center md:mb-12">
            <Badge variant="secondary" className="mb-4 font-mono text-xs">
              {t("badge")}
            </Badge>
            <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
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
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredTips.map((tip, index) => (
              <AnimatedSection key={tip.id} delay={0.1 + index * 0.05}>
                <div className="group relative h-full rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Lightbulb className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex gap-1.5">
                      <Badge variant="outline" className="text-[10px]">
                        {tip.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${levelColors[tip.level]}`}
                      >
                        {tLevel(tip.level)}
                      </Badge>
                    </div>
                  </div>

                  <p className="mb-2 font-semibold leading-snug text-foreground">
                    {tip.tip}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {tip.detail}
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
