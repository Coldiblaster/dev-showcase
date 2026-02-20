"use client";

import { FolderTree } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { FileTree, type TreeNode } from "@/components/file-tree";
import { SectionHeader } from "@/components/section-header";

export function StructureSection() {
  const t = useTranslations("testingPage.structure");

  const tree: TreeNode[] = [
    {
      name: "src/",
      description: t("tree.src"),
      children: [
        {
          name: "lib/",
          description: t("tree.lib"),
          children: [
            {
              name: "i18n/",
              description: t("tree.i18n"),
              children: [
                { name: "__tests__/", description: t("tree.testsFolder") },
                { name: "config.ts", description: t("tree.configTs") },
              ],
            },
          ],
        },
        { name: "components/", description: t("tree.components") },
        { name: "hooks/", description: t("tree.hooks") },
      ],
    },
    {
      name: "scripts/",
      description: t("tree.scripts"),
      children: [
        { name: "__tests__/", description: t("tree.scriptsTests") },
        { name: "validate-i18n.ts", description: t("tree.validateI18n") },
      ],
    },
  ];

  return (
    <section
      id="structure"
      className="px-4 py-12 md:px-6 md:py-20"
      role="region"
      aria-labelledby="structure-heading"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div id="structure-heading">
            <SectionHeader
              icon={FolderTree}
              title={t("title")}
              subtitle={t("subtitle")}
            />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.05}>
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {t("description")}
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <p className="mb-3 text-sm font-medium text-foreground">
            {t("introTree")}
          </p>
          <FileTree
            nodes={tree}
            ariaLabel={t("fileTreeAriaLabel")}
            className="max-w-md"
          />
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <p className="mt-6 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm italic text-muted-foreground">
            {t("tip")}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
