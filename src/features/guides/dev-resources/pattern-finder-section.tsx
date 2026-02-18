"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  ClipboardCheck,
  Download,
  HelpCircle,
  List,
  Paintbrush,
  RefreshCw,
  Share2,
  Shield,
  ShieldAlert,
  X,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { useCopyFeedback } from "@/components/copy-feedback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { patternScenarios } from "./data/pattern-finder";
import { type DevLevelFilter, levelColors } from "./data/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Share2,
  Zap,
  ClipboardCheck,
  RefreshCw,
  Shield,
  List,
  Paintbrush,
  Download,
  ShieldAlert,
};

interface PatternFinderSectionProps {
  level: DevLevelFilter;
}

export function PatternFinderSection({ level }: PatternFinderSectionProps) {
  const t = useTranslations("devResourcesPage.patternFinder");
  const tData = useTranslations("devResourcesData.patterns") as unknown as {
    (key: string): string;
    raw(key: string): unknown;
  };
  const tLevel = useTranslations("devResourcesPage.levelSelector.levels");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { showFeedback } = useCopyFeedback();

  const filteredScenarios = useMemo(
    () =>
      level === "all"
        ? patternScenarios
        : patternScenarios.filter((s) => s.level === level),
    [level],
  );

  const toggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handleCopy = useCallback(
    async (code: string, id: string) => {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      showFeedback();
      setTimeout(() => setCopiedId(null), 2000);
    },
    [showFeedback],
  );

  if (filteredScenarios.length === 0) return null;

  return (
    <section id="patterns" className="relative px-4 py-16 md:px-6 md:py-32">
      <div className="mx-auto max-w-4xl">
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
            className="space-y-4"
          >
            {filteredScenarios.map((scenario, index) => {
              const Icon = iconMap[scenario.icon] || HelpCircle;
              const isExpanded = expandedId === scenario.id;
              const contentId = `pattern-content-${scenario.id}`;

              const whenItems = tData.raw(`${scenario.id}.when`) as string[];
              const avoidItems = tData.raw(`${scenario.id}.avoid`) as string[];

              return (
                <AnimatedSection key={scenario.id} delay={0.1 + index * 0.05}>
                  <Card className="border-border bg-card">
                    <button
                      onClick={() => toggleExpand(scenario.id)}
                      aria-expanded={isExpanded}
                      aria-controls={contentId}
                      className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/50 md:gap-4 md:p-5"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 md:h-10 md:w-10">
                        <Icon className="h-4 w-4 text-primary md:h-5 md:w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground md:text-base">
                          {String(tData.raw(`${scenario.id}.question`))}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5 md:gap-2">
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${levelColors[scenario.level]}`}
                          >
                            {tLevel(scenario.level)}
                          </Badge>
                          <span className="text-[11px] text-muted-foreground md:text-xs">
                            {String(tData.raw(`${scenario.id}.pattern`))}
                          </span>
                        </div>
                      </div>

                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0"
                      >
                        <ChevronDown className="h-4 w-4 text-muted-foreground md:h-5 md:w-5" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          id={contentId}
                          role="region"
                          aria-labelledby={`pattern-trigger-${scenario.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4">
                            <div className="mb-3 md:mb-4">
                              <h4 className="mb-1.5 text-sm font-semibold text-primary md:mb-2 md:text-lg">
                                {String(tData.raw(`${scenario.id}.pattern`))}
                              </h4>
                              <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
                                {String(
                                  tData.raw(`${scenario.id}.explanation`),
                                )}
                              </p>
                            </div>

                            <div className="relative mb-3 md:mb-4">
                              <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[11px] leading-relaxed md:p-4 md:text-xs">
                                <code className="font-mono">
                                  {scenario.code}
                                </code>
                              </pre>
                              <Button
                                size="sm"
                                variant="secondary"
                                aria-label={`${t("copy")} ${String(tData.raw(`${scenario.id}.pattern`))}`}
                                className="absolute right-2 top-2 h-7 px-2 text-[10px] md:h-8 md:px-3 md:text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopy(scenario.code, scenario.id);
                                }}
                              >
                                {copiedId === scenario.id
                                  ? t("copied")
                                  : t("copy")}
                              </Button>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
                              <div>
                                <p className="mb-1.5 text-xs font-semibold text-green-600 md:mb-2 md:text-sm">
                                  {t("whenToUse")}
                                </p>
                                <ul className="space-y-1.5">
                                  {whenItems.map((item, i) => (
                                    <li
                                      key={i}
                                      className="flex gap-1.5 text-[11px] text-muted-foreground md:gap-2 md:text-xs"
                                    >
                                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-green-500" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="mb-1.5 text-xs font-semibold text-destructive md:mb-2 md:text-sm">
                                  {t("whenToAvoid")}
                                </p>
                                <ul className="space-y-1.5">
                                  {avoidItems.map((item, i) => (
                                    <li
                                      key={i}
                                      className="flex gap-1.5 text-[11px] text-muted-foreground md:gap-2 md:text-xs"
                                    >
                                      <X className="mt-0.5 h-3 w-3 shrink-0 text-destructive" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </AnimatedSection>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
