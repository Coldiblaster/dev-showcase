"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

import type { EvolutionStep } from "./types";

type CodeLineProps = {
  lineNumber: number;
  content: string;
  isHighlighted: boolean;
};

function CodeLine({ lineNumber, content, isHighlighted }: CodeLineProps) {
  return (
    <div
      className={`flex transition-colors ${
        isHighlighted
          ? "bg-primary/10 text-foreground"
          : "text-muted-foreground"
      }`}
    >
      <span className="inline-block w-10 select-none pr-4 text-right text-xs text-muted-foreground/40">
        {lineNumber}
      </span>
      <code className="flex-1 font-mono">{content || " "}</code>
    </div>
  );
}

type StepDotProps = {
  index: number;
  isCurrent: boolean;
  isPast: boolean;
  label: string;
  onClick: () => void;
};

function StepDot({ index, isCurrent, isPast, onClick, label }: StepDotProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-all ${
        isCurrent
          ? "bg-primary text-primary-foreground"
          : isPast
            ? "bg-primary/20 text-primary"
            : "bg-muted text-muted-foreground"
      }`}
    >
      {index + 1}
    </button>
  );
}

type CodePanelProps = {
  step: EvolutionStep;
  stepCount: number;
  currentStep: number;
  isPlaying: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  onGoToStep: (index: number) => void;
};

export function CodePanel({
  step,
  stepCount,
  currentStep,
  isPlaying,
  onPrev,
  onNext,
  onTogglePlay,
  onGoToStep,
}: CodePanelProps) {
  const t = useTranslations("codeEvolutionPage");

  return (
    <div className="col-span-3 border-r border-border">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onPrev}
            disabled={currentStep === 0}
            aria-label={t("ui.prevStep")}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onTogglePlay}
            aria-label={isPlaying ? t("ui.pause") : t("ui.play")}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onNext}
            disabled={currentStep === stepCount - 1}
            aria-label={t("ui.nextStep")}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {Array.from({ length: stepCount }).map((_, i) => (
            <StepDot
              key={i}
              index={i}
              isCurrent={i === currentStep}
              isPast={i < currentStep}
              onClick={() => onGoToStep(i)}
              label={t("ui.stepLabel", { number: i + 1 })}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-auto p-4"
          style={{ maxHeight: "500px" }}
          aria-label={t("ui.version") + " " + step.id}
        >
          <pre className="text-sm leading-relaxed">
            {step.code.split("\n").map((line, i) => (
              <CodeLine
                key={i}
                lineNumber={i + 1}
                content={line}
                isHighlighted={step.highlights.includes(i + 1)}
              />
            ))}
          </pre>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
