"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, Globe, Sparkles, Wrench, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { SectionWrapper } from "@/components/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { fadeUp, stagger } from "@/lib/animation-variants";

const CARDS = [
  { key: "guides", icon: BookOpen },
  { key: "tools", icon: Wrench },
  { key: "improve", icon: Zap },
  { key: "translations", icon: Globe },
  { key: "docs", icon: FileText },
] as const;

/** Cards com tipos de contribuição possíveis no projeto. */
export function WhatYouCanDoSection() {
  const t = useTranslations("contributePage.whatYouCanDo");

  return (
    <SectionWrapper id="what-you-can-do" variant="alternate">
      <AnimatedSection>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-4 gap-1.5 border-primary/30 px-3 py-1 text-primary"
          >
            <Sparkles className="h-3 w-3" />
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
        className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {CARDS.map(({ key, icon: Icon }) => (
          <motion.div key={key} variants={fadeUp}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30">
              <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">
                  {t(`cards.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`cards.${key}.description`)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
