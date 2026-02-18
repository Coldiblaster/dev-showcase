"use client";

import { motion } from "framer-motion";
import { ChevronRight, Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";

import type tipsPage from "@/../messages/pt-BR/tipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { CardBlur } from "@/components/ui/card-blur";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PromptsCategory = (typeof tipsPage)["prompts"]["categories"][number];
type PromptItem = { prompt: string; description: string };

/** Seção de prompts organizados por categoria com tabs. */
export function PromptsSection() {
  const t = useTranslations("tipsPage");

  return (
    <section id="prompts" className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={Lightbulb}
            title={t("prompts.title")}
            subtitle={t("prompts.subtitle")}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Tabs defaultValue="0" className="mt-8">
            <TabsList className="mb-6 w-full justify-start bg-secondary/50">
              {(t.raw("prompts.categories") as PromptsCategory[]).map(
                (cat, i) => (
                  <TabsTrigger
                    key={i}
                    value={String(i)}
                    className="text-xs md:text-sm"
                  >
                    {cat.title}
                  </TabsTrigger>
                ),
              )}
            </TabsList>

            {(t.raw("prompts.categories") as PromptsCategory[]).map(
              (cat, i) => (
                <TabsContent key={i} value={String(i)}>
                  <div className="flex flex-col gap-4">
                    {(cat.items as PromptItem[]).map((item, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: j * 0.05 }}
                      >
                        <CardBlur
                          radius="xl"
                          padding="p-5"
                          className="group transition-colors hover:border-primary/20"
                        >
                          <div className="mb-3 flex items-start gap-3">
                            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <p className="font-mono text-sm leading-relaxed text-foreground">
                              {item.prompt}
                            </p>
                          </div>
                          <p className="pl-7 text-xs leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        </CardBlur>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ),
            )}
          </Tabs>
        </AnimatedSection>
      </div>
    </section>
  );
}
