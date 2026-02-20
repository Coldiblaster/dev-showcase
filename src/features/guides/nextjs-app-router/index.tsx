"use client";

import { ExternalLink, Route } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";
import { Button } from "@/components/ui/button";

import { DataFetchingSection } from "./data-fetching-section";
import { LayoutStructureSection } from "./layout-structure-section";
import { LoadingErrorSection } from "./loading-error-section";
import { RoutingSection } from "./routing-section";
import { ServerClientSection } from "./server-client-section";

const NEXTJS_APP_ROUTER_DOCS_URL = "https://nextjs.org/docs/app";

export function NextjsAppRouter() {
  const t = useTranslations("nextjsAppRouterPage");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Route}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/dicas"
        ctaSlot={
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" className="gap-2" asChild>
              <a
                href={NEXTJS_APP_ROUTER_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("hero.ctaDocs")}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        }
      />

      <SectionNav
        sections={[
          { id: "routing", label: t("sectionNav.routing") },
          { id: "structure", label: t("sectionNav.structure") },
          { id: "server-client", label: t("sectionNav.serverClient") },
          { id: "data-fetching", label: t("sectionNav.dataFetching") },
          { id: "loading-error", label: t("sectionNav.loadingError") },
        ]}
      />

      <RoutingSection />
      <SectionDivider />
      <LayoutStructureSection />
      <SectionDivider />
      <ServerClientSection />
      <SectionDivider />
      <DataFetchingSection />
      <SectionDivider />
      <LoadingErrorSection />
      <SectionDivider />

      <CTASection
        icon={Route}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
        buttonHref="/dicas"
      />
    </div>
  );
}
