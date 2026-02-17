"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";
import type { Messages } from "@/lib/i18n/types";

type I18nPage = Messages["i18nPage"];
type BestPracticeDo = I18nPage["bestPractices"]["do"]["items"][number];
type BestPracticeDont = I18nPage["bestPractices"]["dont"]["items"][number];

/**
 * Seção de boas práticas do i18n.
 * 
 * Exibe listas de do's e don'ts para i18n.
 */
export function BestPractices() {
  const t = useTranslations("i18nPage");
  const { ref, isInView } = useSectionInView();
  const doItems: BestPracticeDo[] = t.raw("bestPractices.do.items");
  const dontItems: BestPracticeDont[] = t.raw("bestPractices.dont.items");

  return (
    <section ref={ref} className="px-4 py-12 md:px-6 md:py-24 bg-secondary/20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="mb-8 md:mb-12 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="mb-2 text-2xl font-bold text-foreground md:text-4xl"
          >
            {t("bestPractices.title")}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm md:text-base text-muted-foreground">
            {t("bestPractices.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid gap-4 md:gap-6 md:grid-cols-2"
        >
          <motion.div variants={fadeUp}>
            <Card className="h-full border-primary/20 bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  {t("bestPractices.do.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {doItems.map((item, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {item}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card className="h-full border-destructive/20 bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" />
                  {t("bestPractices.dont.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {dontItems.map((item, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive/60" />
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {item}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
