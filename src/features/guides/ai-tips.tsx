"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  Code2,
  ExternalLink,
  Lightbulb,
  MessageSquare,
  Shield,
  Sparkles,
  Terminal,
  Wrench,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

import type tipsPage from "@/../messages/pt-BR/tipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { CTASection } from "@/components/cta-section";
import { FeatureCard } from "@/components/feature-card";
import { HeroSection } from "@/components/hero-section";
import { PromptCard } from "@/components/prompt-card";
import { SectionHeader } from "@/components/section-header";
import { TipItem } from "@/components/tip-item";
import { CardBlur } from "@/components/ui/card-blur";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type V0Feature = (typeof tipsPage)["v0"]["features"][number];
type CopilotFeature = (typeof tipsPage)["copilot"]["features"][number];
type CopilotPrompt = (typeof tipsPage)["copilot"]["prompts"][number];
type PromptsCategory = (typeof tipsPage)["prompts"]["categories"][number];
type MindsetPrinciple = (typeof tipsPage)["mindset"]["principles"][number];
type ToolsCategory = (typeof tipsPage)["tools"]["categories"][number];

export function AITips() {
  const t = useTranslations("tipsPage");

  return (
    <div className="min-h-screen pt-20">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Sparkles}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        warning={t("hero.warning")}
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={Zap}
              title={t("v0.title")}
              subtitle={t("v0.subtitle")}
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
              {t("v0.description")}
            </p>
          </AnimatedSection>

          <div className="mb-10 grid gap-4 md:grid-cols-2">
            {(t.raw("v0.features") as V0Feature[]).map((feature, i) => (
              <AnimatedSection key={feature.title} delay={0.1 + i * 0.05}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <div className="mb-3 flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {t("v0.promptExample")}
              </span>
            </div>
            <CodeBlock
              title={t("v0.promptTitle")}
              code={t("v0.promptContent")}
            />
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={Code2}
              title={t("copilot.title")}
              subtitle={t("copilot.subtitle")}
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
              {t("copilot.description")}
            </p>
          </AnimatedSection>

          <div className="mb-10 grid gap-4 md:grid-cols-2">
            {(t.raw("copilot.features") as CopilotFeature[]).map(
              (feature, i) => (
                <AnimatedSection key={feature.title} delay={0.1 + i * 0.05}>
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                  />
                </AnimatedSection>
              ),
            )}
          </div>

          <AnimatedSection delay={0.3}>
            <div className="mb-4 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {t("copilot.promptTitle")}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {(t.raw("copilot.prompts") as CopilotPrompt[]).map((item, i) => (
                <PromptCard
                  key={i}
                  prompt={item.prompt}
                  description={item.description}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <section className="px-6 py-20">
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
                      {(cat.items as CopilotPrompt[]).map((item, j) => (
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

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={Wrench}
              title={t("tools.title")}
              subtitle={t("tools.subtitle")}
            />
          </AnimatedSection>

          <div className="flex flex-col gap-10">
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

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={Shield}
              title={t("mindset.title")}
              subtitle={t("mindset.subtitle")}
              iconBgColor="bg-amber-500/10"
              iconColor="text-amber-500"
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="mb-10 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
              {t("mindset.description")}
            </p>
          </AnimatedSection>

          <div className="flex flex-col gap-4">
            {(t.raw("mindset.principles") as MindsetPrinciple[]).map(
              (principle, i) => (
                <AnimatedSection key={principle.title} delay={0.1 + i * 0.05}>
                  <TipItem
                    index={i + 1}
                    title={principle.title}
                    description={principle.description}
                  />
                </AnimatedSection>
              ),
            )}
          </div>
        </div>
      </section>

      <CTASection
        icon={BookOpen}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
      />
    </div>
  );
}
