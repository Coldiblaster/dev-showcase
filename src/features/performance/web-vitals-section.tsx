"use client";

import { Gauge, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type MetricName = "LCP" | "INP" | "CLS" | "FCP" | "TTFB";
type MetricRating = "good" | "needs-improvement" | "poor";

interface MetricState {
  value: number;
  rating: MetricRating;
}

const INITIAL: Record<MetricName, MetricState | null> = {
  LCP: null,
  INP: null,
  CLS: null,
  FCP: null,
  TTFB: null,
};

function formatValue(name: MetricName, value: number): string {
  if (name === "CLS") return value.toFixed(3);
  return Math.round(value).toString();
}

function formatUnit(name: MetricName, t: (k: "ms") => string): string {
  return name === "CLS" ? "" : t("ms");
}

export function WebVitalsSection() {
  const t = useTranslations("performancePage.webVitals");
  const [metrics, setMetrics] = useState<
    Record<MetricName, MetricState | null>
  >({ ...INITIAL });

  const handleMetric = useCallback(
    (name: MetricName) => (metric: { value: number; rating: MetricRating }) => {
      setMetrics((prev) => ({
        ...prev,
        [name]: { value: metric.value, rating: metric.rating },
      }));
    },
    [],
  );

  useEffect(() => {
    onLCP(handleMetric("LCP"));
    onINP(handleMetric("INP"));
    onCLS(handleMetric("CLS"));
    onFCP(handleMetric("FCP"));
    onTTFB(handleMetric("TTFB"));
  }, [handleMetric]);

  const entries: {
    key: MetricName;
    labelKey: "lcp" | "inp" | "cls" | "fcp" | "ttfb";
    descKey: "lcpDesc" | "inpDesc" | "clsDesc" | "fcpDesc" | "ttfbDesc";
    tooltipKey:
      | "tooltipLcp"
      | "tooltipInp"
      | "tooltipCls"
      | "tooltipFcp"
      | "tooltipTtfb";
  }[] = [
    {
      key: "LCP",
      labelKey: "lcp",
      descKey: "lcpDesc",
      tooltipKey: "tooltipLcp",
    },
    {
      key: "INP",
      labelKey: "inp",
      descKey: "inpDesc",
      tooltipKey: "tooltipInp",
    },
    {
      key: "CLS",
      labelKey: "cls",
      descKey: "clsDesc",
      tooltipKey: "tooltipCls",
    },
    {
      key: "FCP",
      labelKey: "fcp",
      descKey: "fcpDesc",
      tooltipKey: "tooltipFcp",
    },
    {
      key: "TTFB",
      labelKey: "ttfb",
      descKey: "ttfbDesc",
      tooltipKey: "tooltipTtfb",
    },
  ];

  return (
    <SectionWrapper id="web-vitals" variant="default">
      <AnimatedSection>
        <SectionHeader icon={Gauge} title={t("title")} />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <p className="mb-6 text-muted-foreground">{t("description")}</p>
      </AnimatedSection>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map(({ key, labelKey, descKey, tooltipKey }, i) => {
          const m = metrics[key];
          const ratingKey = m ? `rating.${m.rating}` : null;
          const isLoading = !m;
          return (
            <AnimatedSection key={key} delay={0.1 + i * 0.05}>
              <div className="flex h-40 flex-col rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                <p className="mb-1 flex items-center gap-1.5 font-mono text-xs font-medium text-muted-foreground">
                  {t(labelKey)}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[44px] min-w-[44px]"
                        aria-label={t("ariaInfo")}
                      >
                        <Info className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[260px]">
                      {t(tooltipKey)}
                    </TooltipContent>
                  </Tooltip>
                </p>
                <p className="mb-3 text-xs text-muted-foreground">
                  {t(descKey)}
                </p>
                <div
                  className="flex min-h-12 items-baseline gap-2"
                  role={isLoading ? "status" : undefined}
                  aria-label={isLoading ? t("loading") : undefined}
                >
                  {isLoading ? (
                    <>
                      <Skeleton className="h-8 w-20 shrink-0" />
                      <Skeleton className="h-6 w-16 shrink-0 rounded-full" />
                    </>
                  ) : (
                    <>
                      <span className="font-mono text-2xl font-bold text-foreground">
                        {formatValue(key, m.value)}
                        {formatUnit(key, t)}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          m.rating === "good" &&
                            "border-green-500/50 text-green-600 dark:text-green-400",
                          m.rating === "needs-improvement" &&
                            "border-amber-500/50 text-amber-600 dark:text-amber-400",
                          m.rating === "poor" &&
                            "border-red-500/50 text-red-600 dark:text-red-400",
                        )}
                      >
                        {ratingKey
                          ? t(
                              ratingKey as
                                | "rating.good"
                                | "rating.needs-improvement"
                                | "rating.needsImprovement"
                                | "rating.poor",
                            )
                          : ""}
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>

      <AnimatedSection delay={0.4}>
        <p className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          {t("poweredBy")}
        </p>
      </AnimatedSection>
    </SectionWrapper>
  );
}
