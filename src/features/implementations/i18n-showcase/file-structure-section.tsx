"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { useSectionInView } from "@/hooks/use-section-in-view";

import { FILE_STRUCTURE_TREE } from "./examples";

/**
 * Seção de estrutura de arquivos.
 *
 * Exibe a árvore de diretórios do projeto i18n.
 */
export function FileStructure() {
  const t = useTranslations("i18nPage");
  const { ref, isInView } = useSectionInView();

  return (
    <section
      ref={ref}
      id="file-structure"
      className="px-4 py-12 md:px-6 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12 text-center"
        >
          <h2 className="mb-2 text-2xl font-bold text-foreground md:text-4xl">
            {t("structure.title")}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            {t("structure.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <p className="mb-6 text-center leading-relaxed text-muted-foreground">
            {t("structure.description")}
          </p>
          <CodeBlock code={FILE_STRUCTURE_TREE} title="Estrutura do projeto" />
        </motion.div>
      </div>
    </section>
  );
}
