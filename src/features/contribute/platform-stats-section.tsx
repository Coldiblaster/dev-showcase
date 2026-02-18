"use client";

import { motion } from "framer-motion";
import { BarChart3, Eye, RefreshCw, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { SectionWrapper } from "@/components/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSiteStats } from "@/hooks/use-site-stats";
import { fadeUp, stagger } from "@/lib/animation-variants";

/** Seção com stats ao vivo da plataforma (visitantes, page views, top pages). */
export function PlatformStatsSection() {
  const t = useTranslations("contributePage.platformStats");
  const tp = useTranslations("contributePage.platformStats.pageNames");
  const { stats, loading, error, retry } = useSiteStats();

  const hasData = stats.visitors > 0 || stats.views > 0;

  return (
    <SectionWrapper id="platform-stats">
      <AnimatedSection>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-4 gap-1.5 border-primary/30 px-3 py-1 text-primary"
          >
            <BarChart3 className="h-3 w-3" aria-hidden="true" />
            {t("badge")}
          </Badge>
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
      </AnimatedSection>

      {loading && (
        <div className="py-12 text-center" role="status" aria-live="polite">
          <div
            className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground">{t("loading")}</p>
        </div>
      )}

      {error && (
        <div className="py-12 text-center">
          <p className="mb-3 text-sm text-muted-foreground">{t("error")}</p>
          <Button variant="outline" size="sm" onClick={retry} className="gap-2">
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            {t("retry")}
          </Button>
        </div>
      )}

      {!loading && !error && !hasData && (
        <AnimatedSection>
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-primary/30 p-8 text-center">
            <BarChart3
              className="mx-auto mb-4 h-10 w-10 text-primary/40"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground">{t("noData")}</p>
          </div>
        </AnimatedSection>
      )}

      {!loading && !error && hasData && (
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl space-y-8"
        >
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 gap-4 md:gap-6"
          >
            <div
              className="rounded-2xl border border-border bg-card/50 p-6 text-center"
              aria-label={`${stats.visitors.toLocaleString()} ${t("visitors")}`}
            >
              <Users
                className="mx-auto mb-2 h-6 w-6 text-primary"
                aria-hidden="true"
              />
              <p className="text-3xl font-bold tabular-nums md:text-4xl">
                {stats.visitors.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("visitors")}
              </p>
            </div>
            <div
              className="rounded-2xl border border-border bg-card/50 p-6 text-center"
              aria-label={`${stats.views.toLocaleString()} ${t("pageViews")}`}
            >
              <Eye
                className="mx-auto mb-2 h-6 w-6 text-primary"
                aria-hidden="true"
              />
              <p className="text-3xl font-bold tabular-nums md:text-4xl">
                {stats.views.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("pageViews")}
              </p>
            </div>
          </motion.div>

          {stats.topPages.length > 0 && (
            <motion.div variants={fadeUp}>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
                {t("topPages")}
              </h3>
              <div className="space-y-2" role="list">
                {stats.topPages.map((page, i) => (
                  <Link
                    key={page.path}
                    href={page.path}
                    role="listitem"
                    className="flex items-center justify-between rounded-xl border border-border bg-card/30 px-4 py-3 transition-colors hover:border-primary/30 hover:bg-card/60"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium">
                        {tp.has(page.path as never)
                          ? tp(page.path as never)
                          : page.path}
                      </span>
                    </span>
                    <span className="text-sm tabular-nums text-muted-foreground">
                      {t("viewCount", { count: page.views.toLocaleString() })}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </SectionWrapper>
  );
}
