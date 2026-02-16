"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { CardBlur } from "@/components/ui/card-blur";
import { Separator } from "@/components/ui/separator";

export function AboutSection() {
  const t = useTranslations("about");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: t("stats.years"), label: t("stats.yearsLabel") },
    {
      value: t("stats.projects"),
      label: t("stats.projectsLabel"),
    },
    {
      value: t("stats.languages"),
      label: t("stats.languagesLabel"),
    },
  ];

  return (
    <section id="about" className="relative px-6 py-32" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* Left - Title area */}
          <div>
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
              className="mb-8 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl"
            >
              {t("title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-pretty leading-relaxed text-muted-foreground"
            >
              {t("description")}
            </motion.p>
          </div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CardBlur radius="xl" padding="p-8" bg="bg-card">
              <div className="flex flex-col gap-6">
                {stats.map((stat, i) => (
                  <div key={stat.label}>
                    <div className="flex items-baseline justify-between">
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: 0.4 + i * 0.15,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="font-mono text-4xl font-bold text-primary"
                      >
                        {stat.value}
                      </motion.span>
                      <span className="text-sm text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                    {i < stats.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>

              {/* Tech stack pills */}
              <Separator className="my-8" />
              <div className="flex flex-wrap gap-2">
                {[
                  "React 18+",
                  "Next.js 14+",
                  "React Native",
                  "TypeScript",
                  "Tailwind CSS",
                  "Material UI",
                  "Radix UI",
                  "GraphQL",
                  "React Query",
                  "Node.js",
                  "Jest / Vitest",
                  "Expo",
                  "Styled Components",
                  "CI/CD",
                ].map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                    className="rounded-md border border-border bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </CardBlur>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
