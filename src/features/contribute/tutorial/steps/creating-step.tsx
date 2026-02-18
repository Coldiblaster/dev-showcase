"use client";

import { FilePlus, Search } from "lucide-react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";

import { FaqSection } from "../faq-section";
import { useTrack } from "../track-context";
import { TutorialStep } from "../tutorial-step";

const CONTRIBUA_COMPONENT = `"use client";

import { useTranslations } from "next-intl";

import { HeroSection } from "@/components/hero-section";
import { SectionWrapper } from "@/components/section-wrapper";

export function MinhaFeaturePage() {
  const t = useTranslations("minhaFeaturePage");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        title={t("hero.title")}
        description={t("hero.description")}
        showBackLink
        backHref="/contribua"
      />
      <SectionWrapper id="content">
        {/* Conteúdo aqui */}
      </SectionWrapper>
    </div>
  );
}`;

const CONTRIBUA_ROUTE = `import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { MinhaFeaturePage } from "@/features/contribute/minha-feature";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([
    getTranslations("minhaFeaturePage.meta"),
    getLocale(),
  ]);
  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/contribua/minha-feature",
    locale,
  });
}

export default function Page() {
  return <MinhaFeaturePage />;
}`;

const DYNAMIC_COMPONENT = `"use client";

import { useTranslations } from "next-intl";

import { HeroSection } from "@/components/hero-section";
import { SectionWrapper } from "@/components/section-wrapper";

export function GraphqlTips() {
  const t = useTranslations("graphqlTipsPage");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        title={t("hero.title")}
        description={t("hero.description")}
        showBackLink
        backHref="/dicas"
      />
      <SectionWrapper id="content">
        {/* Conteúdo aqui */}
      </SectionWrapper>
    </div>
  );
}`;

const LOADING_SNIPPET = `import { PageSkeleton } from "@/components/page-skeleton";

export default function Loading() {
  return <PageSkeleton />;
}`;

interface StepNavProps {
  nextStepId?: string;
  nextStepLabel?: string;
}

export function CreatingStep({ nextStepId, nextStepLabel }: StepNavProps) {
  const t = useTranslations("tutorialPage.steps.creating");
  const { track } = useTrack();

  const faqItems = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
  ];

  return (
    <TutorialStep
      id="creating"
      step={3}
      icon={track === "new" ? FilePlus : Search}
      title={track === "new" ? t("title") : t("titleImprove")}
      description={track === "new" ? t("description") : t("descriptionImprove")}
      faq={<FaqSection items={faqItems} />}
      nextStepId={nextStepId}
      nextStepLabel={nextStepLabel}
    >
      {track === "new" ? (
        <div className="space-y-8">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm font-medium text-primary">
              {t("newFeature.choiceTitle")}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("newFeature.choiceDesc")}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/10">
                A
              </Badge>
              <h3 className="text-base font-semibold">
                {t("newFeature.dynamicTitle")}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("newFeature.dynamicDesc")}
            </p>

            <div>
              <h4 className="mb-2 text-sm font-semibold">
                {t("newFeature.dynamicStep1")}
              </h4>
              <CodeBlock
                title="src/features/guides/graphql-tips/index.tsx"
                code={DYNAMIC_COMPONENT}
              />
            </div>

            <div className="flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
              <Badge
                variant="outline"
                className="mt-0.5 shrink-0 border-amber-500/30 text-amber-400"
              >
                !
              </Badge>
              <p className="text-sm text-muted-foreground">
                {t("newFeature.dynamicNote")}
              </p>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8">
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10">
                B
              </Badge>
              <h3 className="text-base font-semibold">
                {t("newFeature.standaloneTitle")}
              </h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("newFeature.standaloneDesc")}
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-semibold">
                  {t("newFeature.componentTitle")}
                </h4>
                <CodeBlock
                  title={t("newFeature.componentPath")}
                  code={CONTRIBUA_COMPONENT}
                />
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold">
                  {t("newFeature.routeTitle")}
                </h4>
                <CodeBlock
                  title={t("newFeature.routePath")}
                  code={CONTRIBUA_ROUTE}
                />
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold">
                  {t("newFeature.loadingTitle")}
                </h4>
                <CodeBlock
                  title={t("newFeature.loadingPath")}
                  code={LOADING_SNIPPET}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">{t("improve.searchTitle")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("improve.searchTip")}
          </p>
          <div className="flex flex-wrap gap-2">
            {(["pattern1", "pattern2", "pattern3", "pattern4"] as const).map(
              (key) => (
                <Badge
                  key={key}
                  variant="outline"
                  className="border-primary/20 font-mono text-xs"
                >
                  {t(`improve.${key}`)}
                </Badge>
              ),
            )}
          </div>
        </div>
      )}
    </TutorialStep>
  );
}
