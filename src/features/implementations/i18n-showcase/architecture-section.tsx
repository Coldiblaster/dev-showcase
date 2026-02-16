"use client";

import { motion } from "framer-motion";
import { Braces, FileCode2, Languages, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

import { IconBadge } from "@/components/icon-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

/**
 * Seção de arquitetura do i18n showcase.
 * 
 * Exibe cards com os pilares da arquitetura de i18n.
 */
export function Architecture() {
  const t = useTranslations("i18nPage");
  const { ref, isInView } = useSectionInView();

  const cards = [
    {
      icon: FileCode2,
      title: t("architecture.sourceOfTruth.title"),
      description: t("architecture.sourceOfTruth.description"),
    },
    {
      icon: Languages,
      title: t("architecture.autoTranslation.title"),
      description: t("architecture.autoTranslation.description"),
    },
    {
      icon: Braces,
      title: t("architecture.typeSafety.title"),
      description: t("architecture.typeSafety.description"),
    },
    {
      icon: Shield,
      title: t("architecture.qualityControl.title"),
      description: t("architecture.qualityControl.description"),
    },
  ];

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
            {t("architecture.title")}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground">
            {t("architecture.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid gap-4 sm:grid-cols-2"
        >
          {cards.map(({ icon, title, description }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <Card className="group h-full border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader className="pb-3">
                  <IconBadge icon={icon} />
                  <CardTitle className="text-base text-foreground">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
