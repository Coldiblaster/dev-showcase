"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

import { TRACK_ROUTE } from "./examples";

export function TrackSection() {
  const t = useTranslations("analyticsPage");
  const { ref, isInView } = useSectionInView();
  const highlights = t.raw("track.highlights") as string[];

  return (
    <section ref={ref} id="track" className="px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 max-w-2xl md:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-4xl">
              {t("track.title")}
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              {t("track.description")}
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <motion.div variants={fadeUp} className="min-w-0">
              <CodeBlock
                title="app/api/stats/track/route.ts"
                code={TRACK_ROUTE}
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="flex min-w-0 flex-col gap-3"
            >
              {highlights.map((text, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-4 md:p-5"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {text}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
