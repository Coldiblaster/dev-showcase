"use client";

import { FolderTree } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { FileTree, type TreeNode } from "@/components/file-tree";
import { SectionHeader } from "@/components/section-header";

export function LayoutStructureSection() {
  const t = useTranslations("nextjsAppRouterPage.structure");

  const tree: TreeNode[] = [
    {
      name: "app/",
      description: t("tree.app"),
      children: [
        {
          name: "layout.tsx",
          description: t("tree.layoutGlobal"),
        },
        { name: "page.tsx", description: t("tree.pageRoot") },
        {
          name: "dashboard/",
          description: t("tree.dashboardFolder"),
          children: [
            { name: "layout.tsx", description: t("tree.layoutSegment") },
            { name: "page.tsx", description: t("tree.pageDashboard") },
          ],
        },
        {
          name: "blog/",
          description: t("tree.blogFolder"),
          children: [{ name: "page.tsx", description: t("tree.pageBlog") }],
        },
      ],
    },
  ];

  return (
    <section id="structure" className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeader
            icon={FolderTree}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="mb-6 max-w-2xl space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("description")}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground/90 md:text-base">
              {t("inPractice")}
            </p>
          </div>
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
