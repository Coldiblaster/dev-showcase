"use client";

import { Link2 } from "lucide-react";
import { useTranslations } from "next-intl";

import type reactQueryTipsPage from "@/../messages/pt-BR/reactQueryTipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { ResourceLink } from "@/components/resource-link";
import { SectionHeader } from "@/components/section-header";

type ResourceLinkItem =
  (typeof reactQueryTipsPage)["resources"]["links"][number];

const RESOURCE_URLS = [
  "https://tanstack.com/query/latest",
  "https://tanstack.com/query/latest/docs/framework/react/devtools",
  "https://tanstack.com/query/latest/docs/framework/react/examples/react/simple",
];

export function ResourcesSection() {
  const t = useTranslations("reactQueryTipsPage");

  return (
    <section id="resources" className="px-6 py-12 md:py-20">
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
  );
}
