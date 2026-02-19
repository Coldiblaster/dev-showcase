"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import type privacyTipsPage from "@/../messages/pt-BR/privacyTipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { ResourceLink } from "@/components/resource-link";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

type ResourceLinkItem = (typeof privacyTipsPage)["resources"]["links"][number];

/** Seção com links para política deste site e referências externas (LGPD, GDPR). */
export function ResourcesSection() {
  const t = useTranslations("privacyTipsPage");
  const links = t.raw("resources.links") as ResourceLinkItem[];

  return (
    <SectionWrapper id="resources">
      <AnimatedSection>
        <SectionHeader
          icon={ExternalLink}
          title={t("resources.title")}
          subtitle={t("resources.subtitle")}
        />
      </AnimatedSection>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {links.map((link, i) => (
          <AnimatedSection key={link.label} delay={0.1 + i * 0.05}>
            {link.href.startsWith("/") ? (
              <Link
                href={link.href}
                className="group flex h-full flex-col gap-2 rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm outline-none transition-colors hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    {link.label}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/50 transition-colors group-hover:text-primary" />
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {link.description}
                </p>
              </Link>
            ) : (
              <ResourceLink
                href={link.href}
                title={link.label}
                description={link.description}
              />
            )}
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
