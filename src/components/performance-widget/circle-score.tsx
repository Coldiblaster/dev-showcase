"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { getScoreBadgeClass } from "./utils";

interface CircleScoreProps {
  score: number | null;
  size?: number;
  className?: string;
}

export function CircleScore({ score, size = 36, className }: CircleScoreProps) {
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = score !== null ? (score / 100) * circumference : 0;
  const strokeClass =
    score === null
      ? "stroke-muted"
      : score >= 90
        ? "stroke-primary"
        : score >= 50
          ? "stroke-amber-500 dark:stroke-amber-400"
          : "stroke-destructive";

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-muted/30"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          className={strokeClass}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <span
        className={cn(
          "absolute font-mono text-xs font-bold",
          getScoreBadgeClass(score),
        )}
      >
        {score ?? "–"}
      </span>
    </div>
  );
}
