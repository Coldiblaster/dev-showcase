"use client";

import { Gauge } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { BackLink } from "@/components/back-link";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";
import { Badge } from "@/components/ui/badge";

import { LighthouseSection } from "./lighthouse-section";
import { WebVitalsSection } from "./web-vitals-section";

/** Página pública de Core Web Vitals e Lighthouse. */
export function PerformancePage() {
  const t = useTranslations("performancePage");
  const tGlobal = useTranslations("global");

  const sections = [
    { id: "web-vitals", label: t("sectionNav.webVitals") },
    { id: "lighthouse", label: t("sectionNav.lighthouse") },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-4 pb-16 pt-24 md:px-6 md:pb-24 md:pt-32">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <AnimatedSection>
            <BackLink href="/" label={tGlobal("pageHero.back")} />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <Badge
              variant="outline"
              className="mb-6 gap-1.5 border-primary/30 px-3 py-1 text-primary"
            >
              <Gauge className="h-3 w-3" />
              {t("hero.badge")}
            </Badge>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              {t("hero.title")}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mx-auto max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              {t("hero.description")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <SectionNav sections={sections} triggerId="web-vitals" />

      <WebVitalsSection />
      <SectionDivider />
      <LighthouseSection />
    </div>
  );
}
