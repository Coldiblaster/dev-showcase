"use client";

import { motion } from "framer-motion";
import { GitCommit } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";

import type { GitHubStats } from "./types";

interface ActivityFeedProps {
  stats: GitHubStats;
  isInView: boolean;
}

/** Feed de atividade recente do GitHub (commits). */
export function ActivityFeed({ stats, isInView }: ActivityFeedProps) {
  const t = useTranslations("githubStats");

  function formatDate(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return t("now");
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.4 }}
    >
      <Card className="border-border/40 bg-muted/20">
        <CardContent className="p-5 md:p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("recentActivity")}
          </h3>
          {stats.recentActivity.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("noActivity")}</p>
          ) : (
            <div className="space-y-4">
              {stats.recentActivity.map((event, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-primary/10 p-1.5">
                    <GitCommit className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{event.repo}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {event.message}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatDate(event.date)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
