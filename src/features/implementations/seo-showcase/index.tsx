"use client";

import { ChecklistSection } from "./checklist-section";
import { ComparisonSection } from "./comparison-section";
import { SeoCta } from "./cta-section";
import { SeoHero } from "./hero-section";
import { JsonLdSection } from "./json-ld-section";
import { MetadataSection } from "./metadata-section";
import { OgImageSection } from "./og-image-section";
import { OverviewSection } from "./overview-section";
import { SitemapSection } from "./sitemap-section";

/**
 * Showcase completo de SEO.
 *
 * Demonstração da infraestrutura de SEO implementada neste portfolio:
 * Metadata API, Open Graph, JSON-LD, Sitemap, Robots e PWA.
 * Inclui comparação Next.js vs React + Vite para cada técnica.
 */
export function SeoShowcase() {
  return (
    <div>
      <SeoHero />
      <OverviewSection />
      <MetadataSection />
      <OgImageSection />
      <JsonLdSection />
      <SitemapSection />
      <ComparisonSection />
      <ChecklistSection />
      <SeoCta />
    </div>
  );
}
