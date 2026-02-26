export interface LighthouseScores {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

/** Métricas lab do Lighthouse (em ms, exceto CLS) */
export interface LighthouseMetrics {
  lcp?: number;
  fcp?: number;
  ttfb?: number;
  cls?: number;
  tbt?: number;
}

/** Origem dos scores: API Google, cache ou fallback estático */
export type LighthouseSource = "api" | "redis" | "memory" | "fallback";

export type LighthouseStrategy = "mobile" | "desktop";

export interface LighthouseResponse {
  scores: LighthouseScores;
  metrics?: LighthouseMetrics;
  source: LighthouseSource;
  strategy?: LighthouseStrategy;
  /** Motivo do fallback (apenas quando source === "fallback") — útil para debug */
  reason?: string;
}
