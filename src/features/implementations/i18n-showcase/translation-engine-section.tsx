"use client";

import { motion } from "framer-motion";
import { Globe, Sparkles, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { Card, CardContent } from "@/components/ui/card";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

import { ENV_EXAMPLE } from "./examples";

/**
 * Seção sobre tradução automática com DeepL.
 *
 * Explica como funciona a tradução automática e o plano gratuito.
 */
export function TranslationEngine() {
  const t = useTranslations("i18nPage.translationEngine");
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="px-4 py-12 md:px-6 md:py-24">
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
            {t("title")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base text-muted-foreground"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid gap-4 md:gap-6 md:grid-cols-3 mb-8 md:mb-10"
        >
          {(
            [
              { icon: Sparkles, key: "quality" },
              { icon: Zap, key: "buildTime" },
              { icon: Globe, key: "free" },
            ] as const
          ).map((item) => (
            <motion.div key={item.key} variants={fadeUp}>
              <Card className="h-full border-border/50 bg-card">
                <CardContent className="p-4 md:p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 text-base md:text-lg font-semibold text-foreground">
                    {t(`${item.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
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
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="mb-4 text-base font-semibold text-foreground md:text-lg">
            {t("setup")}
          </h3>
          <CodeBlock title=".env.local" code={ENV_EXAMPLE(t("getKey"))} />

          <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">{t("tipLabel")}</strong>{" "}
              {t("tip")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
