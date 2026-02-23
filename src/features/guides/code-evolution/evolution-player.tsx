"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  GitBranch,
  GitCommit,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import { CodePanel } from "./code-panel";
import { EVOLUTIONS } from "./evolution-data";
import { InfoPanel } from "./info-panel";
import type { EvolutionLevel } from "./types";

type LevelConfig = {
  color: string;
  bg: string;
  border: string;
  icon: React.ElementType;
};

const LEVEL_STYLE_MAP: Record<EvolutionLevel, LevelConfig> = {
  bad: {
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
    icon: AlertTriangle,
  },
  better: {
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
    icon: ArrowRight,
  },
  good: {
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    icon: CheckCircle2,
  },
  great: {
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    icon: Zap,
  },
};

const AUTOPLAY_INTERVAL_MS = 3000;

type EvolutionSelectorProps = {
  selectedIndex: number;
  onSelect: (index: number) => void;
};

function EvolutionSelector({
  selectedIndex,
  onSelect,
}: EvolutionSelectorProps) {
  const t = useTranslations("codeEvolutionPage");

  return (
    <div className="mb-8 flex flex-wrap justify-center gap-3">
      {EVOLUTIONS.map((evo, i) => (
        <button
          key={evo.id}
          onClick={() => onSelect(i)}
          aria-pressed={selectedIndex === i}
          className={`rounded-xl border px-5 py-3 text-left transition-all ${
            selectedIndex === i
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
          }`}
        >
          <span className="block text-sm font-semibold">
            {t(
              `evolutions.${evo.id}.title` as `evolutions.react-lifecycle.title`,
            )}
          </span>
          <span className="block text-xs text-muted-foreground">
            {t(
              `evolutions.${evo.id}.description` as `evolutions.react-lifecycle.description`,
            )}
          </span>
        </button>
      ))}
    </div>
  );
}

export function EvolutionPlayer() {
  const t = useTranslations("codeEvolutionPage");

  const [selectedEvolution, setSelectedEvolution] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const evolution = EVOLUTIONS[selectedEvolution];
  const step = evolution.steps[currentStep];
  const config = LEVEL_STYLE_MAP[step.level];
  const LevelIcon = config.icon;

  const progress = ((currentStep + 1) / evolution.steps.length) * 100;

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= evolution.steps.length - 1) {
        setIsPlaying(false);
        return prev;
      }
      return prev + 1;
    });
  }, [evolution.steps.length]);

  const prevStep = () => setCurrentStep((prev) => Math.max(0, prev - 1));

  const goToStep = (index: number) => {
    setCurrentStep(index);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(nextStep, AUTOPLAY_INTERVAL_MS);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, nextStep]);

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [selectedEvolution]);

  const tRaw = (key: string) => t.raw(key as Parameters<typeof t.raw>[0]);
  const tStr = (key: string) => t(key as Parameters<typeof t>[0]);

  const stepTranslationKey = `evolutions.${evolution.id}.${step.id}`;

  const improvements = tRaw(`${stepTranslationKey}.improvements`) as Record<
    string,
    string
  >;

  const metricLabels = tRaw(`${stepTranslationKey}.metricLabels`) as Record<
    string,
    string
  >;

  const timestamp = tStr(`${stepTranslationKey}.timestamp`);

  return (
    <>
      <EvolutionSelector
        selectedIndex={selectedEvolution}
        onSelect={setSelectedEvolution}
      />

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {/* Git-like top bar */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <GitBranch className="h-4 w-4 text-primary" aria-hidden />
            <span className="font-mono text-sm text-primary">
              {step.branch}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">{timestamp}</span>
            <div
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 ${config.bg} ${config.border}`}
            >
              <LevelIcon className={`h-3 w-3 ${config.color}`} aria-hidden />
              <span className={`text-xs font-medium ${config.color}`}>
                {t(`levels.${step.level}`)}
              </span>
            </div>
          </div>
        </div>

        {/* Commit message bar */}
        <div className="flex items-center gap-3 border-b border-border bg-muted/30 px-6 py-3">
          <GitCommit className="h-4 w-4 text-muted-foreground" aria-hidden />
          <span className="font-mono text-sm text-foreground">
            {step.commitMessage}
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="h-1 bg-border"
          role="progressbar"
          aria-valuenow={progress}
        >
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-5">
          <CodePanel
            step={step}
            stepCount={evolution.steps.length}
            currentStep={currentStep}
            isPlaying={isPlaying}
            onPrev={prevStep}
            onNext={nextStep}
            onTogglePlay={() => setIsPlaying((p) => !p)}
            onGoToStep={goToStep}
          />
          <InfoPanel
            stepId={step.id}
            stepIndex={currentStep}
            stepCount={evolution.steps.length}
            commitMessage={step.commitMessage}
            metrics={step.metrics}
            improvements={improvements}
            metricLabels={metricLabels}
          />
        </div>
      </div>
    </>
  );
}
