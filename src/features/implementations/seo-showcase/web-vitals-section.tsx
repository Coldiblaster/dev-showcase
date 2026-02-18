"use client";

import { motion } from "framer-motion";
import { Activity, Info } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

interface VitalItem {
  metric: string;
  name: string;
  description: string;
  tip: string;
}

const THRESHOLDS: Record<string, { good: string; mid: string; poor: string }> =
  {
    LCP: { good: "< 2.5s", mid: "2.5s – 4s", poor: "> 4s" },
    INP: { good: "< 200ms", mid: "200 – 500ms", poor: "> 500ms" },
    CLS: { good: "< 0.1", mid: "0.1 – 0.25", poor: "> 0.25" },
    FCP: { good: "< 1.8s", mid: "1.8s – 3s", poor: "> 3s" },
    TTFB: { good: "< 800ms", mid: "800ms – 1.8s", poor: "> 1.8s" },
  };

export function WebVitalsSection() {
  const t = useTranslations("seoPage");
  const { ref, isInView } = useSectionInView();
  const items = t.raw("webVitals.items") as VitalItem[];

  return (
    <section ref={ref} id="web-vitals" className="px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 max-w-2xl md:mb-12">
            <div className="mb-3 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                {t("webVitals.title")}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground md:text-base">
              {t("webVitals.description")}
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const threshold = THRESHOLDS[item.metric];
              return (
                <motion.div key={item.metric} variants={fadeUp}>
                  <Card className="h-full border-border/50 transition-colors hover:border-primary/30">
                    <CardContent className="p-4 md:p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="rounded-md bg-primary/10 px-2.5 py-1 font-mono text-sm font-bold text-primary">
                          {item.metric}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.name}
                        </span>
                      </div>

                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>

                      {threshold && (
                        <div className="mb-4 flex gap-1.5">
                          <div className="flex flex-1 flex-col items-center rounded-md bg-emerald-500/10 px-2 py-1.5">
                            <span className="text-[10px] font-medium text-emerald-400">
                              {t("webVitals.good")}
                            </span>
                            <span className="font-mono text-xs text-emerald-300">
                              {threshold.good}
                            </span>
                          </div>
                          <div className="flex flex-1 flex-col items-center rounded-md bg-amber-500/10 px-2 py-1.5">
                            <span className="text-[10px] font-medium text-amber-400">
                              {t("webVitals.needsImprovement")}
                            </span>
                            <span className="font-mono text-xs text-amber-300">
                              {threshold.mid}
                            </span>
                          </div>
                          <div className="flex flex-1 flex-col items-center rounded-md bg-red-500/10 px-2 py-1.5">
                            <span className="text-[10px] font-medium text-red-400">
                              {t("webVitals.poor")}
                            </span>
                            <span className="font-mono text-xs text-red-300">
                              {threshold.poor}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="rounded-lg border border-border/30 bg-secondary/30 p-3">
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          <span className="font-semibold text-foreground">
                            {t("webVitals.tipLabel")}{" "}
                          </span>
                          {item.tip}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-4"
          >
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">
              {t("webVitals.monitorTip")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
