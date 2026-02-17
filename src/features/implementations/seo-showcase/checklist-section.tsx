"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

interface ChecklistItem {
  label: string;
  done: boolean;
}

export function ChecklistSection() {
  const t = useTranslations("seoPage");
  const { ref, isInView } = useSectionInView();
  const items = t.raw("checklist.items") as ChecklistItem[];

  return (
    <section
      ref={ref}
      className="bg-muted/30 px-4 py-12 md:px-6 md:py-24 bg-secondary/20"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 text-center md:mb-10">
            <h2 className="mb-3 text-2xl font-bold text-foreground">
              {t("checklist.title")}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              {t("checklist.description")}
            </p>
          </motion.div>

          <div className="grid gap-2 sm:grid-cols-2">
            {items.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="flex items-center gap-3 rounded-lg border border-border/50 bg-card px-4 py-3"
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    item.done
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
