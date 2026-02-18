"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Blocks,
  Component,
  FileText,
  LayoutDashboard,
  Navigation2,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";
import { SectionWrapper } from "@/components/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { stagger } from "@/lib/animation-variants";

import type { PreviewData } from "./previews";
import { previewMap } from "./previews";
import { ComponentShowcase } from "./showcase-card";

interface ComponentEntry {
  key: string;
  name: string;
  path: string;
  description: string;
}

function CategorySection({
  id,
  icon: Icon,
  badge,
  title,
  description,
  components,
  previews,
  variant,
}: {
  id: string;
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  components: ComponentEntry[];
  previews?: Record<string, PreviewData>;
  variant: "default" | "alternate";
}) {
  return (
    <SectionWrapper id={id} variant={variant}>
      <AnimatedSection>
        <div className="mb-8 flex items-center gap-3 md:mb-12">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <Badge
              variant="outline"
              className="mb-1 border-primary/30 text-primary"
            >
              {badge}
            </Badge>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              {title}
            </h2>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <p className="mb-8 max-w-2xl text-sm text-muted-foreground md:text-base">
          {description}
        </p>
      </AnimatedSection>

      <motion.div
        className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {components.map((comp) => {
          const previewData = previews?.[comp.key];
          return (
            <ComponentShowcase
              key={comp.key}
              name={comp.name}
              path={comp.path}
              description={comp.description}
              preview={previewData?.preview}
              code={previewData?.code}
            />
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}

/** Catálogo de componentes do projeto com previews interativos e código de uso. */
export function DesignSystemPage() {
  const tHero = useTranslations("designSystemPage.hero");
  const tNav = useTranslations("designSystemPage.sectionNav");
  const tPrimitives = useTranslations("designSystemPage.primitives");
  const tLayout = useTranslations("designSystemPage.layout");
  const tFeedback = useTranslations("designSystemPage.feedback");
  const tNavigation = useTranslations("designSystemPage.navigation");
  const tContent = useTranslations("designSystemPage.contentComponents");

  const sections = [
    { id: "primitives", label: tNav("primitives") },
    { id: "layout", label: tNav("layout") },
    { id: "feedback", label: tNav("feedback") },
    { id: "navigation", label: tNav("navigation") },
    { id: "contentComponents", label: tNav("content") },
  ];

  const primitivesKeys = [
    "button",
    "badge",
    "input",
    "card",
    "separator",
    "tabs",
  ] as const;
  const layoutKeys = [
    "heroSection",
    "sectionWrapper",
    "sectionNav",
    "sectionDivider",
  ] as const;
  const feedbackKeys = [
    "animatedSection",
    "pageSkeleton",
    "scoreGauge",
    "copyFeedback",
  ] as const;
  const navigationKeys = [
    "navbar",
    "globalSearch",
    "skipLink",
    "footer",
  ] as const;
  const contentKeys = [
    "featureCard",
    "stepCard",
    "codeBlock",
    "viewSource",
  ] as const;

  const categories = [
    {
      id: "primitives",
      icon: Blocks,
      badge: tPrimitives("badge"),
      title: tPrimitives("title"),
      description: tPrimitives("description"),
      components: primitivesKeys.map((k) => ({
        key: k,
        name: tPrimitives(`components.${k}.name`),
        path: tPrimitives(`components.${k}.path`),
        description: tPrimitives(`components.${k}.description`),
      })),
    },
    {
      id: "layout",
      icon: LayoutDashboard,
      badge: tLayout("badge"),
      title: tLayout("title"),
      description: tLayout("description"),
      components: layoutKeys.map((k) => ({
        key: k,
        name: tLayout(`components.${k}.name`),
        path: tLayout(`components.${k}.path`),
        description: tLayout(`components.${k}.description`),
      })),
    },
    {
      id: "feedback",
      icon: Bell,
      badge: tFeedback("badge"),
      title: tFeedback("title"),
      description: tFeedback("description"),
      components: feedbackKeys.map((k) => ({
        key: k,
        name: tFeedback(`components.${k}.name`),
        path: tFeedback(`components.${k}.path`),
        description: tFeedback(`components.${k}.description`),
      })),
    },
    {
      id: "navigation",
      icon: Navigation2,
      badge: tNavigation("badge"),
      title: tNavigation("title"),
      description: tNavigation("description"),
      components: navigationKeys.map((k) => ({
        key: k,
        name: tNavigation(`components.${k}.name`),
        path: tNavigation(`components.${k}.path`),
        description: tNavigation(`components.${k}.description`),
      })),
    },
    {
      id: "contentComponents",
      icon: FileText,
      badge: tContent("badge"),
      title: tContent("title"),
      description: tContent("description"),
      components: contentKeys.map((k) => ({
        key: k,
        name: tContent(`components.${k}.name`),
        path: tContent(`components.${k}.path`),
        description: tContent(`components.${k}.description`),
      })),
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={tHero("badge")}
        badgeIcon={Component}
        title={tHero("title")}
        description={tHero("description")}
        showBackLink
        backHref="/contribua"
        ctaSlot={
          <AnimatedSection delay={0.25}>
            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById("primitives")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="gap-2 rounded-full"
            >
              {tHero("cta")}
            </Button>
          </AnimatedSection>
        }
      />

      <SectionNav sections={sections} triggerId="primitives" />

      {categories.map((cat, i) => (
        <div key={cat.id}>
          <CategorySection
            {...cat}
            previews={previewMap[cat.id]}
            variant={i % 2 === 1 ? "alternate" : "default"}
          />
          {i < categories.length - 1 && <SectionDivider />}
        </div>
      ))}
    </div>
  );
}
