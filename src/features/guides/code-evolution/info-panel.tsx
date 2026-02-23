"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

import type { MetricValue } from "./types";

type ImprovementsListProps = {
  improvements: Record<string, string>;
};

function ImprovementsList({ improvements }: ImprovementsListProps) {
  const t = useTranslations("codeEvolutionPage");
  const entries = Object.values(improvements);

  if (entries.length === 0) return null;

  return (
    <div className="mb-6">
      <h4 className="mb-3 text-sm font-semibold text-foreground">
        {t("ui.whatChanged")}
      </h4>
      <div className="space-y-2">
        {entries.map((improvement, i) => (
          <motion.div
            key={improvement}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-2"
          >
            <CheckCircle2
              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              aria-hidden
            />
            <span className="text-sm text-muted-foreground">{improvement}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

type MetricsTableProps = {
  metrics: MetricValue[];
  metricLabels: Record<string, string>;
  showBefore: boolean;
};

function MetricsTable({
  metrics,
  metricLabels,
  showBefore,
}: MetricsTableProps) {
  const t = useTranslations("codeEvolutionPage");

  return (
    <div className="mt-auto">
      <h4 className="mb-3 text-sm font-semibold text-foreground">
        {t("ui.metrics")}
      </h4>
      <div className="space-y-3">
        {metrics.map((metric, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {metricLabels[i]}
            </span>
            <div className="flex items-center gap-2">
              {showBefore && (
                <>
                  <span className="text-xs text-muted-foreground/60 line-through">
                    {metric.before}
                  </span>
                  <ArrowRight
                    className="h-3 w-3 text-muted-foreground/40"
                    aria-hidden
                  />
                </>
              )}
              <span
                className={`text-sm font-semibold ${
                  metric.improved ? "text-primary" : "text-foreground"
                }`}
              >
                {metric.after}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type InfoPanelProps = {
  stepId: string;
  stepIndex: number;
  stepCount: number;
  commitMessage: string;
  metrics: MetricValue[];
  improvements: Record<string, string>;
  metricLabels: Record<string, string>;
};

export function InfoPanel({
  stepId,
  stepIndex,
  stepCount,
  commitMessage,
  metrics,
  improvements,
  metricLabels,
}: InfoPanelProps) {
  const t = useTranslations("codeEvolutionPage");
  const title = commitMessage.replace(/^(feat|refactor|fix):\s*/, "");

  return (
    <div className="col-span-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={stepId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex h-full flex-col p-6"
        >
          <div className="mb-6">
            <span className="font-mono text-xs text-muted-foreground">
              {t("ui.version")} {stepIndex + 1} {t("ui.of")} {stepCount}
            </span>
            <h3 className="mt-1 text-lg font-semibold text-foreground capitalize">
              {title}
            </h3>
          </div>

          <ImprovementsList improvements={improvements} />

          <MetricsTable
            metrics={metrics}
            metricLabels={metricLabels}
            showBefore={stepIndex > 0}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
