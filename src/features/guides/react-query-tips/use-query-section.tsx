"use client";

import { Database } from "lucide-react";
import { useTranslations } from "next-intl";

import type reactQueryTipsPage from "@/../messages/pt-BR/reactQueryTipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { FeatureCard } from "@/components/feature-card";
import { SectionHeader } from "@/components/section-header";

import { USE_QUERY_CODE } from "./code-examples";

type Feature = (typeof reactQueryTipsPage)["useQuery"]["features"][number];

export function UseQuerySection() {
  const t = useTranslations("reactQueryTipsPage");

  return (
    <section id="use-query" className="px-6 py-12 md:py-20">
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
  );
}
