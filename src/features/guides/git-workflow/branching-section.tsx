"use client";

import { motion } from "framer-motion";
import { Check, ChevronDown, GitBranch, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { CardBlur } from "@/components/ui/card-blur";

interface Strategy {
  name: string;
  description: string;
  branches: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
}

export function BranchingSection() {
  const t = useTranslations("gitWorkflow.branching");
  const strategies = t.raw("strategies") as Strategy[];

  return (
    <section
      id="branching"
      className="bg-secondary/20 px-4 py-12 md:px-6 md:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="mb-8 flex items-center gap-3 md:mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
              <GitBranch className="h-5 w-5 text-violet-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                {t("title")}
              </h2>
              <p className="font-mono text-sm text-muted-foreground">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <p className="mb-8 max-w-2xl text-sm text-muted-foreground md:text-base">
            {t("description")}
          </p>
        </AnimatedSection>

        <div className="flex flex-col gap-6">
          {strategies.map((strategy, i) => (
            <AnimatedSection key={strategy.name} delay={0.1 + i * 0.05}>
              <StrategyCard
                strategy={strategy}
                prosLabel={t("prosLabel")}
                consLabel={t("consLabel")}
                bestForLabel={t("bestForLabel")}
                branchesLabel={t("branchesLabel")}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function StrategyCard({
  strategy,
  prosLabel,
  consLabel,
  bestForLabel,
  branchesLabel,
}: {
  strategy: Strategy;
  prosLabel: string;
  consLabel: string;
  bestForLabel: string;
  branchesLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <CardBlur radius="xl" padding="p-6">
      <div className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">{strategy.name}</h3>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            className="text-muted-foreground"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </div>
        <p className="mb-3 text-sm text-muted-foreground">
          {strategy.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            {branchesLabel}:
          </span>
          {strategy.branches.map((branch) => (
            <Badge
              key={branch}
              variant="outline"
              className="font-mono text-[10px]"
            >
              {branch}
            </Badge>
          ))}
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="mt-4 grid gap-4 border-t border-border/50 pt-4 md:grid-cols-3">
          <div>
            <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-green-400">
              <Check className="h-3.5 w-3.5" />
              {prosLabel}
            </h4>
            <ul className="space-y-1">
              {strategy.pros.map((pro) => (
                <li key={pro} className="text-xs text-muted-foreground">
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-red-400">
              <X className="h-3.5 w-3.5" />
              {consLabel}
            </h4>
            <ul className="space-y-1">
              {strategy.cons.map((con) => (
                <li key={con} className="text-xs text-muted-foreground">
                  {con}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-xs font-semibold text-primary">
              {bestForLabel}
            </h4>
            <p className="text-xs text-muted-foreground">{strategy.bestFor}</p>
          </div>
        </div>
      </motion.div>
    </CardBlur>
  );
}
