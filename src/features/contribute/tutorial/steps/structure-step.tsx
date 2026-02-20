"use client";

import { FolderTree } from "lucide-react";
import { useTranslations } from "next-intl";

import { FileTree, type TreeNode } from "@/components/file-tree";

import { FaqSection } from "../faq-section";
import { TutorialStep } from "../tutorial-step";

interface StepNavProps {
  nextStepId?: string;
  nextStepLabel?: string;
}

export function StructureStep({ nextStepId, nextStepLabel }: StepNavProps) {
  const t = useTranslations("tutorialPage.steps.structure");
  const tPage = useTranslations("tutorialPage");

  const tree: TreeNode[] = [
    {
      name: "src/",
      description: t("tree.src"),
      children: [
        {
          name: "app/",
          description: t("tree.app"),
          children: [
            { name: "contribua/", description: t("tree.contribute") },
            { name: "implementacoes/", description: "" },
            { name: "dicas/", description: "" },
            { name: "ferramentas/", description: "" },
            { name: "api/", description: "" },
            { name: "layout.tsx", description: "" },
            { name: "page.tsx", description: "" },
            { name: "globals.css", description: "" },
          ],
        },
        {
          name: "components/",
          description: t("tree.components"),
          children: [
            { name: "ui/", description: t("tree.ui") },
            { name: "navbar/", description: "" },
            { name: "hero-section.tsx", description: "" },
            { name: "code-block.tsx", description: "" },
            { name: "animated-section.tsx", description: "" },
          ],
        },
        {
          name: "features/",
          description: t("tree.features"),
          children: [
            { name: "contribute/", description: t("tree.contribute") },
            { name: "implementations/", description: "" },
            { name: "guides/", description: "" },
            { name: "home/", description: "" },
          ],
        },
        {
          name: "lib/",
          description: t("tree.lib"),
          children: [
            {
              name: "dynamic-page-helper.tsx",
              description: t("tree.dynamicHelper"),
            },
          ],
        },
        { name: "hooks/", description: t("tree.hooks") },
        {
          name: "data/",
          description: t("tree.data"),
          children: [{ name: "content.ts", description: "" }],
        },
      ],
    },
    {
      name: "messages/",
      description: t("tree.messages"),
      children: [
        { name: "pt-BR/", description: "" },
        { name: "en/", description: "" },
        { name: "es/", description: "" },
        { name: "de/", description: "" },
      ],
    },
    { name: "public/", description: t("tree.public") },
  ];

  const faqItems = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
  ];

  return (
    <TutorialStep
      id="structure"
      step={2}
      icon={FolderTree}
      title={t("title")}
      description={t("description")}
      faq={<FaqSection items={faqItems} />}
      nextStepId={nextStepId}
      nextStepLabel={nextStepLabel}
    >
      <p className="mb-4 text-sm text-muted-foreground">{t("intro")}</p>
      <FileTree nodes={tree} ariaLabel={tPage("fileTreeAriaLabel")} />
    </TutorialStep>
  );
}
