"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Component,
  FolderKanban,
  FolderTree,
  Globe,
  Layers,
  Lightbulb,
  MessageSquare,
  Wrench,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";
import { SectionWrapper } from "@/components/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeUp, stagger } from "@/lib/animation-variants";

const FOLDERS = [
  "app",
  "features",
  "components",
  "lib",
  "messages",
  "hooks",
] as const;

const FOLDER_ICONS: Record<(typeof FOLDERS)[number], typeof FolderTree> = {
  app: FolderTree,
  features: FolderKanban,
  components: Component,
  lib: Wrench,
  messages: MessageSquare,
  hooks: FolderKanban,
};

const PATTERNS = [
  "featureSlice",
  "barrelExports",
  "serverClient",
  "i18nNamespaces",
  "sharedComponents",
] as const;

const PATTERN_ICONS: Record<(typeof PATTERNS)[number], typeof Component> = {
  featureSlice: FolderKanban,
  barrelExports: FolderTree,
  serverClient: Component,
  i18nNamespaces: Globe,
  sharedComponents: Component,
};

const FLOWS = ["i18n", "api", "content"] as const;

const FLOW_ICONS: Record<(typeof FLOWS)[number], typeof Globe> = {
  i18n: Globe,
  api: MessageSquare,
  content: FolderTree,
};

const DECISIONS = [
  "appRouter",
  "nextIntl",
  "tailwind",
  "framerMotion",
  "monorepo",
] as const;

/** Página de Arquitetura — estrutura de pastas, padrões, fluxo de dados e decisões técnicas. */
export function ArchitecturePage() {
  const tNav = useTranslations("architecturePage.sectionNav");
  const tHero = useTranslations("architecturePage.hero");
  const tStructure = useTranslations("architecturePage.structure");
  const tPatterns = useTranslations("architecturePage.patterns");
  const tDataFlow = useTranslations("architecturePage.dataFlow");
  const tDecisions = useTranslations("architecturePage.decisions");

  const sections = [
    { id: "structure", label: tNav("structure") },
    { id: "patterns", label: tNav("patterns") },
    { id: "dataFlow", label: tNav("dataFlow") },
    { id: "decisions", label: tNav("decisions") },
  ];

  const scrollToStructure = () => {
    document
      .getElementById("structure")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={tHero("badge")}
        badgeIcon={Layers}
        title={tHero("title")}
        description={tHero("description")}
        showBackLink
        backHref="/contribua"
        ctaSlot={
          <AnimatedSection delay={0.25}>
            <Button
              size="lg"
              onClick={scrollToStructure}
              className="gap-2 rounded-full"
            >
              <Layers className="h-4 w-4" />
              {tHero("cta")}
            </Button>
          </AnimatedSection>
        }
      />

      <SectionNav sections={sections} triggerId="structure" />
      <SectionDivider />

      {/* Structure */}
      <SectionWrapper id="structure">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="space-y-12"
        >
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              variant="outline"
              className="mb-4 gap-1.5 border-primary/30 px-3 py-1 text-primary"
            >
              <FolderTree className="h-3 w-3" />
              {tStructure("badge")}
            </Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              {tStructure("title")}
            </h2>
            <p className="text-muted-foreground">{tStructure("description")}</p>
          </div>

          <motion.div
            variants={stagger}
            className="mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {FOLDERS.map((key) => {
              const Icon = FOLDER_ICONS[key];
              return (
                <motion.div key={key} variants={fadeUp}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30">
                    <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="mb-1.5 font-mono text-sm font-medium text-primary">
                        {tStructure(`folders.${key}.name`)}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {tStructure(`folders.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </SectionWrapper>

      <SectionDivider />

      {/* Patterns */}
      <SectionWrapper id="patterns" variant="alternate">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="space-y-12"
        >
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              variant="outline"
              className="mb-4 gap-1.5 border-primary/30 px-3 py-1 text-primary"
            >
              <FolderKanban className="h-3 w-3" />
              {tPatterns("badge")}
            </Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              {tPatterns("title")}
            </h2>
            <p className="text-muted-foreground">{tPatterns("description")}</p>
          </div>

          <motion.div
            variants={stagger}
            className="mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {PATTERNS.map((key) => {
              const Icon = PATTERN_ICONS[key];
              return (
                <motion.div key={key} variants={fadeUp}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30">
                    <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="mb-1.5 font-semibold">
                        {tPatterns(`items.${key}.title`)}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {tPatterns(`items.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </SectionWrapper>

      <SectionDivider />

      {/* Data Flow */}
      <SectionWrapper id="dataFlow">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="space-y-12"
        >
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              variant="outline"
              className="mb-4 gap-1.5 border-primary/30 px-3 py-1 text-primary"
            >
              <MessageSquare className="h-3 w-3" />
              {tDataFlow("badge")}
            </Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              {tDataFlow("title")}
            </h2>
            <p className="text-muted-foreground">{tDataFlow("description")}</p>
          </div>

          <motion.div
            variants={stagger}
            className="mx-auto grid gap-8 lg:grid-cols-3"
          >
            {FLOWS.map((flowKey) => {
              const Icon = FLOW_ICONS[flowKey];
              const steps = [0, 1, 2, 3].map((i) =>
                tDataFlow(`flows.${flowKey}.steps.${i}`),
              );

              return (
                <motion.div key={flowKey} variants={fadeUp}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30">
                    <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="mb-4 font-semibold">
                        {tDataFlow(`flows.${flowKey}.title`)}
                      </h3>
                      <ol className="flex flex-col gap-2">
                        {steps.map((step, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10 font-mono text-xs font-medium text-primary">
                              {i + 1}
                            </span>
                            <span className="flex-1">{step}</span>
                            {i < steps.length - 1 && (
                              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary/50" />
                            )}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </SectionWrapper>

      <SectionDivider />

      {/* Decisions */}
      <SectionWrapper id="decisions" variant="alternate">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="space-y-12"
        >
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              variant="outline"
              className="mb-4 gap-1.5 border-primary/30 px-3 py-1 text-primary"
            >
              <Lightbulb className="h-3 w-3" />
              {tDecisions("badge")}
            </Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              {tDecisions("title")}
            </h2>
            <p className="text-muted-foreground">{tDecisions("description")}</p>
          </div>

          <motion.div
            variants={stagger}
            className="mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {DECISIONS.map((key) => (
              <motion.div key={key} variants={fadeUp}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30">
                  <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <h3 className="mb-2 font-semibold">
                      {tDecisions(`items.${key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {tDecisions(`items.${key}.reason`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </SectionWrapper>
    </div>
  );
}
