"use client";

import { motion, useInView } from "framer-motion";
import { Code, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import type projectsPage from "@/../messages/pt-BR/projects.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Project = (typeof projectsPage)["items"][number];

export function ProjectsSection() {
  const t = useTranslations("projects");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const items = t.raw("items") as Project[];

  return (
    <section id="projects" className="relative px-6 py-16 md:py-32" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.03),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl">
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
          className="mb-8 text-balance text-4xl font-bold tracking-tight text-foreground md:mb-16 md:text-5xl"
        >
          {t("title")}
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <Card className="group h-full overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className="border-b border-border">
                  {project.image ? (
                    <div className="relative h-48">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-secondary/50">
                      <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                        <Code className="h-5 w-5 text-primary" />
                        <span>{project.title}</span>
                      </div>
                    </div>
                  )}
                </div>

                <CardHeader className="pb-3">
                  <h3 className="text-base font-semibold text-foreground md:text-lg">
                    {project.title}
                  </h3>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-4">
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="border-border font-mono text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          className="w-full gap-1.5 text-xs"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          {t("viewSite")}
                        </Button>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={project.link ? "" : "flex-1"}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full gap-1.5 text-xs"
                        >
                          <Github className="h-3.5 w-3.5" />
                          {t("viewCode")}
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
