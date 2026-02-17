"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

import { SYSTEM_PROMPT_EXAMPLE } from "./examples";

export function SystemPromptSection() {
  const t = useTranslations("aiChatbotPage");
  const { ref, isInView } = useSectionInView();
  const tips = t.raw("systemPrompt.tips") as string[];

  return (
    <section ref={ref} className="bg-secondary/20 px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 max-w-2xl md:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-4xl">
              {t("systemPrompt.title")}
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              {t("systemPrompt.description")}
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <motion.div variants={fadeUp}>
              <CodeBlock
                title={t("systemPrompt.codeTitle")}
                code={SYSTEM_PROMPT_EXAMPLE}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3 className="mb-4 text-base font-semibold text-foreground md:text-lg">
                Dicas para um bom prompt
              </h3>
              <div className="flex flex-col gap-3">
                {tips.map((tip, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-3 md:p-4"
                  >
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
