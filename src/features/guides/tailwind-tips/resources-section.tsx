"use client";

import { Link2 } from "lucide-react";
import { useTranslations } from "next-intl";

import type tailwindTipsPage from "@/../messages/pt-BR/tailwindTipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { ResourceLink } from "@/components/resource-link";
import { SectionHeader } from "@/components/section-header";

type ResourceItem = (typeof tailwindTipsPage)["resources"]["items"][number];

/** Seção de recursos e links úteis para Tailwind. */
export function ResourcesSection() {
  const t = useTranslations("tailwindTipsPage");

  return (
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
          {(t.raw("resources.items") as ResourceItem[]).map((item, i) => (
            <AnimatedSection key={item.name} delay={0.1 + i * 0.05}>
              <ResourceLink
                href={item.url}
                title={item.name}
                description={item.description}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
