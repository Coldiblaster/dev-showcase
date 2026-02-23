"use client";

import { Route } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { CardBlur } from "@/components/ui/card-blur";
import { fillByKey as fillCodePlaceholders } from "@/lib/fill-code-placeholders";

import { CODE_EXAMPLES } from "./code-examples";

export function RoutingSection() {
  const t = useTranslations("nextjsAppRouterPage");
  const tRouting = useTranslations("nextjsAppRouterPage.routing");
  const layoutCode = fillCodePlaceholders(CODE_EXAMPLES.routing.layout, {
    __SIDEBAR__: t("code.sidebarLabel"),
  });

  return (
    <section id="routing" className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={Route}
            title={tRouting("title")}
            subtitle={tRouting("subtitle")}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="mb-8 max-w-2xl space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {tRouting("description")}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground/90 md:text-base">
              {tRouting("inPractice")}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <CardBlur radius="xl" padding="p-6" className="mb-6">
            <CodeBlock
              title={tRouting("exampleLayoutTitle")}
              code={layoutCode}
            />
          </CardBlur>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <CardBlur radius="xl" padding="p-6" className="mb-6">
            <CodeBlock
              title={tRouting("examplePageTitle")}
              code={CODE_EXAMPLES.routing.page}
            />
          </CardBlur>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm italic text-muted-foreground">
            {tRouting("tip")}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
