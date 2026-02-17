"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TechItem {
  name: string;
  icon: string;
  level: "expert" | "advanced" | "intermediate";
  years: string;
}

interface TabData {
  id: string;
  label: string;
  techs: TechItem[];
}

const levelConfig = {
  expert: { dots: 5, color: "bg-primary" },
  advanced: { dots: 4, color: "bg-primary" },
  intermediate: { dots: 3, color: "bg-primary" },
};

/** Seção de tech stack com abas por categoria. */
export function StackSection() {
  const t = useTranslations("homeStack");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const tabs = t.raw("tabs") as TabData[];

  return (
    <section
      id="stack"
      className="relative px-4 py-16 md:px-6 md:py-32"
      ref={ref}
    >
      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 text-center md:mb-16"
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

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue={tabs[0]?.id} className="w-full">
            <TabsList className="mb-6 flex h-auto w-full flex-wrap justify-center gap-1 bg-transparent p-0 md:mb-8">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="rounded-full border border-border/50 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all data-[state=active]:border-primary/50 data-[state=active]:bg-primary/10 data-[state=active]:text-primary md:px-4 md:py-2 md:text-sm"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3"
                >
                  {tab.techs.map((tech) => {
                    const level = levelConfig[tech.level];
                    const isHovered = hoveredTech === `${tab.id}-${tech.name}`;

                    return (
                      <div
                        key={tech.name}
                        onMouseEnter={() =>
                          setHoveredTech(`${tab.id}-${tech.name}`)
                        }
                        onMouseLeave={() => setHoveredTech(null)}
                        className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-200 md:gap-4 md:p-4 ${
                          isHovered
                            ? "border-primary/50 bg-primary/5 shadow-md"
                            : "border-border/40 bg-card/50"
                        }`}
                      >
                        {/* Icon */}
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted/50 text-xl transition-transform duration-200 md:h-12 md:w-12 md:text-2xl ${
                            isHovered ? "scale-110" : ""
                          }`}
                        >
                          {tech.icon}
                        </div>

                        {/* Info */}
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-foreground md:text-base">
                              {tech.name}
                            </span>
                            <span className="shrink-0 text-[10px] font-medium text-muted-foreground md:text-xs">
                              {tech.years} {t("yearsLabel")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`h-1 w-2.5 rounded-full md:h-1.5 md:w-3 ${
                                    i < level.dots ? level.color : "bg-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-[10px] text-muted-foreground">
                              {t(`legend.${tech.level}`)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
