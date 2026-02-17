"use client";

import { ViewSource } from "@/components/view-source";

import { ChecklistSection } from "./checklist-section";
import { ComparisonSection } from "./comparison-section";
import { SeoCta } from "./cta-section";
import { SeoHero } from "./hero-section";
import { JsonLdSection } from "./json-ld-section";
import { MetadataSection } from "./metadata-section";
import { OgImageSection } from "./og-image-section";
import { OverviewSection } from "./overview-section";
import { SitemapSection } from "./sitemap-section";
import {
  HERO_SECTION_SOURCE,
  JSON_LD_SECTION_SOURCE,
  METADATA_SECTION_SOURCE,
} from "./source-snippets";
import { WebVitalsSection } from "./web-vitals-section";

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
      <ViewSource
        code={HERO_SECTION_SOURCE}
        filePath="src/features/implementations/seo-showcase/hero-section.tsx"
      >
        <SeoHero />
      </ViewSource>
      <OverviewSection />
      <ViewSource
        code={METADATA_SECTION_SOURCE}
        filePath="src/features/implementations/seo-showcase/metadata-section.tsx"
      >
        <MetadataSection />
      </ViewSource>
      <OgImageSection />
      <ViewSource
        code={JSON_LD_SECTION_SOURCE}
        filePath="src/features/implementations/seo-showcase/json-ld-section.tsx"
      >
        <JsonLdSection />
      </ViewSource>
      <SitemapSection />
      <WebVitalsSection />
      <ComparisonSection />
      <ChecklistSection />
      <SeoCta />
    </div>
  );
}
