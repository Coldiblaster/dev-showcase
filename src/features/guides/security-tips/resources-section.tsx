"use client";

import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

import type securityPage from "@/../messages/pt-BR/securityPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { ResourceLink } from "@/components/resource-link";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

type ResourceLinkItem = (typeof securityPage)["resources"]["links"][number];

const RESOURCE_URLS = [
  "https://owasp.org/www-project-top-ten/",
  "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
  "https://platform.openai.com/docs/guides/safety-best-practices",
  "https://developer.mozilla.org/en-US/docs/Web/Security",
  "https://nextjs.org/docs/app/building-your-application/configuring/security-headers",
  "https://zod.dev/",
];

/** Seção com links para documentação e referências externas. */
export function ResourcesSection() {
  const t = useTranslations("securityPage");

  return (
    <SectionWrapper>
      <AnimatedSection>
        <SectionHeader
          icon={ExternalLink}
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
    </SectionWrapper>
  );
}
