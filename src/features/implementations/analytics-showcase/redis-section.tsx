"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

import { REDIS_CLIENT } from "./examples";

export function RedisSection() {
  const t = useTranslations("analyticsPage");
  const { ref, isInView } = useSectionInView();
  const keys = t.raw("redis.keys") as Array<{
    key: string;
    type: string;
    desc: string;
  }>;

  return (
    <section ref={ref} id="redis" className="px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 max-w-2xl md:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-4xl">
              {t("redis.title")}
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              {t("redis.description")}
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <motion.div variants={fadeUp}>
              <CodeBlock title="lib/redis.ts" code={REDIS_CLIENT} />
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-3">
              {keys.map((item) => (
                <div
                  key={item.key}
                  className="rounded-xl border border-border/50 bg-card p-4"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-xs text-primary">
                      {item.key}
                    </code>
                    <span className="text-xs text-muted-foreground">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
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
