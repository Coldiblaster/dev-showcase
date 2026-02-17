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
    <section id="patterns" className="relative px-6 py-16 md:py-32">
      <div className="mx-auto max-w-4xl">
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
            className="space-y-4"
          >
            {filteredScenarios.map((scenario, index) => {
              const Icon = iconMap[scenario.icon] || HelpCircle;
              const isExpanded = expandedId === scenario.id;
              const contentId = `pattern-content-${scenario.id}`;

              return (
                <AnimatedSection key={scenario.id} delay={0.1 + index * 0.05}>
                  <Card className="overflow-hidden border-border bg-card">
                    {/* Question button */}
                    <button
                      onClick={() => toggleExpand(scenario.id)}
                      aria-expanded={isExpanded}
                      aria-controls={contentId}
                      className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-muted/50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold text-foreground">
                          {scenario.question}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${levelColors[scenario.level]}`}
                          >
                            {tLevel(scenario.level)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {scenario.pattern}
                          </span>
                        </div>
                      </div>

                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                    </button>

                    {/* Expanded answer */}
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
                          <div className="border-t px-5 pb-5 pt-4">
                            {/* Pattern name and explanation */}
                            <div className="mb-4">
                              <h4 className="mb-2 text-base font-semibold text-primary md:text-lg">
                                {scenario.pattern}
                              </h4>
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                {scenario.explanation}
                              </p>
                            </div>

                            {/* Code */}
                            <div className="relative mb-4">
                              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
                                <code className="font-mono">
                                  {scenario.code}
                                </code>
                              </pre>
                              <Button
                                size="sm"
                                variant="secondary"
                                aria-label={`${t("copy")} ${scenario.pattern}`}
                                className="absolute right-2 top-2"
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

                            {/* When to use / Avoid */}
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <p className="mb-2 text-sm font-semibold text-green-600">
                                  {t("whenToUse")}
                                </p>
                                <ul className="space-y-1.5">
                                  {scenario.when.map((item, i) => (
                                    <li
                                      key={i}
                                      className="flex gap-2 text-xs text-muted-foreground"
                                    >
                                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-green-500" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="mb-2 text-sm font-semibold text-destructive">
                                  {t("whenToAvoid")}
                                </p>
                                <ul className="space-y-1.5">
                                  {scenario.avoid.map((item, i) => (
                                    <li
                                      key={i}
                                      className="flex gap-2 text-xs text-muted-foreground"
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
