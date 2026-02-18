"use client";

import { motion } from "framer-motion";
import {
  Accessibility,
  ExternalLink,
  FolderTree,
  GitCommitHorizontal,
  Globe,
  Shield,
  TestTube,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { SectionWrapper } from "@/components/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { fadeUp, stagger } from "@/lib/animation-variants";
import { REPOS } from "@/lib/constants";

const STANDARDS = [
  { key: "commits", icon: GitCommitHorizontal },
  { key: "structure", icon: FolderTree },
  { key: "i18n", icon: Globe },
  { key: "a11y", icon: Accessibility },
  { key: "quality", icon: TestTube },
] as const;

/** Cards com padrões e convenções do projeto. */
export function StandardsSection() {
  const t = useTranslations("contributePage.standards");

  return (
    <SectionWrapper id="standards" variant="alternate">
      <AnimatedSection>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-4 gap-1.5 border-primary/30 px-3 py-1 text-primary"
          >
            <Shield className="h-3 w-3" />
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
        className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {STANDARDS.map(({ key, icon: Icon }) => (
          <motion.div key={key} variants={fadeUp}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30">
              <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1.5 font-semibold">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`items.${key}.description`)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatedSection delay={0.3}>
        <div className="mt-8 text-center">
          <Link
            href={`${REPOS.devShowcase}/blob/main/docs/CONTRIBUTING.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary transition-colors hover:text-primary/80"
          >
            {t("docsLink")}
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
