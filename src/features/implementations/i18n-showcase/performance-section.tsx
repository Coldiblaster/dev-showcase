"use client";

import { motion } from "framer-motion";
import { Gauge, Rocket, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

/**
 * Seção sobre performance e build-time.
 * 
 * Explica que traduções não impactam runtime.
 */
export function Performance() {
  const t = useTranslations("i18nPage.performance");
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="px-6 py-24 bg-secondary/20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="mb-12 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="mb-2 text-3xl font-bold text-foreground md:text-4xl"
          >
            {t("title")}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground">
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid gap-6 md:grid-cols-3"
        >
          {([
            { icon: Rocket, key: "buildTime" },
            { icon: Gauge, key: "bundle" },
            { icon: Shield, key: "typeSafe" },
          ] as const).map((item) => (
            <motion.div key={item.key} variants={fadeUp}>
              <Card className="h-full border-border/50 bg-card">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {t(`${item.key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(`${item.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-6 py-3">
            <span className="text-2xl font-bold text-primary">0ms</span>
            <span className="text-sm text-muted-foreground">
              {t("overhead")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
