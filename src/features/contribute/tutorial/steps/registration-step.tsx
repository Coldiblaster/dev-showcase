"use client";

import { LinkIcon, Plug } from "lucide-react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";

import { FaqSection } from "../faq-section";
import { useTrack } from "../track-context";
import { TutorialStep } from "../tutorial-step";

const CONTENT_TS_SNIPPET = `// src/data/content.ts
export const CONTENT_ITEMS: ContentItem[] = [
  // ... itens existentes ...
  {
    slug: "graphql-tips",
    title: "GraphQL Tips — Guia Prático",
    description: "Guia completo de GraphQL...",
    component: "GraphqlTips",
    category: "guide",
  },
];`;

const COMPONENT_MAP_SNIPPET = `// src/lib/dynamic-page-helper.tsx
const COMPONENT_MAP: Record<string, React.ComponentType<unknown>> = {
  // ... componentes existentes ...
  GraphqlTips: dynamic(() =>
    import("@/features/guides/graphql-tips").then(
      (m) => m.GraphqlTips,
    ),
  ),
};`;

const SEARCH_JSON_SNIPPET = `// messages/pt-BR/search.json → items
{
  "graphql-tips": {
    "title": "GraphQL Tips — Guia Prático",
    "description": "Guia completo de GraphQL..."
  }
}`;

const SEARCH_DATA_SNIPPET = `// src/components/global-search/search-data.ts
{
  id: "page-graphql-tips",
  titleKey: "items.graphql-tips.title",
  descriptionKey: "items.graphql-tips.description",
  url: "/dicas/graphql-tips",
  tags: ["graphql", "api", "query"],
}`;

const ICON_MAP_SNIPPET = `// src/app/dicas/page.tsx
const iconMap = {
  // ... ícones existentes ...
  "graphql-tips": Workflow,  // import de lucide-react
};`;

interface StepNavProps {
  nextStepId?: string;
  nextStepLabel?: string;
}

export function RegistrationStep({ nextStepId, nextStepLabel }: StepNavProps) {
  const t = useTranslations("tutorialPage.steps.registration");
  const { track } = useTrack();

  const faqItems = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
  ];

  const isNew = track === "new";

  const REG_KEYS = ["r1", "r2", "r3", "r4", "r5"] as const;

  return (
    <TutorialStep
      id="registration"
      step={4}
      icon={isNew ? Plug : LinkIcon}
      title={t("title")}
      description={isNew ? t("description") : t("descriptionImprove")}
      faq={<FaqSection items={faqItems} />}
      nextStepId={nextStepId}
      nextStepLabel={nextStepLabel}
    >
      {isNew ? (
        <div className="space-y-8">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm font-medium text-primary">
              {t("dynamicIntro")}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("dynamicIntroDesc")}
            </p>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-primary/30 font-mono text-xs text-primary"
              >
                1
              </Badge>
              <h3 className="text-sm font-semibold">{t("contentTs")}</h3>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">
              {t("contentTsDesc")}
            </p>
            <CodeBlock title="src/data/content.ts" code={CONTENT_TS_SNIPPET} />
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-primary/30 font-mono text-xs text-primary"
              >
                2
              </Badge>
              <h3 className="text-sm font-semibold">{t("componentMap")}</h3>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">
              {t("componentMapDesc")}
            </p>
            <CodeBlock
              title="src/lib/dynamic-page-helper.tsx"
              code={COMPONENT_MAP_SNIPPET}
            />
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-primary/30 font-mono text-xs text-primary"
              >
                3
              </Badge>
              <h3 className="text-sm font-semibold">
                {t("searchIntegration")}
              </h3>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">
              {t("searchIntegrationDesc")}
            </p>
            <div className="space-y-3">
              <CodeBlock
                title="messages/pt-BR/search.json"
                code={SEARCH_JSON_SNIPPET}
              />
              <CodeBlock
                title="src/components/global-search/search-data.ts"
                code={SEARCH_DATA_SNIPPET}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-primary/30 font-mono text-xs text-primary"
              >
                4
              </Badge>
              <h3 className="text-sm font-semibold">{t("listingPage")}</h3>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">
              {t("listingPageDesc")}
            </p>
            <CodeBlock title="src/app/dicas/page.tsx" code={ICON_MAP_SNIPPET} />
          </div>

          <div className="rounded-xl border border-border bg-card/50 p-4">
            <h3 className="mb-3 text-sm font-semibold">{t("categoryTitle")}</h3>
            <div className="space-y-2">
              {(["catGuide", "catImpl", "catTool"] as const).map((key) => (
                <div key={key} className="flex items-start gap-2 text-sm">
                  <Badge
                    variant="outline"
                    className="mt-0.5 shrink-0 border-border font-mono text-xs"
                  >
                    {t(`categories.${key}.slug`)}
                  </Badge>
                  <span className="text-muted-foreground">
                    {t(`categories.${key}.desc`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">{t("improveIntro")}</p>
          <ol className="space-y-2">
            {REG_KEYS.map((key, i) => (
              <li key={key} className="flex items-start gap-3 text-sm">
                <Badge
                  variant="outline"
                  className="mt-0.5 shrink-0 border-primary/30 font-mono text-xs text-primary"
                >
                  {i + 1}
                </Badge>
                <span className="text-muted-foreground">
                  {t(`improveChecklist.${key}`)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </TutorialStep>
  );
}
