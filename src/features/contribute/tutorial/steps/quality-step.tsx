"use client";

import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { CommandBlock } from "../command-block";
import { FaqSection } from "../faq-section";
import { TutorialStep } from "../tutorial-step";

interface StepNavProps {
  nextStepId?: string;
  nextStepLabel?: string;
}

export function QualityStep({ nextStepId, nextStepLabel }: StepNavProps) {
  const t = useTranslations("tutorialPage.steps.quality");

  const faqItems = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
  ];

  return (
    <TutorialStep
      id="quality"
      step={8}
      icon={ShieldCheck}
      title={t("title")}
      description={t("description")}
      faq={<FaqSection items={faqItems} />}
      nextStepId={nextStepId}
      nextStepLabel={nextStepLabel}
    >
      <div className="space-y-5">
        <h3 className="text-sm font-semibold">{t("commandsTitle")}</h3>

        <div className="space-y-3">
          <div>
            <p className="mb-2 text-xs text-muted-foreground">{t("lint")}</p>
            <CommandBlock
              command="pnpm lint"
              output="✓ No ESLint warnings or errors"
            />
          </div>
          <div>
            <p className="mb-2 text-xs text-muted-foreground">{t("test")}</p>
            <CommandBlock command="pnpm test" output="✓ All tests passed" />
          </div>
          <div>
            <p className="mb-2 text-xs text-muted-foreground">{t("build")}</p>
            <CommandBlock
              command="pnpm build"
              output="✓ Compiled successfully\n✓ Generating static pages\n✓ Finalizing page optimization"
            />
          </div>
        </div>

        <p className="text-center text-sm font-medium text-primary">
          {t("allGreen")}
        </p>
      </div>
    </TutorialStep>
  );
}
