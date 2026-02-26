"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import type {
  LighthouseMetrics,
  LighthouseResponse,
  LighthouseScores,
} from "@/types/lighthouse";

import type { PerfMetric, PerfMetricsData, PerfScore } from "./types";

const SCORE_KEYS: Array<keyof LighthouseScores> = [
  "performance",
  "accessibility",
  "bestPractices",
  "seo",
];

/** Ordem e definição das métricas LAB do Lighthouse no widget (igual à tela de performance). */
function lighthouseMetricsToVitals(m: LighthouseMetrics): PerfMetric[] {
  const vitals: PerfMetric[] = [];
  if (m.lcp != null) {
    vitals.push({
      label: "",
      shortLabel: "LCP",
      value: m.lcp,
      unit: "ms",
      description: "",
      thresholds: { good: 2500, needs: 4000 },
      higherIsBetter: true,
    });
  }
  if (m.fcp != null) {
    vitals.push({
      label: "",
      shortLabel: "FCP",
      value: m.fcp,
      unit: "ms",
      description: "",
      thresholds: { good: 1800, needs: 3000 },
      higherIsBetter: true,
    });
  }
  if (m.ttfb != null) {
    vitals.push({
      label: "",
      shortLabel: "TTFB",
      value: m.ttfb,
      unit: "ms",
      description: "",
      thresholds: { good: 800, needs: 1800 },
      higherIsBetter: true,
    });
  }
  if (m.cls != null) {
    vitals.push({
      label: "",
      shortLabel: "CLS",
      value: m.cls,
      unit: "",
      description: "",
      thresholds: { good: 0.1, needs: 0.25 },
      higherIsBetter: false,
    });
  }
  if (m.tbt != null) {
    vitals.push({
      label: "",
      shortLabel: "TBT",
      value: m.tbt,
      unit: "ms",
      description: "",
      thresholds: { good: 200, needs: 600 },
      higherIsBetter: false,
    });
  }
  return vitals;
}

function responseToPerfData(data: LighthouseResponse): PerfMetricsData {
  const scores: PerfScore[] = SCORE_KEYS.map((scoreKey) => ({
    scoreKey,
    value: data.scores[scoreKey] ?? null,
  }));
  const vitals = data.metrics ? lighthouseMetricsToVitals(data.metrics) : [];
  return {
    scores,
    vitals,
    collectedAt: Date.now(),
  };
}

export type LighthouseWidgetSource = LighthouseResponse["source"];

export function useLighthouseMetrics(
  active: boolean,
  strategy: "desktop" | "mobile",
) {
  const pathname = usePathname();
  const abortRef = useRef<AbortController | null>(null);
  const [metrics, setMetrics] = useState<PerfMetricsData | null>(null);
  const [source, setSource] = useState<LighthouseWidgetSource | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setLoading(true);
    setMetrics(null);
    setSource(null);
    const controller = new AbortController();
    abortRef.current = controller;
    const params = new URLSearchParams({ strategy });
    if (pathname) params.set("path", pathname);
    fetch(`/api/lighthouse?${params}`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: LighthouseResponse) => {
        if (abortRef.current !== controller) return;
        if (data?.scores && typeof data.source === "string") {
          setSource(data.source);
          setMetrics(responseToPerfData(data));
        } else {
          setMetrics(null);
          setSource(null);
        }
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        if (abortRef.current === controller) {
          setMetrics(null);
          setSource(null);
        }
      })
      .finally(() => {
        if (abortRef.current === controller) {
          abortRef.current = null;
          setLoading(false);
        }
      });
    return () => {
      controller.abort();
    };
  }, [strategy, pathname]);

  useEffect(() => {
    if (!active) return;
    const cleanup = load();
    return () => {
      cleanup();
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
    };
  }, [active, pathname, load]);

  return { metrics, loading, reload: load, source };
}
