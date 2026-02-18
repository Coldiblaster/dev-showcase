"use client";

import { motion, useInView } from "framer-motion";
import {
  Accessibility,
  GitCommitHorizontal,
  Layers,
  Rocket,
  Wrench,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { SectionWrapper } from "@/components/section-wrapper";
import { Badge } from "@/components/ui/badge";

const TIMELINE = [
  { key: "day1" as const, icon: GitCommitHorizontal },
  { key: "day2" as const, icon: Layers },
  { key: "day3" as const, icon: Wrench },
  { key: "day4" as const, icon: Accessibility },
  { key: "day5" as const, icon: Rocket },
];

function TimelineItem({
  dateText,
  titleText,
  descriptionText,
  icon: Icon,
  index,
  total,
}: {
  dateText: string;
  titleText: string;
  descriptionText: string;
  icon: React.ElementType;
  index: number;
  total: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-4 pb-8 last:pb-0"
    >
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        {index < total - 1 && <div className="mt-2 w-px flex-1 bg-border/50" />}
      </div>
      <div className="pb-2 pt-1">
        <p className="mb-1 font-mono text-xs text-primary/60">{dateText}</p>
        <h3 className="mb-1 font-semibold text-foreground">{titleText}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {descriptionText}
        </p>
      </div>
    </motion.div>
  );
}

/** Timeline da história do projeto com marcos de desenvolvimento. */
export function HistorySection() {
  const t = useTranslations("contributePage.history");

  return (
    <SectionWrapper id="history">
      <AnimatedSection>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-4 gap-1.5 border-primary/30 px-3 py-1 text-primary"
          >
            <GitCommitHorizontal className="h-3 w-3" />
            {t("badge")}
          </Badge>
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
      </AnimatedSection>
      <div className="mx-auto max-w-xl">
        {TIMELINE.map(({ key, icon }, i) => (
          <TimelineItem
            key={key}
            dateText={t(`timeline.${key}.date`)}
            titleText={t(`timeline.${key}.title`)}
            descriptionText={t(`timeline.${key}.description`)}
            icon={icon}
            index={i}
            total={TIMELINE.length}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
