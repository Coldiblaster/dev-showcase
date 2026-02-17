"use client";

import { motion, useInView } from "framer-motion";
import { ExternalLink, GitBranch, Loader2, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { PERSONAL } from "@/lib/constants";

import { ActivityFeed } from "./activity-feed";
import { LanguageChart } from "./language-chart";
import { StatCards } from "./stat-cards";
import { useGitHubStats } from "./use-github-stats";

/** Seção principal com estatísticas e atividade do GitHub. */
export function GitHubStatsSection() {
  const t = useTranslations("githubStats");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { stats, loading, error, retry } = useGitHubStats();

  return (
    <section ref={ref} className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-4 py-1.5 text-sm text-muted-foreground">
            <GitBranch className="h-4 w-4" /> {t("title")}
          </div>
          <h2 className="text-3xl font-bold md:text-4xl">{t("subtitle")}</h2>
        </motion.div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="mb-4 h-8 w-8 animate-spin" />
            <p>{t("loading")}</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="mb-4">{t("error")}</p>
            <Button variant="outline" size="sm" onClick={retry}>
              <RefreshCw className="mr-2 h-4 w-4" /> {t("retry")}
            </Button>
          </div>
        )}

        {stats && !loading && (
          <div className="space-y-8">
            <StatCards stats={stats} isInView={isInView} />

            <div className="grid gap-6 md:grid-cols-2">
              <LanguageChart stats={stats} isInView={isInView} />
              <ActivityFeed stats={stats} isInView={isInView} />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center gap-3 pt-4 text-center"
            >
              <p className="text-xs text-muted-foreground">{t("updatedAgo")}</p>
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                {t("viewProfile")} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
