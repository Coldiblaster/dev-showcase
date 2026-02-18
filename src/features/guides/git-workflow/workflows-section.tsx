"use client";

import { motion } from "framer-motion";
import { ArrowRight, Workflow } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CardBlur } from "@/components/ui/card-blur";

interface WorkflowItem {
  name: string;
  steps: string[];
}

export function WorkflowsSection() {
  const t = useTranslations("gitWorkflow.workflows");
  const items = t.raw("items") as WorkflowItem[];

  return (
    <section
      id="workflows"
      className="bg-secondary/20 px-4 py-12 md:px-6 md:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="mb-8 flex items-center gap-3 md:mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
              <Workflow className="h-5 w-5 text-orange-500" />
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

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item, i) => (
            <AnimatedSection key={item.name} delay={0.1 + i * 0.05}>
              <CardBlur className="h-full" padding="p-5">
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                  {item.name}
                </h3>
                <div className="flex flex-col gap-1">
                  {item.steps.map((step, si) => {
                    if (!step) return <div key={si} className="h-2" />;
                    const isComment = step.startsWith("#");
                    return (
                      <motion.div
                        key={si}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: si * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        {!isComment && (
                          <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-primary/50" />
                        )}
                        <code
                          className={`font-mono text-xs ${
                            isComment
                              ? "text-muted-foreground/60 italic"
                              : "text-foreground/80"
                          }`}
                        >
                          {step}
                        </code>
                      </motion.div>
                    );
                  })}
                </div>
              </CardBlur>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
