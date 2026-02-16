"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { useSectionInView } from "@/hooks/use-section-in-view";

/**
 * Seção CTA final do i18n showcase.
 */
export function CTASection() {
  const t = useTranslations("i18nPage");
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="px-6 py-24 bg-secondary/20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="mb-4 text-3xl font-bold text-foreground">
          {t("cta.title")}
        </h2>
        <p className="mb-8 leading-relaxed text-muted-foreground">
          {t("cta.description")}
        </p>
        <Button size="lg" asChild className="gap-2">
          <a href="/">
            {t("cta.button")} <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </motion.div>
    </section>
  );
}
