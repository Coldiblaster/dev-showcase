"use client";

import { CheckCircle2, Code2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

import { FaqSection } from "../faq-section";
import { TutorialStep } from "../tutorial-step";

const PATTERN_KEYS = ["p1", "p2", "p3", "p4", "p5", "p6"] as const;

interface StepNavProps {
  nextStepId?: string;
  nextStepLabel?: string;
}

export function DevelopingStep({ nextStepId, nextStepLabel }: StepNavProps) {
  const t = useTranslations("tutorialPage.steps.developing");

  const faqItems = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
  ];

  return (
    <TutorialStep
      id="developing"
      step={5}
      icon={Code2}
      title={t("title")}
      description={t("description")}
      faq={<FaqSection items={faqItems} />}
      nextStepId={nextStepId}
      nextStepLabel={nextStepLabel}
    >
      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-sm font-semibold">{t("patternsTitle")}</h3>
          <ul className="space-y-2">
            {PATTERN_KEYS.map((key) => (
              <li key={key} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
                <span className="text-muted-foreground">
                  {t(`patterns.${key}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border/50 bg-card/30 p-5">
          <h3 className="mb-2 text-sm font-semibold">{t("componentsTitle")}</h3>
          <p className="mb-3 text-sm text-muted-foreground">
            {t("componentsDesc")}
          </p>
          <Link href="/contribua/design-system">
            <Button variant="outline" size="sm" className="gap-2">
              <Code2 className="h-3.5 w-3.5" />
              Design System
            </Button>
          </Link>
        </div>
      </div>
    </TutorialStep>
  );
}
