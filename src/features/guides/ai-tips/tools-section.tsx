"use client";

import { motion } from "framer-motion";
import { ExternalLink, Wrench } from "lucide-react";
import { useTranslations } from "next-intl";

import type tipsPage from "@/../messages/pt-BR/tipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { CardBlur } from "@/components/ui/card-blur";

type ToolsCategory = (typeof tipsPage)["tools"]["categories"][number];

/** Seção de ferramentas de IA organizadas por categoria. */
export function ToolsSection() {
  const t = useTranslations("tipsPage");

  return (
    <section id="tools" className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={Wrench}
            title={t("tools.title")}
            subtitle={t("tools.subtitle")}
          />
        </AnimatedSection>

        <div className="flex flex-col gap-6 md:gap-10">
          {(t.raw("tools.categories") as ToolsCategory[]).map(
            (cat, i: number) => (
              <AnimatedSection key={cat.category} delay={i * 0.1}>
                <h3 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-primary">
                  {cat.category}
                </h3>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((tool) => (
                    <motion.a
                      key={tool.name}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-2 transition-colors hover:border-primary/30"
                      whileHover={{ y: -3 }}
                    >
                      <CardBlur radius="xl" padding="p-5">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-foreground">
                            {tool.name}
                          </span>
                          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/50 transition-colors group-hover:text-primary" />
                        </div>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {tool.description}
                        </p>
                      </CardBlur>
                    </motion.a>
                  ))}
                </div>
              </AnimatedSection>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
