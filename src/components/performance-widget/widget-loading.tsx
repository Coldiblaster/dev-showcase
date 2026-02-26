"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const SCORE_COUNT = 4;
const VITAL_ROW_COUNT = 5;

/** Tamanho do CircleScore no conteúdo real (36px = 9 em Tailwind). */
const SCORE_CIRCLE_SIZE = 36;

interface PerformanceWidgetLoadingProps {
  loadingPrompt: string;
  analyzingText: string;
  /** Dica de que pode minimizar enquanto carrega (ex.: "Você pode minimizar enquanto carrega.") */
  analyzingMinimizeHint?: string;
  scoreLabels: string[];
  className?: string;
}

/**
 * Skeleton que replica exatamente o layout do conteúdo carregado:
 * Scores (label + grid 4 círculos) → border → Web Vitals (label + 5 linhas) → border → footer.
 */
export function PerformanceWidgetLoading({
  loadingPrompt,
  analyzingText,
  analyzingMinimizeHint,
  scoreLabels: _scoreLabels,
  className,
}: PerformanceWidgetLoadingProps) {
  return (
    <div
      className={cn("space-y-3 p-3 sm:space-y-4 sm:p-4", className)}
      aria-busy
    >
      {/* Bloco Scores — mesma estrutura que PerformanceWidgetScores */}
      <div className="space-y-2">
        <p
          className="font-mono text-[10px] font-medium tracking-widest text-muted-foreground sm:text-xs"
          aria-hidden
        >
          <span className="text-primary">{loadingPrompt}</span>{" "}
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            {analyzingText}
          </motion.span>
        </p>
        {analyzingMinimizeHint && (
          <p
            className="font-mono text-[9px] text-muted-foreground/80 sm:text-[10px]"
            aria-hidden
          >
            {analyzingMinimizeHint}
          </p>
        )}
        <div
          className="grid grid-cols-2 gap-x-2 gap-y-3 sm:grid-cols-4 sm:gap-x-1.5 sm:gap-y-2"
          aria-hidden
        >
          {Array.from({ length: SCORE_COUNT }).map((_, i) => (
            <div key={i} className="flex min-w-0 flex-col items-center gap-1">
              <div
                className="rounded-full border-2 border-border bg-secondary/50 animate-pulse"
                style={{
                  width: SCORE_CIRCLE_SIZE,
                  height: SCORE_CIRCLE_SIZE,
                }}
              />
              <div className="h-3 w-full max-w-20 animate-pulse rounded bg-secondary" />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border" aria-hidden />

      {/* Bloco Web Vitals — mesma estrutura que PerformanceWidgetVitals */}
      <div className="space-y-2">
        <div
          className="h-3 w-20 animate-pulse rounded bg-secondary sm:w-24"
          aria-hidden
        />
        <div className="space-y-1.5">
          {Array.from({ length: VITAL_ROW_COUNT }).map((_, i) => (
            <div key={i} className="flex items-center gap-2" aria-hidden>
              <div className="h-3 w-8 shrink-0 animate-pulse rounded bg-secondary sm:w-9" />
              <div className="relative h-1.5 flex-1 rounded-full bg-secondary" />
              <div className="h-3 w-12 shrink-0 animate-pulse rounded bg-secondary sm:w-14" />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-1.5 sm:pt-2" aria-hidden />

      {/* Footer — mesma linha que o conteúdo */}
      <p
        className="font-mono text-[10px] text-muted-foreground sm:text-xs"
        aria-hidden
      >
        <span className="inline-block h-3 w-40 max-w-full animate-pulse rounded bg-secondary" />
      </p>
    </div>
  );
}
