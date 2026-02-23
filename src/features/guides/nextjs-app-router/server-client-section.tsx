"use client";

import { Cpu } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { CardBlur } from "@/components/ui/card-blur";
import { fillByKey as fillCodePlaceholders } from "@/lib/fill-code-placeholders";

import { CODE_EXAMPLES } from "./code-examples";

export function ServerClientSection() {
  const t = useTranslations("nextjsAppRouterPage");
  const tSection = useTranslations("nextjsAppRouterPage.serverClient");
  const clientCode = fillCodePlaceholders(CODE_EXAMPLES.serverClient.client, {
    __LIKED__: t("code.likedLabel"),
    __LIKE__: t("code.likeLabel"),
  });

  return (
    <section id="server-client" className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={Cpu}
            title={tSection("title")}
            subtitle={tSection("subtitle")}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="mb-8 max-w-2xl space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {tSection("description")}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground/90 md:text-base">
              {tSection("inPractice")}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <CardBlur radius="xl" padding="p-6" className="mb-6">
            <CodeBlock
              title={tSection("exampleServerTitle")}
              code={CODE_EXAMPLES.serverClient.server}
            />
          </CardBlur>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <CardBlur radius="xl" padding="p-6" className="mb-6">
            <CodeBlock
              title={tSection("exampleClientTitle")}
              code={clientCode}
            />
          </CardBlur>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm italic text-muted-foreground">
            {tSection("rule")}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
