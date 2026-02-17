"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";

import { LANG_COLORS } from "./constants";
import type { GitHubStats } from "./types";

interface LanguageChartProps {
  stats: GitHubStats;
  isInView: boolean;
}

/** Gráfico de barras com porcentagem de uso por linguagem. */
export function LanguageChart({ stats, isInView }: LanguageChartProps) {
  const t = useTranslations("githubStats");

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3 }}
    >
      <Card className="border-border/40 bg-muted/20">
        <CardContent className="p-5 md:p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("topLangs")}
          </h3>
          <div className="space-y-3">
            {stats.topLanguages.map((lang) => (
              <div key={lang.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: LANG_COLORS[lang.name] || "#6b7280",
                      }}
                    />
                    {lang.name}
                  </span>
                  <span className="text-muted-foreground">
                    {lang.percentage}%
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted/50">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: LANG_COLORS[lang.name] || "#6b7280",
                    }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${lang.percentage}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
