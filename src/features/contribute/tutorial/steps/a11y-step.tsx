"use client";

import { Accessibility, CheckSquare, Square } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";

import { FaqSection } from "../faq-section";
import { TutorialStep } from "../tutorial-step";

const CHECKLIST_KEYS = [
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
] as const;

interface StepNavProps {
  nextStepId?: string;
  nextStepLabel?: string;
}

export function A11yStep({ nextStepId, nextStepLabel }: StepNavProps) {
  const t = useTranslations("tutorialPage.steps.a11y");
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = useCallback((key: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const faqItems = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
  ];

  return (
    <TutorialStep
      id="a11y"
      step={7}
      icon={Accessibility}
      title={t("title")}
      description={t("description")}
      faq={<FaqSection items={faqItems} />}
      nextStepId={nextStepId}
      nextStepLabel={nextStepLabel}
    >
      <div>
        <h3 className="mb-3 text-sm font-semibold">{t("checklistTitle")}</h3>
        <div className="space-y-1">
          {CHECKLIST_KEYS.map((key) => {
            const isChecked = checked.has(key);
            return (
              <button
                key={key}
                onClick={() => toggle(key)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-primary/5",
                  isChecked && "text-primary",
                )}
                role="checkbox"
                aria-checked={isChecked}
              >
                {isChecked ? (
                  <CheckSquare className="h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <Square className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                )}
                <span
                  className={cn(
                    "text-muted-foreground",
                    isChecked && "text-foreground line-through",
                  )}
                >
                  {t(`checklist.${key}`)}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-center font-mono text-xs text-muted-foreground/60">
          {checked.size}/{CHECKLIST_KEYS.length}
        </p>
      </div>
    </TutorialStep>
  );
}
