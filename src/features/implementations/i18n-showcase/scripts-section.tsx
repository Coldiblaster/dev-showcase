"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";
import type { Messages } from "@/lib/i18n/types";

type ScriptItem = Messages["i18nPage"]["scripts"]["items"][number];

/**
 * Seção de scripts de automação.
 *
 * Lista de comandos disponíveis para gerenciar traduções.
 */
export function Scripts() {
  const t = useTranslations("i18nPage");
  const { ref, isInView } = useSectionInView();
  const items: ScriptItem[] = t.raw("scripts.items");

  return (
    <section ref={ref} id="scripts" className="px-4 py-12 md:px-6 md:py-24">
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
            {t("scripts.title")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base text-muted-foreground"
          >
            {t("scripts.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="flex flex-col gap-3"
        >
          {items.map((item, i: number) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.4 }}
            >
              <Card className="group border-border/50 bg-card transition-all hover:border-primary/30">
                <CardContent className="flex flex-col items-start gap-3 p-4 md:gap-4 md:p-5 sm:flex-row sm:items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Terminal className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <code className="break-all font-mono text-sm font-semibold text-foreground">
                      {item.command}
                    </code>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="shrink-0 border-primary/30 text-primary"
                  >
                    {item.badge}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
