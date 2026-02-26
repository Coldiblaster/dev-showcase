"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import type { PerfMetric } from "./types";
import { getScoreColor, getVitalProgressPct } from "./utils";

interface PerformanceWidgetVitalsProps {
  vitals: PerfMetric[];
  webVitalsLabel: string;
  getVitalShortLabel: (shortLabel: string) => string;
  /** Tooltip por vital (ex.: t(`vitalsDescription.${shortLabel}`)) */
  getVitalDescription?: (shortLabel: string) => string;
  className?: string;
}

export function PerformanceWidgetVitals({
  vitals,
  webVitalsLabel,
  getVitalShortLabel,
  getVitalDescription,
  className,
}: PerformanceWidgetVitalsProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="font-mono text-[10px] font-medium tracking-widest text-muted-foreground sm:text-xs">
        {webVitalsLabel}
      </p>
      <div className="space-y-1.5">
        {vitals.map((m) => {
          const color = getScoreColor(m.value, m.thresholds, m.higherIsBetter);
          const pct = getVitalProgressPct(m);
          return (
            <div
              key={m.shortLabel}
              className="group/vital flex items-center gap-2"
              title={
                (getVitalDescription?.(m.shortLabel) ?? m.description) ||
                undefined
              }
            >
              <span className="w-8 shrink-0 font-mono text-[10px] font-semibold text-muted-foreground sm:w-9 sm:text-xs">
                {getVitalShortLabel(m.shortLabel)}
              </span>
              <div className="relative h-1.5 flex-1 rounded-full bg-secondary">
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                />
              </div>
              <span
                className="w-12 shrink-0 text-right font-mono text-[10px] font-medium sm:w-14 sm:text-xs"
                style={{ color }}
              >
                {typeof m.value === "number" && m.unit === ""
                  ? m.value.toFixed(3)
                  : m.value}
                {m.unit}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
