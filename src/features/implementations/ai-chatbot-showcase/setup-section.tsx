"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

interface SetupStep {
  step: string;
  title: string;
  description: string;
  link?: string;
  linkLabel?: string;
  code?: string;
}

export function SetupSection() {
  const t = useTranslations("aiChatbotPage");
  const { ref, isInView } = useSectionInView();
  const steps = t.raw("setup.steps") as SetupStep[];

  return (
    <section
      ref={ref}
      id="setup"
      className="bg-secondary/20 px-4 py-12 md:px-6 md:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 text-center md:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-4xl">
              {t("setup.title")}
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              {t("setup.description")}
            </p>
          </motion.div>

          <div className="flex flex-col gap-4 md:gap-6">
            {steps.map((step) => (
              <motion.div key={step.step} variants={fadeUp}>
                <Card className="border-border/50 bg-card">
                  <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start md:p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-mono text-lg font-bold text-primary">
                      {step.step}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 text-base font-semibold text-foreground md:text-lg">
                        {step.title}
                      </h3>
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                      {step.code && (
                        <CodeBlock title=".env.local" code={step.code} />
                      )}
                      {step.link && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 gap-2"
                          asChild
                        >
                          <a
                            href={step.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            {step.linkLabel}
                            <ArrowRight className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
