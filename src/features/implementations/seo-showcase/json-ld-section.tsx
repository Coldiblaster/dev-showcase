"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

import { JSON_LD_CODE } from "./examples";

export function JsonLdSection() {
  const t = useTranslations("seoPage");
  const { ref, isInView } = useSectionInView();

  return (
    <section
      ref={ref}
      className="bg-muted/30 px-4 py-12 md:px-6 md:py-24 bg-secondary/20"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 max-w-2xl">
            <h2 className="mb-3 text-2xl font-bold text-foreground">
              {t("jsonLd.title")}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              {t("jsonLd.description")}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-6">
            <CodeBlock title={t("jsonLd.codeTitle")} code={JSON_LD_CODE} />
          </motion.div>

          <motion.div variants={fadeUp}>
            <Button variant="outline" className="gap-2" asChild>
              <a
                href="https://search.google.com/test/rich-results"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                {t("jsonLd.testLabel")}
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
