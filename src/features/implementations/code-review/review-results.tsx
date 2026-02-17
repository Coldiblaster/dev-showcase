"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { ScoreGauge } from "@/components/score-gauge";
import { Badge } from "@/components/ui/badge";

import { SEVERITY_CONFIG } from "./constants";
import type { ReviewResult } from "./types";

/** Card exibindo um problema individual da revisão. */
function IssueCard({
  issue,
  index,
  t,
}: {
  issue: ReviewResult["issues"][number];
  index: number;
  t: ReturnType<typeof useTranslations<"codeReviewPage">>;
}) {
  const config = SEVERITY_CONFIG[issue.severity];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`rounded-lg border ${config.border} ${config.bg} p-4`}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Icon className={`h-4 w-4 shrink-0 ${config.color}`} />
        <Badge
          variant="outline"
          className={`${config.color} border-current text-[10px] uppercase tracking-wider`}
        >
          {t(`result.severity.${issue.severity}`)}
        </Badge>
        {issue.line && (
          <span className="rounded bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            {t("result.line", { line: issue.line })}
          </span>
        )}
      </div>
      <p className="mb-1.5 text-sm font-medium leading-relaxed">
        {issue.message}
      </p>
      {issue.suggestion && (
        <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
          <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60" />
          <span>{issue.suggestion}</span>
        </p>
      )}
    </motion.div>
  );
}

/** Card de lista (forças ou melhorias). */
function ListCard({
  items,
  icon: Icon,
  iconColor,
  title,
}: {
  items: string[];
  icon: React.ElementType;
  iconColor: string;
  title: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-xl border border-border/40 bg-card p-5">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-lg ${iconColor.replace("text-", "bg-").replace("400", "500/15")}`}
        >
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
        {title}
      </h3>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
          >
            <Icon
              className={`mt-0.5 h-4 w-4 shrink-0 ${iconColor} opacity-70`}
            />
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/** Exibe os resultados da revisão: pontuação, resumo, problemas e melhorias. */
export function ReviewResults({ result }: { result: ReviewResult | null }) {
  const t = useTranslations("codeReviewPage");

  return (
    <AnimatePresence>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-10 space-y-6"
        >
          <div className="relative overflow-hidden rounded-xl border border-border/40 bg-card">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent" />
            <div className="relative flex flex-col items-center gap-6 p-6 sm:p-8 md:flex-row md:items-center">
              <div className="shrink-0">
                <ScoreGauge score={result.score} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold">{t("result.score")}</h3>
                </div>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  {result.summary}
                </p>
              </div>
            </div>
          </div>

          {result.issues.length > 0 && (
            <div className="rounded-xl border border-border/40 bg-card p-5">
              <h3 className="mb-4 flex items-center gap-2 text-base font-semibold">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-500/15">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                </div>
                {t("result.issues")}
                <Badge
                  variant="secondary"
                  className="ml-1 text-xs tabular-nums"
                >
                  {result.issues.length}
                </Badge>
              </h3>
              <div className="space-y-3">
                {result.issues.map((issue, i) => (
                  <IssueCard key={i} issue={issue} index={i} t={t} />
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <ListCard
              items={result.strengths}
              icon={CheckCircle2}
              iconColor="text-green-400"
              title={t("result.strengths")}
            />
            <ListCard
              items={result.improvements}
              icon={Lightbulb}
              iconColor="text-yellow-400"
              title={t("result.improvements")}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
