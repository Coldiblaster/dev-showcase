"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

interface ArchItem {
  title: string;
  description: string;
}

export function ArchitectureSection() {
  const t = useTranslations("aiChatbotPage");
  const { ref, isInView } = useSectionInView();
  const items = t.raw("architecture.items") as ArchItem[];

  return (
    <section
      ref={ref}
      id="architecture"
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
              {t("architecture.title")}
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              {t("architecture.description")}
            </p>
          </motion.div>

          <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
            {items.map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="h-full border-border/50 bg-card">
                  <CardContent className="p-4 md:p-6">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
                      {i + 1}
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-foreground md:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
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
