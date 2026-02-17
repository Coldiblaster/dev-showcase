"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot } from "lucide-react";
import { useTranslations } from "next-intl";

import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

export function AiChatbotHero() {
  const t = useTranslations("aiChatbotPage");
  const { ref, isInView } = useSectionInView();

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70vh] items-center overflow-hidden pb-10 md:pb-16"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="max-w-3xl"
        >
          <HeroSection
            badge={t("hero.badge")}
            badgeIcon={Bot}
            title={t("hero.title")}
            subtitle={t("hero.subtitle")}
            description={t("hero.description")}
            badgeSlot={
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
                <span className="mb-6 inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 text-primary">
                  <Bot className="mr-1.5 h-3 w-3" />
                  {t("hero.badge")}
                </span>
              </motion.div>
            }
            titleSlot={
              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="mb-4 text-balance font-sans text-4xl font-bold tracking-tight text-foreground md:text-6xl"
              >
                {t("hero.title")}
              </motion.h1>
            }
            descriptionSlot={
              <>
                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="mb-4 text-base font-medium text-primary md:text-lg"
                >
                  {t("hero.subtitle")}
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="mb-8 max-w-2xl text-sm text-pretty leading-relaxed text-muted-foreground md:text-base"
                >
                  {t("hero.description")}
                </motion.p>
              </>
            }
            ctaSlot={
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap gap-3"
              >
                <Button asChild className="gap-2">
                  <a
                    href="https://platform.openai.com/docs/guides/text-generation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("cta.button")} <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            }
          />
        </motion.div>
      </div>
    </section>
  );
}
