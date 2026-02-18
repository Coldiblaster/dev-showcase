"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Bot,
  Cloud,
  Globe,
  Languages,
  Paintbrush,
  TestTube,
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

interface LibCard {
  name: string;
  version: string;
  description: string;
  why: string;
}

function LibCategorySection({
  id,
  icon: Icon,
  badge,
  title,
  description,
  libs,
  variant,
}: {
  id: string;
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  libs: LibCard[];
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
        className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {libs.map((lib) => (
          <motion.div
            key={lib.name}
            variants={fadeUp}
            className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold text-foreground">{lib.name}</h3>
              <Badge variant="outline" className="text-xs">
                {lib.version}
              </Badge>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              {lib.description}
            </p>
            <p className="text-xs text-muted-foreground/80">{lib.why}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

/** Grid de tecnologias do projeto com versões, categorias e motivação. */
export function TechStackPage() {
  const tHero = useTranslations("techStackPage.hero");
  const tNav = useTranslations("techStackPage.sectionNav");
  const tFramework = useTranslations("techStackPage.categories.framework");
  const tUi = useTranslations("techStackPage.categories.ui");
  const tI18n = useTranslations("techStackPage.categories.i18n");
  const tAi = useTranslations("techStackPage.categories.ai");
  const tDevTools = useTranslations("techStackPage.categories.devTools");
  const tTesting = useTranslations("techStackPage.categories.testing");
  const tDeploy = useTranslations("techStackPage.categories.deploy");

  const sections = [
    { id: "framework", label: tNav("framework") },
    { id: "ui", label: tNav("ui") },
    { id: "i18n", label: tNav("i18n") },
    { id: "ai", label: tNav("ai") },
    { id: "devTools", label: tNav("devTools") },
    { id: "testing", label: tNav("testing") },
    { id: "deploy", label: tNav("deploy") },
  ];

  const toLib = (
    t: ReturnType<typeof useTranslations>,
    k: string,
  ): LibCard => ({
    name: t(`libs.${k}.name` as never),
    version: t(`libs.${k}.version` as never),
    description: t(`libs.${k}.description` as never),
    why: t(`libs.${k}.why` as never),
  });

  const categories = [
    {
      id: "framework",
      icon: Globe,
      badge: tFramework("badge"),
      title: tFramework("title"),
      description: tFramework("description"),
      libs: (["next", "react", "typescript"] as const).map((k) =>
        toLib(tFramework, k),
      ),
    },
    {
      id: "ui",
      icon: Paintbrush,
      badge: tUi("badge"),
      title: tUi("title"),
      description: tUi("description"),
      libs: (
        [
          "tailwind",
          "radix",
          "framerMotion",
          "lucide",
          "cva",
          "shadcn",
        ] as const
      ).map((k) => toLib(tUi, k)),
    },
    {
      id: "i18n",
      icon: Languages,
      badge: tI18n("badge"),
      title: tI18n("title"),
      description: tI18n("description"),
      libs: (["nextIntl", "deepl"] as const).map((k) => toLib(tI18n, k)),
    },
    {
      id: "ai",
      icon: Bot,
      badge: tAi("badge"),
      title: tAi("title"),
      description: tAi("description"),
      libs: (["openai", "resend", "zod"] as const).map((k) => toLib(tAi, k)),
    },
    {
      id: "devTools",
      icon: Wrench,
      badge: tDevTools("badge"),
      title: tDevTools("title"),
      description: tDevTools("description"),
      libs: (["eslint", "prettier", "husky", "commitlint"] as const).map((k) =>
        toLib(tDevTools, k),
      ),
    },
    {
      id: "testing",
      icon: TestTube,
      badge: tTesting("badge"),
      title: tTesting("title"),
      description: tTesting("description"),
      libs: (["vitest", "testingLibrary"] as const).map((k) =>
        toLib(tTesting, k),
      ),
    },
    {
      id: "deploy",
      icon: Cloud,
      badge: tDeploy("badge"),
      title: tDeploy("title"),
      description: tDeploy("description"),
      libs: (["vercel", "vercelAnalytics"] as const).map((k) =>
        toLib(tDeploy, k),
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={tHero("badge")}
        badgeIcon={Blocks}
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
                  .getElementById("framework")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="gap-2 rounded-full"
            >
              {tHero("cta")}
            </Button>
          </AnimatedSection>
        }
      />

      <SectionNav sections={sections} triggerId="framework" />

      {categories.map((cat, i) => (
        <div key={cat.id}>
          <LibCategorySection
            {...cat}
            variant={i % 2 === 1 ? "alternate" : "default"}
          />
          {i < categories.length - 1 && <SectionDivider />}
        </div>
      ))}
    </div>
  );
}
