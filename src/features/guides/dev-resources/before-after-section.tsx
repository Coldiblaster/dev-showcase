"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { comparisons } from "./data/comparisons";
import { type DevLevelFilter, levelColors } from "./data/types";

interface BeforeAfterSectionProps {
  level: DevLevelFilter;
}

export function BeforeAfterSection({ level }: BeforeAfterSectionProps) {
  const t = useTranslations("devResourcesPage.beforeAfter");
  const tLevel = useTranslations("devResourcesPage.levelSelector.levels");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const filteredComparisons = useMemo(
    () =>
      level === "all"
        ? comparisons
        : comparisons.filter((c) => c.level === level),
    [level],
  );

  useEffect(() => {
    setCurrentIndex(0);
  }, [level]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) =>
      prev < filteredComparisons.length - 1 ? prev + 1 : prev,
    );
  }, [filteredComparisons.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  if (filteredComparisons.length === 0) return null;

  const comparison = filteredComparisons[currentIndex];

  return (
    <section id="refactoring" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <AnimatedSection>
          <div className="mb-12 text-center">
            <Badge variant="secondary" className="mb-4 font-mono text-xs">
              {t("badge")}
            </Badge>
            <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </AnimatedSection>

        {/* Navigation bar */}
        <AnimatedSection delay={0.1}>
          <div className="mb-8 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              aria-label={t("nav.prev")}
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              {t("nav.prev")}
            </Button>

            {/* Dot indicators */}
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Navegação de exemplos"
            >
              {filteredComparisons.map((comp, index) => (
                <button
                  key={comp.id}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`${comp.title} (${index + 1} / ${filteredComparisons.length})`}
                  onClick={() => goTo(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              aria-label={t("nav.next")}
              onClick={goNext}
              disabled={currentIndex === filteredComparisons.length - 1}
              className="gap-1"
            >
              {t("nav.next")}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </AnimatedSection>

        {/* Single comparison with animation */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={comparison.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Card className="overflow-hidden border-border bg-card">
              <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="outline">{comparison.category}</Badge>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${levelColors[comparison.level]}`}
                    >
                      {tLevel(comparison.level)}
                    </Badge>
                    <span className="ml-auto text-sm text-muted-foreground">
                      {currentIndex + 1} / {filteredComparisons.length}
                    </span>
                  </div>
                  <h3 className="mb-2 text-2xl font-semibold">
                    {comparison.title}
                  </h3>
                  <p className="text-muted-foreground">{comparison.problem}</p>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="comparison" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="comparison">
                      {t("tabs.comparison")}
                    </TabsTrigger>
                    <TabsTrigger value="before">{t("tabs.before")}</TabsTrigger>
                    <TabsTrigger value="after">{t("tabs.after")}</TabsTrigger>
                  </TabsList>

                  {/* Comparison View */}
                  <TabsContent value="comparison" className="mt-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <X className="h-4 w-4 text-destructive" />
                          <span className="font-semibold">
                            {t("beforeProblems")}
                          </span>
                        </div>
                        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
                          <code className="font-mono">
                            {comparison.before.code}
                          </code>
                        </pre>
                        <ul className="space-y-2 text-sm">
                          {comparison.before.issues.map((issue, i) => (
                            <li key={i} className="flex gap-2 text-destructive">
                              <X className="mt-0.5 h-4 w-4 shrink-0" />
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="font-semibold">
                            {t("afterImprovements")}
                          </span>
                        </div>
                        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
                          <code className="font-mono">
                            {comparison.after.code}
                          </code>
                        </pre>
                        <ul className="space-y-2 text-sm">
                          {comparison.after.improvements.map(
                            (improvement, i) => (
                              <li key={i} className="flex gap-2 text-green-500">
                                <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                <span>{improvement}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Before Tab */}
                  <TabsContent value="before" className="mt-6">
                    <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                      <code className="font-mono">
                        {comparison.before.code}
                      </code>
                    </pre>
                    <ul className="mt-4 space-y-2 text-sm">
                      {comparison.before.issues.map((issue, i) => (
                        <li key={i} className="flex gap-2 text-destructive">
                          <X className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>

                  {/* After Tab */}
                  <TabsContent value="after" className="mt-6">
                    <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                      <code className="font-mono">{comparison.after.code}</code>
                    </pre>
                    <ul className="mt-4 space-y-2 text-sm">
                      {comparison.after.improvements.map((improvement, i) => (
                        <li key={i} className="flex gap-2 text-green-500">
                          <Check className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
