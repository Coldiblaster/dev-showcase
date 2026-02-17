"use client";

import { motion } from "framer-motion";
import { Code2, Crown, Sprout } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";

import type { DevLevel, DevLevelFilter } from "./data/types";

const levels = [
  { id: "junior" as const, icon: Sprout },
  { id: "pleno" as const, icon: Code2 },
  { id: "senior" as const, icon: Crown },
] satisfies {
  id: DevLevel;
  icon: React.ComponentType<{ className?: string }>;
}[];

interface LevelSelectorProps {
  level: DevLevelFilter;
  onLevelChange: (level: DevLevelFilter) => void;
  counts: Record<DevLevel, number>;
}

export function LevelSelector({
  level,
  onLevelChange,
  counts,
}: LevelSelectorProps) {
  const t = useTranslations("devResourcesPage.levelSelector");

  const isSelected = (id: DevLevel) => level === id;

  const greetingKey = level === "all" ? "none" : level;

  return (
    <section className="relative px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
              {t("title")}
            </h2>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>
        </AnimatedSection>

        {/* Level Cards */}
        <AnimatedSection delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-3">
            {levels.map((item) => {
              const Icon = item.icon;
              const selected = isSelected(item.id);

              return (
                <motion.button
                  key={item.id}
                  aria-pressed={selected}
                  onClick={() => {
                    onLevelChange(selected ? "all" : item.id);
                    setTimeout(() => {
                      document.getElementById("tips")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 100);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 text-center transition-colors ${
                    selected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  {/* Glow effect when selected */}
                  {selected && (
                    <motion.div
                      layoutId="level-glow"
                      className="absolute inset-0 rounded-xl bg-primary/5"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                      selected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="relative z-10">
                    <p className="text-base font-semibold md:text-lg">
                      {t(item.id)}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t(`${item.id}Description`)}
                    </p>
                  </div>

                  <span
                    className={`relative z-10 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      selected
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {t("resourceCount", { count: counts[item.id] })}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Greeting message */}
        <AnimatedSection delay={0.2}>
          <motion.div
            key={greetingKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-base text-muted-foreground md:text-lg">
              {t(`greeting.${greetingKey}`)}
            </p>

            {level !== "all" && (
              <button
                onClick={() => onLevelChange("all")}
                aria-label={t("showAll")}
                className="mt-3 text-sm text-primary underline-offset-4 hover:underline"
              >
                {t("showAll")}
              </button>
            )}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
