"use client";

import { useTranslations } from "next-intl";

import { SectionNav } from "@/components/section-nav";

import { ChecklistSection } from "./checklist-section";
import { ComparisonSection } from "./comparison-section";
import { SeoCta } from "./cta-section";
import { SeoHero } from "./hero-section";
import { JsonLdSection } from "./json-ld-section";
import { MetadataSection } from "./metadata-section";
import { OgImageSection } from "./og-image-section";
import { OverviewSection } from "./overview-section";
import { SitemapSection } from "./sitemap-section";
import { WebVitalsSection } from "./web-vitals-section";

export function SeoShowcase() {
  const t = useTranslations("seoPage");

  const seoSections = [
    { id: "overview", label: t("sectionNav.overview") },
    { id: "metadata", label: t("sectionNav.metadata") },
    { id: "og-image", label: t("sectionNav.ogImage") },
    { id: "json-ld", label: t("sectionNav.jsonLd") },
    { id: "sitemap", label: t("sectionNav.sitemap") },
    { id: "web-vitals", label: t("sectionNav.webVitals") },
    { id: "comparison", label: t("sectionNav.comparison") },
    { id: "checklist", label: t("sectionNav.checklist") },
  ];

  return (
    <div>
      <SeoHero />

      <SectionNav sections={seoSections} triggerId="overview" />

      <OverviewSection />
      <MetadataSection />
      <OgImageSection />
      <JsonLdSection />
      <SitemapSection />
      <WebVitalsSection />
      <ComparisonSection />
      <ChecklistSection />
      <SeoCta />
    </div>
  );
}
