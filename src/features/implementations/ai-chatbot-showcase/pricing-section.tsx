"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

interface ModelInfo {
  name: string;
  input: string;
  output: string;
  best: string;
  recommended: boolean;
}

export function PricingSection() {
  const t = useTranslations("aiChatbotPage");
  const { ref, isInView } = useSectionInView();
  const models = t.raw("pricing.models") as ModelInfo[];

  return (
    <section ref={ref} id="pricing" className="px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 text-center md:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-4xl">
              {t("pricing.title")}
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              {t("pricing.description")}
            </p>
          </motion.div>

          <div className="grid gap-4 md:gap-6 md:grid-cols-3">
            {models.map((model) => (
              <motion.div key={model.name} variants={fadeUp}>
                <Card
                  className={`relative h-full border-border/50 bg-card ${
                    model.recommended
                      ? "border-primary/40 shadow-lg shadow-primary/5"
                      : ""
                  }`}
                >
                  {model.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="gap-1 bg-primary text-primary-foreground">
                        <Sparkles className="h-3 w-3" />
                        {t("pricing.recommended")}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-4 pt-6 md:p-6 md:pt-8">
                    <h3 className="mb-4 font-mono text-base font-bold text-foreground md:text-lg">
                      {model.name}
                    </h3>
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {t("pricing.inputLabel")}
                        </span>
                        <span className="font-mono font-medium text-foreground">
                          {model.input}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {t("pricing.outputLabel")}
                        </span>
                        <span className="font-mono font-medium text-foreground">
                          {model.output}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {model.best}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-8 text-center md:mt-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 md:px-6 md:py-3">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-foreground md:text-sm">
                {t("pricing.estimate")}
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground md:text-sm">
              {t("pricing.tip")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
