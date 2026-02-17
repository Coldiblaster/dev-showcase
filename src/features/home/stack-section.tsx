"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";

interface TechItem {
  name: string;
  icon: string;
  level: "expert" | "advanced" | "intermediate";
  years: string;
}

interface CategoryData {
  name: string;
  techs: TechItem[];
}

const levelConfig = {
  expert: { dots: 5, color: "bg-primary" },
  advanced: { dots: 4, color: "bg-primary" },
  intermediate: { dots: 3, color: "bg-primary" },
};

export function StackSection() {
  const t = useTranslations("homeStack");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const categories = t.raw("categories") as CategoryData[];

  return (
    <section id="stack" className="relative px-4 py-16 md:px-6 md:py-32" ref={ref}>
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 text-center md:mb-20"
        >
          <Badge variant="secondary" className="mb-4 font-mono text-xs md:mb-6">
            {t("badge")}
          </Badge>
          <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-foreground md:mb-6 md:text-5xl lg:text-6xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground md:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Tech Categories Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:gap-8 xl:grid-cols-3">
          {categories.map((category, categoryIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: categoryIdx * 0.1,
                ease: "easeOut",
              }}
              className="group relative"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card backdrop-blur transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
                <div className="p-4 md:p-6">
                  {/* Category Header */}
                  <div className="mb-4 md:mb-6">
                    <h3 className="mb-1 text-lg font-bold text-foreground md:text-xl">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {t("techCount", { count: category.techs.length })}
                    </p>
                  </div>

                  {/* Tech Items */}
                  <div className="space-y-2 md:space-y-3">
                    {category.techs.map((tech, techIdx) => {
                      const level = levelConfig[tech.level];
                      const isHovered =
                        hoveredTech === `${category.name}-${tech.name}`;

                      return (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{
                            duration: 0.4,
                            delay: categoryIdx * 0.1 + techIdx * 0.05,
                            ease: "easeOut",
                          }}
                          onMouseEnter={() =>
                            setHoveredTech(`${category.name}-${tech.name}`)
                          }
                          onMouseLeave={() => setHoveredTech(null)}
                        >
                          <div
                            className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
                              isHovered
                                ? "border-primary/50 bg-muted/50 shadow-md"
                                : "border-border/30 bg-card/50"
                            }`}
                          >
                            <div className="relative flex items-center gap-3 p-3 md:gap-4 md:p-4">
                              {/* Tech Icon */}
                              <motion.div
                                animate={{ scale: isHovered ? 1.1 : 1 }}
                                transition={{ duration: 0.2 }}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-background to-muted text-xl shadow-sm md:h-12 md:w-12 md:text-2xl"
                              >
                                {tech.icon}
                              </motion.div>

                              {/* Tech Info */}
                              <div className="min-w-0 flex-1 space-y-1.5 md:space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-sm font-semibold text-foreground md:text-base">
                                    {tech.name}
                                  </span>
                                  <Badge
                                    variant="secondary"
                                    className="h-5 shrink-0 px-2 text-[10px] font-medium"
                                  >
                                    {tech.years}
                                  </Badge>
                                </div>

                                {/* Level Indicator */}
                                <div className="flex items-center gap-2">
                                  <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <motion.div
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={
                                          isInView ? { scale: 1 } : {}
                                        }
                                        transition={{
                                          duration: 0.2,
                                          delay:
                                            categoryIdx * 0.1 +
                                            techIdx * 0.05 +
                                            i * 0.02,
                                        }}
                                        className={`h-1.5 w-3 rounded-full transition-colors ${
                                          i < level.dots
                                            ? level.color
                                            : "bg-muted"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-[10px] font-medium text-muted-foreground">
                                    {t(`legend.${tech.level}`)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10 flex justify-center md:mt-16"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-4 rounded-2xl border bg-card/80 px-4 py-3 backdrop-blur-xl md:gap-6 md:px-8 md:py-4">
            {(["expert", "advanced", "intermediate"] as const).map((key) => {
              const value = levelConfig[key];
              return (
                <div key={key} className="flex items-center gap-2 md:gap-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 w-3 rounded-full md:h-2 md:w-4 ${
                          i < value.dots ? value.color : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground md:text-sm">
                    {t(`legend.${key}`)}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
