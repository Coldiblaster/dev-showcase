"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

/**
 * Seção Hero do i18n showcase.
 * 
 * Hero com badge, título, descrição e CTAs para demo e documentação.
 */
export function I18nHero({ onScrollToDemo }: { onScrollToDemo: () => void }) {
  const t = useTranslations("i18nPage");
  const { ref, isInView } = useSectionInView();

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70vh] items-center overflow-hidden px-6 pt-28 pb-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23fff' stroke-width='.5'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <Badge className="mb-6 border-primary/30 bg-primary/10 text-primary">
              <Globe className="mr-1.5 h-3 w-3" />
              {t("hero.badge")}
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-4 text-balance font-sans text-4xl font-bold tracking-tight text-foreground md:text-6xl"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-4 text-lg text-primary font-medium"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-8 max-w-2xl text-pretty leading-relaxed text-muted-foreground"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <Button onClick={onScrollToDemo} className="gap-2">
              {t("hero.ctaDemo")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <a
                href="https://next-intl.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("hero.ctaDocs")}
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
