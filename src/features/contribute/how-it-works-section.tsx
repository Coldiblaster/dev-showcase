"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  GitFork,
  GitPullRequest,
  ListChecks,
  Merge,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { SectionWrapper } from "@/components/section-wrapper";
import { StepCard } from "@/components/step-card";
import { Badge } from "@/components/ui/badge";
import { fadeUp, stagger } from "@/lib/animation-variants";

const STEPS = [
  { key: "fork", icon: GitFork },
  { key: "branch", icon: GitPullRequest },
  { key: "develop", icon: Code2 },
  { key: "pr", icon: ListChecks },
  { key: "review", icon: Merge },
] as const;

/** Passo a passo do fluxo de contribuição com Git Flow visual. */
export function HowItWorksSection() {
  const t = useTranslations("contributePage.howItWorks");

  return (
    <SectionWrapper id="how-it-works">
      <AnimatedSection>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-4 gap-1.5 border-primary/30 px-3 py-1 text-primary"
          >
            <ListChecks className="h-3 w-3" />
            {t("badge")}
          </Badge>
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
      </AnimatedSection>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5"
      >
        {STEPS.map(({ key, icon }, i) => (
          <motion.div key={key} variants={fadeUp}>
            <StepCard
              icon={icon}
              title={t(`steps.${key}.title`)}
              description={t(`steps.${key}.description`)}
              step={i + 1}
            />
          </motion.div>
        ))}
      </motion.div>

      <AnimatedSection delay={0.3}>
        <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 rounded-xl border border-border/40 bg-card/30 px-6 py-4">
          <code className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-muted-foreground sm:text-sm">
            <span className="text-primary">feature</span>
            <ArrowRight className="h-3 w-3" />
            <span className="text-primary">develop</span>
            <ArrowRight className="h-3 w-3" />
            <span className="text-primary">main</span>
            <ArrowRight className="h-3 w-3" />
            <span className="text-primary">deploy</span>
          </code>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
