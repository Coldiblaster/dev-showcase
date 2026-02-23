"use client";

import { Eye, RefreshCw, Users } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { useSiteStats } from "@/hooks/use-site-stats";

/** Cards de visão geral: page views e visitantes únicos. */
export function OverviewSection() {
  const t = useTranslations("statsPage");
  const { stats, loading, error, retry } = useSiteStats();

  const cards = [
    {
      icon: Eye,
      label: t("overview.views"),
      desc: t("overview.viewsDesc"),
      value: stats.views.toLocaleString(),
    },
    {
      icon: Users,
      label: t("overview.visitors"),
      desc: t("overview.visitorsDesc"),
      value: stats.visitors.toLocaleString(),
    },
  ];

  return (
    <SectionWrapper id="overview" variant="default">
      <AnimatedSection>
        <SectionHeader icon={Eye} title={t("overview.title")} />
      </AnimatedSection>

      {loading && (
        <AnimatedSection delay={0.1}>
          <p className="text-sm text-muted-foreground">
            {t("overview.loading")}
          </p>
        </AnimatedSection>
      )}

      {error && !loading && (
        <AnimatedSection delay={0.1}>
          <div className="flex items-center gap-3">
            <p className="text-sm text-destructive">{t("overview.error")}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={retry}
              className="gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              {t("overview.retry")}
            </Button>
          </div>
        </AnimatedSection>
      )}

      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map(({ icon: Icon, label, desc, value }, i) => (
            <AnimatedSection key={label} delay={0.1 + i * 0.06}>
              <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <p className="font-mono text-3xl font-bold text-foreground">
                  {value}
                </p>
                <p className="mt-1 font-medium text-foreground">{label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
