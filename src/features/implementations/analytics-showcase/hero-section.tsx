"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Eye, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { useSiteStats } from "@/hooks/use-site-stats";
import { fadeUp, stagger } from "@/lib/animation-variants";

export function AnalyticsHero() {
  const t = useTranslations("analyticsPage");
  const tMetrics = useTranslations("analyticsPage.liveMetrics");
  const locale = useLocale();
  const { ref, isInView } = useSectionInView();
  const { stats, loading } = useSiteStats();
  const hasStats = !loading && (stats.visitors > 0 || stats.views > 0);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70vh] items-center overflow-hidden pb-10 md:pb-16"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="max-w-3xl"
        >
          <HeroSection
            badge={t("hero.badge")}
            badgeIcon={BarChart3}
            title={t("hero.title")}
            description={t("hero.description")}
            backHref="/implementacoes"
            badgeSlot={
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
                <span className="mb-6 inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 text-primary">
                  <BarChart3 className="mr-1.5 h-3 w-3" aria-hidden="true" />
                  {t("hero.badge")}
                </span>
              </motion.div>
            }
            titleSlot={
              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="mb-4 text-balance font-sans text-4xl font-bold tracking-tight text-foreground md:text-6xl"
              >
                {t("hero.title")}
              </motion.h1>
            }
            descriptionSlot={
              <>
                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="mb-4 text-base font-medium text-primary md:text-lg"
                >
                  {t("hero.subtitle")}
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="mb-4 max-w-2xl text-sm text-pretty leading-relaxed text-muted-foreground md:text-base"
                >
                  {t("hero.description")}
                </motion.p>
                {hasStats && (
                  <motion.div
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    role="region"
                    aria-label={tMetrics("badge")}
                    className="mb-8 flex flex-wrap items-center gap-4 gap-y-2 text-sm text-muted-foreground"
                  >
                    <span className="flex items-center gap-1.5">
                      <Users
                        className="h-4 w-4 text-primary"
                        aria-hidden="true"
                      />
                      <span className="font-medium tabular-nums text-foreground">
                        {stats.visitors.toLocaleString(locale)}
                      </span>
                      {tMetrics("visitors")}
                    </span>
                    <span className="text-border" aria-hidden="true">
                      ·
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Eye
                        className="h-4 w-4 text-primary"
                        aria-hidden="true"
                      />
                      <span className="font-medium tabular-nums text-foreground">
                        {stats.views.toLocaleString(locale)}
                      </span>
                      {tMetrics("pageViews")}
                    </span>
                  </motion.div>
                )}
                {!hasStats && loading && (
                  <motion.div
                    variants={fadeUp}
                    className="mb-8 h-5 w-24 animate-pulse rounded bg-muted"
                    aria-hidden="true"
                  />
                )}
                {!hasStats && !loading && <div className="mb-8" />}
              </>
            }
            ctaSlot={
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap gap-3"
              >
                <Button asChild className="gap-2">
                  <a
                    href="#live-metrics"
                    aria-label={t("hero.ctaMetricsAriaLabel")}
                  >
                    {t("hero.ctaMetrics")}{" "}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button variant="outline" className="gap-2" asChild>
                  <a
                    href="https://upstash.com/docs/redis/overall/getstarted"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("hero.ctaDocsAriaLabel")}
                  >
                    {t("hero.ctaDocs")}
                  </a>
                </Button>
              </motion.div>
            }
          />
        </motion.div>
      </div>
    </section>
  );
}
