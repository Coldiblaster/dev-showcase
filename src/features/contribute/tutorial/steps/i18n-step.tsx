"use client";

import { Globe, Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";

import { FaqSection } from "../faq-section";
import { TutorialStep } from "../tutorial-step";

const WORKFLOW_KEYS = ["w1", "w2", "w3", "w4", "w5", "w6", "w7"] as const;

const I18N_USAGE_SNIPPET = `// Client Component
"use client";
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations("myNamespace");
  return <h1>{t("title")}</h1>;
}

// Server Component
import { getTranslations } from "next-intl/server";

export async function MyServerComponent() {
  const t = await getTranslations("myNamespace");
  return <h1>{t("title")}</h1>;
}`;

const JSON_SNIPPET = `// messages/pt-BR/myNamespace.json
{
  "title": "Meu título",
  "description": "Descrição do componente"
}

// messages/en/myNamespace.json
{
  "title": "My title",
  "description": "Component description"
}`;

interface StepNavProps {
  nextStepId?: string;
  nextStepLabel?: string;
}

export function I18nStep({ nextStepId, nextStepLabel }: StepNavProps) {
  const t = useTranslations("tutorialPage.steps.i18n");

  const faqItems = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
  ];

  return (
    <TutorialStep
      id="i18n"
      step={6}
      icon={Globe}
      title={t("title")}
      description={t("description")}
      faq={<FaqSection items={faqItems} />}
      nextStepId={nextStepId}
      nextStepLabel={nextStepLabel}
    >
      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-sm font-semibold">{t("workflowTitle")}</h3>
          <ol className="space-y-2">
            {WORKFLOW_KEYS.map((key, i) => (
              <li key={key} className="flex items-start gap-3 text-sm">
                <Badge
                  variant="outline"
                  className="mt-0.5 shrink-0 border-primary/30 font-mono text-xs text-primary"
                >
                  {i + 1}
                </Badge>
                <span className="text-muted-foreground">
                  {t(`workflow.${key}`)}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold">{t("exampleTitle")}</h3>
          <div className="space-y-3">
            <CodeBlock title="messages/*.json" code={JSON_SNIPPET} />
            <CodeBlock title="component.tsx" code={I18N_USAGE_SNIPPET} />
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium text-primary">{t("tipTitle")}</p>
            <p className="text-sm text-muted-foreground">{t("tip")}</p>
          </div>
        </div>
      </div>
    </TutorialStep>
  );
}
