"use client";

import { motion } from "framer-motion";
import { GitFork, Star, Users } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";

import type { GitHubStats } from "./types";

interface StatCardsProps {
  stats: GitHubStats;
  isInView: boolean;
}

/** Cards de estatísticas do GitHub (repos, estrelas, seguidores). */
export function StatCards({ stats, isInView }: StatCardsProps) {
  const t = useTranslations("githubStats");

  const statCards = [
    { label: t("repos"), value: stats.publicRepos, icon: GitFork },
    { label: t("stars"), value: stats.totalStars, icon: Star },
    { label: t("followers"), value: stats.followers, icon: Users },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 md:gap-6">
      {statCards.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="border-border/40 bg-muted/20 text-center">
            <CardContent className="p-4 md:p-6">
              <stat.icon className="mx-auto mb-2 h-5 w-5 text-primary" />
              <div className="text-2xl font-bold md:text-3xl">{stat.value}</div>
              <p className="text-xs text-muted-foreground md:text-sm">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
