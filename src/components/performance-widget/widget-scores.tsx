"use client";

import { cn } from "@/lib/utils";

import { CircleScore } from "./circle-score";
import type { PerfScore } from "./types";

interface PerformanceWidgetScoresProps {
  scores: PerfScore[];
  scoresLabel: string;
  getScoreLabel: (scoreKey: PerfScore["scoreKey"]) => string;
  className?: string;
}

export function PerformanceWidgetScores({
  scores,
  scoresLabel,
  getScoreLabel,
  className,
}: PerformanceWidgetScoresProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="font-mono text-[10px] font-medium tracking-widest text-muted-foreground sm:text-xs">
        {scoresLabel}
      </p>
      <div className="grid grid-cols-2 gap-x-2 gap-y-3 sm:grid-cols-4 sm:gap-x-1.5 sm:gap-y-2">
        {scores.map((s) => (
          <div
            key={s.scoreKey}
            className="flex min-w-0 flex-col items-center gap-1"
          >
            <CircleScore score={s.value} size={36} />
            <span
              className="w-full text-center font-mono text-[10px] leading-tight text-muted-foreground sm:max-w-[5rem] sm:break-words sm:leading-snug"
              title={getScoreLabel(s.scoreKey)}
            >
              {getScoreLabel(s.scoreKey)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
