"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import type experience from "@/../messages/pt-BR/experience.json";
import { Badge } from "@/components/ui/badge";
import { CardBlur } from "@/components/ui/card-blur";

type ExperienceItem = (typeof experience)["items"][number];

export function ExperienceSection() {
  const t = useTranslations("experience");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative px-6 py-32" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-2 inline-block font-mono text-sm text-primary"
        >
          {"// "}
          {t("subtitle")}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl"
        >
          {t("title")}
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-border md:left-8 md:block" />

          <div className="flex flex-col gap-12">
            {(t.raw("items") as ExperienceItem[]).map((item, i) => (
              <motion.div
                key={`${item.company}-${i}`}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                className="group relative md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 hidden md:left-7.25 md:block">
                  <motion.div
                    className="h-3 w-3 rounded-full border-2 border-primary bg-background"
                    whileHover={{ scale: 1.5 }}
                  />
                </div>

                <CardBlur
                  radius="xl"
                  padding="p-6"
                  bg="bg-card"
                  className="transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.role}
                      </h3>
                      <p className="font-mono text-sm text-primary">
                        {item.company}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {item.period}
                    </span>
                  </div>

                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.techs.map((tech: string) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="border-border font-mono text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardBlur>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
