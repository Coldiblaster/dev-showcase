/** Uma métrica de Web Vital (FCP, TTFB, LCP, DOM) */
export interface PerfMetric {
  label: string;
  shortLabel: string;
  value: number | null;
  unit: string;
  description: string;
  thresholds: { good: number; needs: number };
  higherIsBetter: boolean;
}

/** Chave do score para i18n */
export type PerfScoreKey =
  | "performance"
  | "accessibility"
  | "bestPractices"
  | "seo";

/** Score de categoria (Performance, Acessibilidade, etc.) */
export interface PerfScore {
  scoreKey: PerfScoreKey;
  value: number | null;
}

export interface PerfMetricsData {
  scores: PerfScore[];
  vitals: PerfMetric[];
  /** Timestamp (ms) em que os dados foram coletados. */
  collectedAt: number;
}
