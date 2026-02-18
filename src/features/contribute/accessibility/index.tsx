"use client";

import { motion } from "framer-motion";
import {
  Accessibility,
  CheckCircle2,
  Code2,
  Contrast,
  ExternalLink,
  Eye,
  Focus,
  Keyboard,
  MonitorSmartphone,
  Palette,
  Search,
  Shield,
  SkipForward,
  Tags,
  Type,
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

const FEATURE_KEYS = [
  "skipLink",
  "semanticHtml",
  "ariaRoles",
  "keyboardNav",
  "focusManagement",
  "colorContrast",
  "responsiveText",
  "reducedMotion",
] as const;

const FEATURE_ICONS: Record<(typeof FEATURE_KEYS)[number], typeof SkipForward> =
  {
    skipLink: SkipForward,
    semanticHtml: Code2,
    ariaRoles: Tags,
    keyboardNav: Keyboard,
    focusManagement: Focus,
    colorContrast: Palette,
    responsiveText: Type,
    reducedMotion: Eye,
  };

const CHECKLIST_KEYS = [
  "semantics",
  "headings",
  "altText",
  "ariaLabels",
  "keyboard",
  "focus",
  "contrast",
  "motion",
  "forms",
  "errors",
] as const;

const TOOL_KEYS = [
  "lighthouse",
  "axe",
  "screenReader",
  "tabTest",
  "contrastChecker",
] as const;

const TOOL_ICONS: Record<(typeof TOOL_KEYS)[number], typeof Search> = {
  lighthouse: Search,
  axe: Shield,
  screenReader: MonitorSmartphone,
  tabTest: Keyboard,
  contrastChecker: Contrast,
};

const GUIDELINE_KEYS = ["wcag", "waiAria", "a11yProject"] as const;

/** Página de Acessibilidade — recursos implementados, checklist, ferramentas e diretrizes. */
export function AccessibilityPage() {
  const tNav = useTranslations("accessibilityPage.sectionNav");
  const tHero = useTranslations("accessibilityPage.hero");
  const tFeatures = useTranslations("accessibilityPage.features");
  const tChecklist = useTranslations("accessibilityPage.checklist");
  const tTools = useTranslations("accessibilityPage.tools");
  const tGuidelines = useTranslations("accessibilityPage.guidelines");

  const sections = [
    { id: "features", label: tNav("features") },
    { id: "checklist", label: tNav("checklist") },
    { id: "tools", label: tNav("tools") },
    { id: "guidelines", label: tNav("guidelines") },
  ];

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={tHero("badge")}
        badgeIcon={Accessibility}
        title={tHero("title")}
        description={tHero("description")}
        showBackLink
        backHref="/contribua"
        ctaSlot={
          <AnimatedSection delay={0.25}>
            <Button
              size="lg"
              onClick={scrollToFeatures}
              className="gap-2 rounded-full"
            >
              <Accessibility className="h-4 w-4" />
              {tHero("cta")}
            </Button>
          </AnimatedSection>
        }
      />

      <SectionNav sections={sections} triggerId="features" />
      <SectionDivider />

      {/* Features */}
      <SectionWrapper id="features">
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
              <Accessibility className="h-3 w-3" />
              {tFeatures("badge")}
            </Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              {tFeatures("title")}
            </h2>
            <p className="text-muted-foreground">{tFeatures("description")}</p>
          </div>

          <motion.div
            variants={stagger}
            className="mx-auto grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {FEATURE_KEYS.map((key) => {
              const Icon = FEATURE_ICONS[key];
              return (
                <motion.div key={key} variants={fadeUp}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30">
                    <div className="relative">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="mb-1.5 font-semibold">
                        {tFeatures(`items.${key}.title`)}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {tFeatures(`items.${key}.description`)}
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

      {/* Checklist */}
      <SectionWrapper id="checklist" variant="alternate">
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
              <CheckCircle2 className="h-3 w-3" />
              {tChecklist("badge")}
            </Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              {tChecklist("title")}
            </h2>
            <p className="text-muted-foreground">{tChecklist("description")}</p>
          </div>

          <motion.div
            variants={stagger}
            role="list"
            className="mx-auto grid gap-4 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm sm:grid-cols-2"
          >
            {CHECKLIST_KEYS.map((key) => (
              <motion.div
                key={key}
                variants={fadeUp}
                role="listitem"
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {tChecklist(`items.${key}`)}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </SectionWrapper>

      <SectionDivider />

      {/* Tools */}
      <SectionWrapper id="tools">
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
              <Search className="h-3 w-3" />
              {tTools("badge")}
            </Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              {tTools("title")}
            </h2>
            <p className="text-muted-foreground">{tTools("description")}</p>
          </div>

          <motion.div
            variants={stagger}
            className="mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {TOOL_KEYS.map((key) => {
              const Icon = TOOL_ICONS[key];
              return (
                <motion.div key={key} variants={fadeUp}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30">
                    <div className="relative">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="mb-1.5 font-semibold">
                        {tTools(`items.${key}.title`)}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {tTools(`items.${key}.description`)}
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

      {/* Guidelines */}
      <SectionWrapper id="guidelines" variant="alternate">
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
              <ExternalLink className="h-3 w-3" />
              {tGuidelines("badge")}
            </Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              {tGuidelines("title")}
            </h2>
            <p className="text-muted-foreground">
              {tGuidelines("description")}
            </p>
          </div>

          <motion.div
            variants={stagger}
            className="mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {GUIDELINE_KEYS.map((key) => (
              <motion.div key={key} variants={fadeUp}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30">
                  <div className="relative flex items-start gap-3">
                    <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-primary/70" />
                    <div>
                      <h3 className="mb-1.5 font-semibold">
                        {tGuidelines(`items.${key}.title`)}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {tGuidelines(`items.${key}.description`)}
                      </p>
                    </div>
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
