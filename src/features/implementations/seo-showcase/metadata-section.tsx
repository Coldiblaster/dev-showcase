"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

import { HELPER_CODE, LAYOUT_CODE } from "./examples";

export function MetadataSection() {
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
              {t("metadata.title")}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              {t("metadata.description")}
            </p>
          </motion.div>

          <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
            <motion.div variants={fadeUp}>
              <CodeBlock title={t("metadata.codeTitle")} code={LAYOUT_CODE} />
            </motion.div>
            <motion.div variants={fadeUp}>
              <CodeBlock title={t("metadata.helperTitle")} code={HELPER_CODE} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
