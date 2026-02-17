"use client";

import { motion, useInView } from "framer-motion";
import { Briefcase, Code2, Coffee, type LucideIcon, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { AnimatedNumber } from "@/components/animated-number";

const iconList: LucideIcon[] = [Code2, Briefcase, Users, Coffee];

interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

/** Seção de estatísticas numéricas animadas. */
export function StatsSection() {
  const t = useTranslations("homeStats");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const stats = t.raw("stats") as StatItem[];

  return (
    <section
      ref={ref}
      className="relative border-y border-border/40 bg-muted/20 px-4 py-12 md:px-6 md:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = iconList[index] ?? Code2;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: index * 0.1 + 0.2,
                  }}
                  className="mb-3 rounded-2xl bg-background p-3 text-primary shadow-lg md:mb-4 md:p-4"
                >
                  <Icon className="h-6 w-6 md:h-8 md:w-8" />
                </motion.div>
                <div className="text-3xl font-bold text-foreground md:text-5xl">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-1.5 text-xs font-medium text-muted-foreground md:mt-2 md:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
