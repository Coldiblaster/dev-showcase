"use client";

import { Code2, Database, Link2, RefreshCw, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import type reactQueryTipsPage from "@/../messages/pt-BR/reactQueryTipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { CTASection } from "@/components/cta-section";
import { FeatureCard } from "@/components/feature-card";
import { HeroSection } from "@/components/hero-section";
import { ResourceLink } from "@/components/resource-link";
import { SectionHeader } from "@/components/section-header";
import { TipItem } from "@/components/tip-item";
import { Separator } from "@/components/ui/separator";

import {
  INSTALL_CODE,
  LAYOUT_SETUP_CODE,
  USE_MUTATION_CODE,
  USE_QUERY_CODE,
} from "./examples/react-query-examples";

type Feature = (typeof reactQueryTipsPage)["useQuery"]["features"][number];
type Tip = (typeof reactQueryTipsPage)["bestPractices"]["tips"][number];
type ResourceLinkItem =
  (typeof reactQueryTipsPage)["resources"]["links"][number];

const RESOURCE_URLS = [
  "https://tanstack.com/query/latest",
  "https://tanstack.com/query/latest/docs/framework/react/devtools",
  "https://tanstack.com/query/latest/docs/framework/react/examples/react/simple",
];

export function ReactQueryTips() {
  const t = useTranslations("reactQueryTipsPage");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Database}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        warning={t("hero.warning")}
      />

      <section className="px-6 py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={Zap}
              title={t("setup.title")}
              subtitle={t("setup.subtitle")}
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
              {t("setup.description")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="mb-6">
              <CodeBlock title="terminal" code={INSTALL_CODE} />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <CodeBlock title="app/layout.tsx" code={LAYOUT_SETUP_CODE} />
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <section className="px-6 py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={Database}
              title={t("useQuery.title")}
              subtitle={t("useQuery.subtitle")}
            />
          </AnimatedSection>

          <div className="mb-10 grid gap-4 md:grid-cols-2">
            {(t.raw("useQuery.features") as Feature[]).map((feature, i) => (
              <AnimatedSection key={feature.title} delay={0.1 + i * 0.05}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <CodeBlock
              title="components/user-profile.tsx"
              code={USE_QUERY_CODE}
            />
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <section className="px-6 py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={RefreshCw}
              title={t("useMutation.title")}
              subtitle={t("useMutation.subtitle")}
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
              {t("useMutation.description")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <CodeBlock
              title="components/create-user-form.tsx"
              code={USE_MUTATION_CODE}
            />
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <section className="px-6 py-12 md:py-20 bg-secondary/20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={Code2}
              title={t("bestPractices.title")}
              subtitle={t("bestPractices.subtitle")}
            />
          </AnimatedSection>

          <div className="flex flex-col gap-4">
            {(t.raw("bestPractices.tips") as Tip[]).map((tip, i) => (
              <AnimatedSection key={tip.title} delay={0.1 + i * 0.05}>
                <TipItem title={tip.title} description={tip.description} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={Link2}
              title={t("resources.title")}
              subtitle={t("resources.subtitle")}
            />
          </AnimatedSection>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {(t.raw("resources.links") as ResourceLinkItem[]).map((link, i) => (
              <AnimatedSection key={link.title} delay={0.1 + i * 0.05}>
                <ResourceLink
                  href={RESOURCE_URLS[i]}
                  title={link.title}
                  description={link.description}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <CTASection
        icon={Database}
        title={t("cta.title")}
        description={t("cta.description")}
      />
    </div>
  );
}
