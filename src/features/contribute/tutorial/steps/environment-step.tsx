"use client";

import { Download } from "lucide-react";
import { useTranslations } from "next-intl";

import { CommandBlock } from "../command-block";
import { FaqSection } from "../faq-section";
import { useTrack } from "../track-context";
import { TutorialStep } from "../tutorial-step";

interface StepNavProps {
  nextStepId?: string;
  nextStepLabel?: string;
}

export function EnvironmentStep({ nextStepId, nextStepLabel }: StepNavProps) {
  const t = useTranslations("tutorialPage.steps.environment");
  const { track } = useTrack();

  const branchName = track === "new" ? t("branchNew") : t("branchImprove");

  const faqItems = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
  ];

  return (
    <TutorialStep
      id="environment"
      step={1}
      icon={Download}
      title={t("title")}
      description={t("description")}
      faq={<FaqSection items={faqItems} />}
      nextStepId={nextStepId}
      nextStepLabel={nextStepLabel}
    >
      <div className="space-y-5">
        <div>
          <p className="mb-3 text-sm text-muted-foreground">{t("forkIntro")}</p>
          <div className="space-y-3">
            <CommandBlock command="git clone https://github.com/SEU-USER/dev-showcase.git" />
            <CommandBlock command="cd dev-showcase" />
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm text-muted-foreground">{t("install")}</p>
          <div className="space-y-3">
            <CommandBlock command="pnpm install" />
            <CommandBlock
              command="pnpm dev"
              output="▲ Next.js 15.x\n- Local: http://localhost:3000"
            />
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm text-muted-foreground">{t("branch")}</p>
          <CommandBlock
            command={`git checkout develop && git checkout -b ${branchName}`}
          />
        </div>
      </div>
    </TutorialStep>
  );
}
