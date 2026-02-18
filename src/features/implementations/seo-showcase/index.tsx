"use client";

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

const SEO_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "metadata", label: "Metadata" },
  { id: "og-image", label: "OG Image" },
  { id: "json-ld", label: "JSON-LD" },
  { id: "sitemap", label: "Sitemap" },
  { id: "web-vitals", label: "Web Vitals" },
  { id: "comparison", label: "Next vs Vite" },
  { id: "checklist", label: "Checklist" },
];

/**
 * Showcase completo de SEO.
 *
 * Demonstração da infraestrutura de SEO implementada neste portfolio:
 * Metadata API, Open Graph, JSON-LD, Sitemap, Robots, PWA e Core Web Vitals.
 * Inclui comparação Next.js vs React + Vite para cada técnica.
 */
export function SeoShowcase() {
  return (
    <div>
      <SeoHero />

      <SectionNav sections={SEO_SECTIONS} triggerId="overview" />

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
