"use client";

import { BarChart2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";
import { useSiteStats } from "@/hooks/use-site-stats";

/** Lista as páginas mais visitadas da plataforma. */
export function TopPagesSection() {
  const t = useTranslations("statsPage");
  const { stats, loading } = useSiteStats();

  const maxViews = Math.max(...stats.topPages.map((p) => p.views), 1);

  return (
    <SectionWrapper id="top-pages" variant="alternate">
      <AnimatedSection>
        <SectionHeader
          icon={BarChart2}
          title={t("topPages.title")}
          subtitle={t("topPages.description")}
        />
      </AnimatedSection>

      {!loading && stats.topPages.length === 0 && (
        <AnimatedSection delay={0.1}>
          <p className="text-sm text-muted-foreground">{t("topPages.empty")}</p>
        </AnimatedSection>
      )}

      <div className="space-y-3">
        {stats.topPages.map((page, i) => {
          const pct = Math.round((page.views / maxViews) * 100);
          return (
            <AnimatedSection key={page.path} delay={0.1 + i * 0.04}>
              <div className="rounded-xl border border-border/60 bg-card/50 p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="shrink-0 font-mono text-xs text-primary">
                      #{i + 1}
                    </span>
                    <Link
                      href={page.path}
                      className="truncate font-mono text-sm text-foreground hover:text-primary"
                    >
                      {page.path}
                    </Link>
                    <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground/50" />
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {t("topPages.views", {
                      count: page.views.toLocaleString(),
                    })}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary/60 transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
