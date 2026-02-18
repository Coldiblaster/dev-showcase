"use client";

import { motion } from "framer-motion";
import {
  Accessibility,
  ArrowRight,
  Blocks,
  BookOpen,
  Component,
  FileCode,
  Layers,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { SectionWrapper } from "@/components/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fadeUp, stagger } from "@/lib/animation-variants";

interface SubPage {
  icon: LucideIcon;
  labelKey: string;
  descKey: string;
  href: string;
}

const SUB_PAGES: SubPage[] = [
  {
    icon: BookOpen,
    labelKey: "tutorial",
    descKey: "tutorialDesc",
    href: "/contribua/tutorial",
  },
  {
    icon: Layers,
    labelKey: "architecture",
    descKey: "architectureDesc",
    href: "/contribua/arquitetura",
  },
  {
    icon: Blocks,
    labelKey: "contribTechStack",
    descKey: "contribTechStackDesc",
    href: "/contribua/tech-stack",
  },
  {
    icon: Component,
    labelKey: "designSystem",
    descKey: "designSystemDesc",
    href: "/contribua/design-system",
  },
  {
    icon: FileCode,
    labelKey: "apiReference",
    descKey: "apiReferenceDesc",
    href: "/contribua/api",
  },
  {
    icon: Accessibility,
    labelKey: "a11y",
    descKey: "a11yDesc",
    href: "/contribua/acessibilidade",
  },
];

/** Grid de cards com links para todas as sub-páginas do Contribua. */
export function ExploreSection() {
  const tNav = useTranslations("nav");
  const t = useTranslations("contributePage.explore");

  return (
    <SectionWrapper id="explore">
      <AnimatedSection>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-4 gap-1.5 border-primary/30 px-3 py-1 text-primary"
          >
            <Layers className="h-3 w-3" />
            {t("badge")}
          </Badge>
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
      </AnimatedSection>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SUB_PAGES.map((page) => {
          const Icon = page.icon;
          return (
            <motion.div key={page.href} variants={fadeUp}>
              <Link href={page.href} className="group block h-full">
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-md group-hover:shadow-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="flex items-center justify-between text-base">
                      <span className="transition-colors group-hover:text-primary">
                        {tNav(page.labelKey as never)}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {tNav(page.descKey as never)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
