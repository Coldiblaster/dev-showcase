"use client";

import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { CardBlur } from "@/components/ui/card-blur";

import { API_ROUTE_SKELETON_CODE } from "./code-examples";

export function ApiSection() {
  const t = useTranslations("contactFormPage.api");

  return (
    <section
      id="api"
      className="px-4 py-12 md:px-6 md:py-20"
      role="region"
      aria-labelledby="contact-api-heading"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div id="contact-api-heading">
            <SectionHeader
              icon={Mail}
              title={t("title")}
              subtitle={t("subtitle")}
            />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.05}>
          <div className="max-w-2xl space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("description")}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground/90 md:text-base">
              {t("tip")}
            </p>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <CardBlur padding="p-6" className="mt-6">
            <CodeBlock title={t("codeTitle")} code={API_ROUTE_SKELETON_CODE} />
          </CardBlur>
        </AnimatedSection>
      </div>
    </section>
  );
}
