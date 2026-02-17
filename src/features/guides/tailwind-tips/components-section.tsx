"use client";

import { CheckCircle2, Layers } from "lucide-react";
import { useTranslations } from "next-intl";

import type tailwindTipsPage from "@/../messages/pt-BR/tailwindTipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { CardBlur } from "@/components/ui/card-blur";

type ComponentItem = (typeof tailwindTipsPage)["components"]["items"][number];

/** Seção de componentes Tailwind com exemplos de código. */
export function ComponentsSection() {
  const t = useTranslations("tailwindTipsPage");

  return (
    <section className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={Layers}
            title={t("components.title")}
            subtitle={t("components.subtitle")}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="mb-10 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
            {t("components.description")}
          </p>
        </AnimatedSection>

        <div className="flex flex-col gap-6 md:gap-10">
          {(t.raw("components.items") as ComponentItem[]).map((item, i) => (
            <AnimatedSection key={item.name} delay={0.1 + i * 0.08}>
              <CardBlur radius="xl" padding="p-6" className="">
                <div className="mb-2 flex items-center gap-2 text-base text-foreground md:text-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  {item.name}
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <CodeBlock code={item.code} title={item.name} />
                </div>
              </CardBlur>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
