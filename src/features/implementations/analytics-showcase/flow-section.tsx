"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

export function FlowSection() {
  const t = useTranslations("analyticsPage");
  const { ref, isInView } = useSectionInView();
  const steps = t.raw("flow.steps") as Array<{ title: string; detail: string }>;

  return (
    <section
      ref={ref}
      id="flow"
      className="bg-secondary/20 px-4 py-12 md:px-6 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 text-center md:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-4xl">
              {t("flow.title")}
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:text-base">
              {t("flow.description")}
            </p>
          </motion.div>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="flex gap-4 rounded-xl border border-border/50 bg-card p-4 md:p-6"
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-sm font-bold text-primary md:h-10 md:w-10"
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
