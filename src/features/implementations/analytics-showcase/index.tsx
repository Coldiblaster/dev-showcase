"use client";

import { useTranslations } from "next-intl";

import { LiveMetricsSection } from "@/components/live-metrics-section";
import { SectionNav } from "@/components/section-nav";

import { ChecklistSection } from "./checklist-section";
import { ClientSection } from "./client-section";
import { AnalyticsCta } from "./cta-section";
import { FlowSection } from "./flow-section";
import { AnalyticsHero } from "./hero-section";
import { OverviewSection } from "./overview-section";
import { RedisSection } from "./redis-section";
import { StatsSection } from "./stats-section";
import { TrackSection } from "./track-section";

/**
 * Showcase da implementação de analytics com Upstash Redis.
 *
 * Documenta como contabilizar page views e visitantes únicos:
 * ViewTracker, APIs de track/stats, modelo Redis, hook useSiteStats.
 */
export function AnalyticsShowcase() {
  const t = useTranslations("analyticsPage");

  const sections = [
    { id: "overview", label: t("sectionNav.overview") },
    { id: "flow", label: t("sectionNav.flow") },
    { id: "track", label: t("sectionNav.track") },
    { id: "stats-api", label: t("sectionNav.statsApi") },
    { id: "redis", label: t("sectionNav.redis") },
    { id: "client", label: t("sectionNav.client") },
    { id: "live-metrics", label: t("sectionNav.liveMetrics") },
    { id: "checklist", label: t("sectionNav.checklist") },
  ];

  return (
    <div>
      <AnalyticsHero />
      <SectionNav sections={sections} triggerId="overview" />
      <OverviewSection />
      <FlowSection />
      <TrackSection />
      <StatsSection />
      <RedisSection />
      <ClientSection />
      <LiveMetricsSection
        translationNamespace="analyticsPage.liveMetrics"
        sectionId="live-metrics"
        wrapWithSectionWrapper={false}
      />
      <ChecklistSection />
      <AnalyticsCta />
    </div>
  );
}
