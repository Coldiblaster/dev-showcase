"use client";

import { Activity } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { BackLink } from "@/components/back-link";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";
import { Badge } from "@/components/ui/badge";

import { OverviewSection } from "./overview-section";
import { ReactionsSection } from "./reactions-section";
import { SearchesSection } from "./searches-section";
import { TopPagesSection } from "./top-pages-section";

/** Página pública de métricas da plataforma em tempo real. */
export function StatsPage() {
  const t = useTranslations("statsPage");
  const tGlobal = useTranslations("global");

  const sections = [
    { id: "overview", label: t("sectionNav.overview") },
    { id: "top-pages", label: t("sectionNav.topPages") },
    { id: "searches", label: t("sectionNav.searches") },
    { id: "reactions", label: t("sectionNav.reactions") },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
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
              <Activity className="h-3 w-3" />
              {t("hero.badge")}
            </Badge>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              {t("hero.title")}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mx-auto mb-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              {t("hero.description")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <p className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              {t("poweredBy")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <SectionNav sections={sections} triggerId="overview" />

      <OverviewSection />
      <SectionDivider />
      <TopPagesSection />
      <SectionDivider />
      <SearchesSection />
      <SectionDivider />
      <ReactionsSection />
    </div>
  );
}
