"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import type { PerfMetric, PerfMetricsData, PerfScore } from "./types";

/** Coleta métricas da Performance API (Navigation Timing, Paint) + LCP do ref. */
function collectMetrics(getLcpMs: () => number | null): PerfMetricsData | null {
  try {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const paintEntries = performance.getEntriesByType("paint");
    const fcp =
      paintEntries.find((e) => e.name === "first-contentful-paint")
        ?.startTime ?? null;
    const ttfb = nav ? nav.responseStart - nav.requestStart : null;
    const lcp = getLcpMs();

    const fcpScore =
      fcp !== null
        ? Math.max(0, Math.min(100, Math.round(100 - fcp / 30)))
        : null;
    const ttfbScore =
      ttfb !== null
        ? Math.max(0, Math.min(100, Math.round(100 - ttfb / 8)))
        : null;
    const perfScore =
      fcpScore !== null && ttfbScore !== null
        ? Math.round((fcpScore + ttfbScore) / 2)
        : null;

    const vitals: PerfMetric[] = [
      {
        label: "",
        shortLabel: "FCP",
        value: fcp !== null ? Math.round(fcp) : null,
        unit: "ms",
        description: "",
        thresholds: { good: 1800, needs: 3000 },
        higherIsBetter: true,
      },
      {
        label: "",
        shortLabel: "TTFB",
        value: ttfb !== null ? Math.round(ttfb) : null,
        unit: "ms",
        description: "",
        thresholds: { good: 800, needs: 1800 },
        higherIsBetter: true,
      },
      {
        label: "",
        shortLabel: "LCP",
        value: lcp !== null ? Math.round(lcp) : null,
        unit: "ms",
        description: "",
        thresholds: { good: 2500, needs: 4000 },
        higherIsBetter: true,
      },
      {
        label: "",
        shortLabel: "DOM",
        value: nav
          ? Math.round(nav.domContentLoadedEventEnd - nav.startTime)
          : null,
        unit: "ms",
        description: "",
        thresholds: { good: 1500, needs: 3500 },
        higherIsBetter: true,
      },
    ];

    const scores: PerfScore[] = [
      { scoreKey: "performance", value: perfScore ?? null },
      { scoreKey: "accessibility", value: 100 },
      { scoreKey: "bestPractices", value: 100 },
      { scoreKey: "seo", value: 100 },
    ];

    return { scores, vitals, collectedAt: 0 };
  } catch {
    return null;
  }
}

const FALLBACK: PerfMetricsData = {
  collectedAt: 0,
  scores: [
    { scoreKey: "performance", value: 89 },
    { scoreKey: "accessibility", value: 100 },
    { scoreKey: "bestPractices", value: 100 },
    { scoreKey: "seo", value: 100 },
  ],
  vitals: [
    {
      label: "",
      shortLabel: "FCP",
      value: 545,
      unit: "ms",
      description: "",
      thresholds: { good: 1800, needs: 3000 },
      higherIsBetter: true,
    },
    {
      label: "",
      shortLabel: "TTFB",
      value: 198,
      unit: "ms",
      description: "",
      thresholds: { good: 800, needs: 1800 },
      higherIsBetter: true,
    },
    {
      label: "",
      shortLabel: "LCP",
      value: 1893,
      unit: "ms",
      description: "",
      thresholds: { good: 2500, needs: 4000 },
      higherIsBetter: true,
    },
    {
      label: "",
      shortLabel: "DOM",
      value: 320,
      unit: "ms",
      description: "",
      thresholds: { good: 1500, needs: 3500 },
      higherIsBetter: true,
    },
  ],
};

const LOAD_DELAY_MS = 400;

/** Registra observer de LCP só quando o widget está aberto (buffered: true pega entrada já ocorrida). */
function useLcpRef(active: boolean) {
  const lcpRef = useRef<number | null>(null);

  useEffect(() => {
    if (
      !active ||
      typeof window === "undefined" ||
      !("PerformanceObserver" in window)
    )
      return;
    const supported = PerformanceObserver.supportedEntryTypes;
    if (!supported?.includes("largest-contentful-paint")) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) lcpRef.current = last.startTime;
    });
    try {
      observer.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // ignore
    }
    return () => observer.disconnect();
  }, [active]);

  return lcpRef;
}

export function usePerformanceMetrics(active: boolean) {
  const lcpRef = useLcpRef(active);
  const pathname = usePathname();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [metrics, setMetrics] = useState<PerfMetricsData | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setLoading(true);
    setMetrics(null);
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      const getLcp = () => lcpRef.current;
      const data = collectMetrics(getLcp);
      const payload = data
        ? { ...data, collectedAt: Date.now() }
        : { ...FALLBACK, collectedAt: Date.now() };
      setMetrics(payload);
      setLoading(false);
    }, LOAD_DELAY_MS);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  // Ao abrir o widget ou ao mudar de rota: loading + coleta (Performance API do navegador, não chama API HTTP).
  useEffect(() => {
    if (!active) return;
    const cleanup = load();
    return cleanup;
  }, [active, pathname, load]);

  return { metrics, loading, reload: load };
}
