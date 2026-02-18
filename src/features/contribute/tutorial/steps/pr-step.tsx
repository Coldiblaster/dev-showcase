"use client";

import { CheckCircle2, GitPullRequest, PartyPopper } from "lucide-react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";

import { CommandBlock } from "../command-block";
import { FaqSection } from "../faq-section";
import { TutorialStep } from "../tutorial-step";

const COMMIT_KEYS = ["feat", "fix", "docs"] as const;
const PR_ITEM_KEYS = ["i1", "i2", "i3", "i4"] as const;

export function PrStep() {
  const t = useTranslations("tutorialPage.steps.pr");

  const faqItems = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
  ];

  const commitExamples = COMMIT_KEYS.map((k) => t(`commits.${k}`)).join("\n");

  return (
    <TutorialStep
      id="pr"
      step={9}
      icon={GitPullRequest}
      title={t("title")}
      description={t("description")}
      faq={<FaqSection items={faqItems} />}
    >
      <div className="space-y-6">
        <div>
          <h3 className="mb-2 text-sm font-semibold">{t("commitTitle")}</h3>
          <p className="mb-3 text-sm text-muted-foreground">
            {t("commitDesc")}
          </p>
          <CodeBlock title="conventional commits" code={commitExamples} />
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">{t("pushTitle")}</h3>
          <div className="space-y-3">
            <CommandBlock command='git add . && git commit -m "feat: my awesome feature"' />
            <CommandBlock command="git push -u origin HEAD" />
            <CommandBlock command="gh pr create --base develop" />
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">{t("prTemplate")}</h3>
          <ul className="space-y-2">
            {PR_ITEM_KEYS.map((key) => (
              <li key={key} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
                <span className="text-muted-foreground">
                  {t(`prItems.${key}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
          <PartyPopper className="mx-auto mb-3 h-8 w-8 text-primary" />
          <p className="font-medium text-foreground">{t("done")}</p>
        </div>
      </div>
    </TutorialStep>
  );
}
