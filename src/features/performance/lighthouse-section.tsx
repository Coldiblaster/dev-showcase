"use client";

import { BarChart3, Info, RefreshCw, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { ScoreGauge } from "@/components/score-gauge";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type {
  LighthouseMetrics,
  LighthouseResponse,
  LighthouseScores,
} from "@/types/lighthouse";

/** Fallback quando a API não retorna ou está carregando */
const FALLBACK_SCORES: LighthouseScores = {
  performance: 95,
  accessibility: 100,
  bestPractices: 100,
  seo: 100,
};

const SCORE_ITEMS = [
  {
    key: "performance" as const,
    labelKey: "performance" as const,
    tooltipKey: "tooltipPerformance" as const,
  },
  {
    key: "accessibility" as const,
    labelKey: "accessibility" as const,
    tooltipKey: "tooltipAccessibility" as const,
  },
  {
    key: "bestPractices" as const,
    labelKey: "bestPractices" as const,
    tooltipKey: "tooltipBestPractices" as const,
  },
  {
    key: "seo" as const,
    labelKey: "seo" as const,
    tooltipKey: "tooltipSeo" as const,
  },
] as const;

const METRIC_KEYS = ["lcp", "fcp", "ttfb", "cls", "tbt"] as const;

function formatMetricValue(
  key: (typeof METRIC_KEYS)[number],
  value: number,
  msLabel: string,
): string {
  if (key === "cls") return value.toFixed(3);
  return `${value}${msLabel}`;
}

export function LighthouseSection() {
  const t = useTranslations("performancePage.lighthouse");
  const pathname = usePathname();
  const [scores, setScores] = useState<LighthouseScores | null>(null);
  const [metrics, setMetrics] = useState<LighthouseMetrics | null>(null);
  const [source, setSource] = useState<LighthouseResponse["source"] | null>(
    null,
  );
  const [reason, setReason] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [strategy, setStrategy] = useState<"mobile" | "desktop">("desktop");

  const fetchData = useCallback(
    (forceRefresh = false) => {
      setLoading(true);
      const params = new URLSearchParams({ strategy });
      if (pathname) params.set("path", pathname);
      if (forceRefresh) params.set("refresh", "1");
      fetch(`/api/lighthouse?${params}`, { cache: "no-store" })
        .then((res) => res.json())
        .then((data: LighthouseResponse) => {
          setScores(data.scores);
          setMetrics(data.metrics ?? null);
          setSource(data.source);
          setReason(data.reason ?? null);
        })
        .catch(() => {
          setScores(FALLBACK_SCORES);
          setMetrics(null);
          setSource("fallback");
          setReason(null);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [strategy, pathname],
  );

  useEffect(() => {
    fetchData(false);
  }, [fetchData]);

  const displayScores = scores ?? FALLBACK_SCORES;
  const isFromGoogle =
    source === "api" || source === "redis" || source === "memory";
  const hasMetrics =
    metrics &&
    Object.keys(metrics).length > 0 &&
    Object.values(metrics).some((v) => v != null);

  return (
    <SectionWrapper id="lighthouse" variant="alternate">
      <AnimatedSection>
        <SectionHeader icon={BarChart3} title={t("title")} />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <p className="mb-6 text-muted-foreground">{t("description")}</p>
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {t("strategyLabel")}
          </span>
          <div className="flex rounded-lg border border-border bg-muted/30 p-0.5">
            {(["desktop", "mobile"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStrategy(s)}
                className={cn(
                  "min-h-[44px] rounded-md px-3 py-2 text-xs font-medium transition-colors sm:py-1.5",
                  strategy === s
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t(s === "desktop" ? "strategyDesktop" : "strategyMobile")}
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Scores com gauges */}
      <div className="mb-10">
        <h3 className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          <BarChart3 className="h-4 w-4" />
          {t("scores")}
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SCORE_ITEMS.map(({ key, labelKey, tooltipKey }, i) => (
            <AnimatedSection key={key} delay={0.15 + i * 0.05}>
              <div className="flex flex-col items-center rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/20 hover:bg-card/70">
                {loading ? (
                  <Skeleton
                    className="h-36 w-36 rounded-full"
                    role="status"
                    aria-label={t("loading")}
                  />
                ) : (
                  <ScoreGauge
                    score={displayScores[key]}
                    label={t("scoreSuffix")}
                  />
                )}
                <span className="mt-3 flex items-center justify-center gap-1.5 text-center text-sm font-medium text-foreground">
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
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Métricas lab (quando disponíveis) */}
      {!hasMetrics && isFromGoogle && !loading && (
        <AnimatedSection delay={0.25}>
          <p className="mb-4 text-xs text-muted-foreground">
            {t("metricsHint")}
          </p>
        </AnimatedSection>
      )}
      {hasMetrics && (
        <AnimatedSection delay={0.3}>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            <Zap className="h-4 w-4" />
            {t("metricsLab")}
          </h3>
          <div className="flex flex-wrap gap-3">
            {METRIC_KEYS.map((key) => {
              const value = metrics?.[key as keyof LighthouseMetrics];
              if (value == null) return null;
              const tooltipKey =
                `tooltip${key.charAt(0).toUpperCase()}${key.slice(1)}` as
                  | "tooltipLcp"
                  | "tooltipFcp"
                  | "tooltipTtfb"
                  | "tooltipCls"
                  | "tooltipTbt";
              return (
                <div
                  key={key}
                  className={cn(
                    "flex items-center gap-1.5 rounded-xl border border-border bg-card/30 px-4 py-2.5 backdrop-blur-sm",
                    "font-mono text-sm font-medium",
                  )}
                >
                  <span className="text-muted-foreground">{t(key)}:</span>{" "}
                  <span className="text-foreground">
                    {formatMetricValue(key, value, t("ms"))}
                  </span>
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
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection delay={0.4}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            {isFromGoogle ? t("poweredBy") : (reason ?? t("poweredByFallback"))}
          </p>
          {isFromGoogle && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchData(true)}
              disabled={loading}
              className="gap-1.5 text-xs"
            >
              <RefreshCw
                className={cn("h-3.5 w-3.5", loading && "animate-spin")}
              />
              {t("refresh")}
            </Button>
          )}
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
