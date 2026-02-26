import type { PerfMetric } from "./types";

export function getScoreColor(
  value: number | null,
  thresholds: { good: number; needs: number },
  higherIsBetter: boolean,
): string {
  if (value === null) return "hsl(var(--muted-foreground))";
  const isGood = higherIsBetter
    ? value <= thresholds.good
    : value >= thresholds.good;
  const isNeeds = higherIsBetter
    ? value <= thresholds.needs
    : value >= thresholds.needs;
  if (isGood) return "hsl(166 76% 58%)";
  if (isNeeds) return "hsl(43 74% 66%)";
  return "hsl(0 84% 60%)";
}

export function getScoreBadgeClass(score: number | null): string {
  if (score === null) return "text-muted-foreground";
  if (score >= 90) return "text-primary";
  if (score >= 50) return "text-amber-500 dark:text-amber-400";
  return "text-destructive";
}

export function getVitalProgressPct(metric: PerfMetric): number {
  if (metric.value === null) return 0;
  const cap = metric.thresholds.needs * 1.2;
  const raw = (metric.value / cap) * 100;
  if (metric.higherIsBetter) return Math.min(100, raw);
  return Math.max(0, 100 - raw);
}
