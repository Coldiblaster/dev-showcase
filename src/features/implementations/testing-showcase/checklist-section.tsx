"use client";

import { CheckSquare } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";

export function ChecklistSection() {
  const t = useTranslations("testingPage.checklist");
  const items = t.raw("items") as string[];

  return (
    <section
      id="checklist"
      className="px-4 py-12 md:px-6 md:py-20"
      role="region"
      aria-labelledby="checklist-heading"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div id="checklist-heading">
            <SectionHeader
              icon={CheckSquare}
              title={t("title")}
              subtitle={t("subtitle")}
            />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.05}>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {t("description")}
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <ol className="list-inside list-decimal space-y-3 text-sm text-muted-foreground md:text-base">
            {items.map((item, i) => (
              <li key={i} className="pl-2">
                {item}
              </li>
            ))}
          </ol>
        </AnimatedSection>
      </div>
    </section>
  );
}
