"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";
import type { Messages } from "@/lib/i18n/types";

type WorkflowStep = Messages["i18nPage"]["workflow"]["steps"][number];

/**
 * Seção de workflow do i18n.
 *
 * Timeline com os passos do fluxo de trabalho.
 */
export function Workflow() {
  const t = useTranslations("i18nPage");
  const { ref, isInView } = useSectionInView();
  const steps: WorkflowStep[] = t.raw("workflow.steps");

  return (
    <section
      ref={ref}
      id="workflow"
      className="px-4 py-12 md:px-6 md:py-24 bg-secondary/20"
    >
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
            {t("workflow.title")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base text-muted-foreground"
          >
            {t("workflow.subtitle")}
          </motion.p>
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-0 left-6 top-0 hidden w-px bg-border md:block lg:left-1/2" />

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={stagger}
            className="flex flex-col gap-6 md:gap-8"
          >
            {steps.map((step, i: number) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className={`relative flex flex-col gap-4 md:flex-row md:items-start ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="absolute left-6 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background md:flex lg:left-1/2">
                  <span className="font-mono text-xs font-bold text-primary">
                    {step.step}
                  </span>
                </div>

                <div
                  className={`flex-1 pl-0 md:pl-16 ${i % 2 === 0 ? "lg:pr-16 lg:pl-0 lg:text-right" : "lg:pl-16 lg:pr-0"}`}
                >
                  <Card className="border-border/50 bg-card">
                    <CardContent className="p-4 md:p-5">
                      <div
                        className={`flex items-center gap-2 ${i % 2 === 0 ? "lg:justify-end" : ""}`}
                      >
                        <span className="font-mono text-xs text-primary md:hidden">
                          {step.step}
                        </span>
                        <h3 className="text-base md:text-lg font-semibold text-foreground">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                      {step.command && (
                        <div className="mt-3 inline-flex max-w-full items-center gap-2 overflow-hidden rounded-lg bg-secondary px-3 py-1.5">
                          <Terminal className="h-3.5 w-3.5 shrink-0 text-primary" />
                          <code className="truncate font-mono text-xs text-foreground">
                            {step.command}
                          </code>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="hidden flex-1 lg:block" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
