"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

interface ComparisonItem {
  feature: string;
  next: string;
  vite: string;
  nextCode: string;
  viteCode: string;
}

export function ComparisonSection() {
  const t = useTranslations("seoPage");
  const { ref, isInView } = useSectionInView();
  const items = t.raw("comparison.items") as ComparisonItem[];
  const [activeIndex, setActiveIndex] = useState(0);

  const active = items[activeIndex];

  return (
    <section ref={ref} className="px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 max-w-2xl md:mb-10">
            <h2 className="mb-3 text-2xl font-bold text-foreground">
              {t("comparison.title")}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              {t("comparison.description")}
            </p>
          </motion.div>

          {/* Feature tabs */}
          <motion.div
            variants={fadeUp}
            className="mb-8 flex flex-wrap gap-2"
          >
            {items.map((item, idx) => (
              <button
                key={item.feature}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  idx === activeIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.feature}
              </button>
            ))}
          </motion.div>

          {/* Comparison grid */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid gap-4 md:gap-6 lg:grid-cols-2"
          >
            {/* Next.js side */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/20 text-primary hover:bg-primary/20">
                  {t("comparison.nextLabel")}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{active.next}</p>
              <CodeBlock title="Next.js" code={active.nextCode} />
            </div>

            {/* Vite side */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-amber-500/30 text-amber-400"
                >
                  {t("comparison.viteLabel")}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{active.vite}</p>
              <CodeBlock title="React + Vite" code={active.viteCode} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
