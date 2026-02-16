"use client";
import { motion } from "framer-motion";
import { History, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { IconBadge } from "@/components/icon-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

export default function I18nNewVsLegacySection() {
  const t = useTranslations("i18nPage");
  const { ref, isInView } = useSectionInView();
  const newTitle = t("newVsLegacy.new.title");
  const legacyTitle = t("newVsLegacy.legacy.title");
  const sectionTitle = t("newVsLegacy.title");
  const sectionDesc = t("newVsLegacy.description");
  const newItems: string[] = t.raw("newVsLegacy.new.items");
  const legacyItems: string[] = t.raw("newVsLegacy.legacy.items");
  const tip = t("newVsLegacy.tip");
  const tipLabel = t("newVsLegacy.tipLabel");

  const cards = [
    {
      icon: Sparkles,
      title: newTitle,
      items: newItems,
    },
    {
      icon: History,
      title: legacyTitle,
      items: legacyItems,
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
            {sectionTitle}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground">
            {sectionDesc}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid gap-6 md:grid-cols-2"
        >
          {cards.map((card, i) => (
            <motion.div key={i} variants={fadeUp}>
              <Card className="h-full border-border/50 bg-card">
                <CardHeader className="pb-4 flex flex-row items-center gap-2">
                  <IconBadge icon={card.icon} />
                  <CardTitle className="text-lg font-semibold">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                    {card.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mt-8 text-center"
        >
          <span className="inline-block rounded bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
            <b>{tipLabel}</b> {tip}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
