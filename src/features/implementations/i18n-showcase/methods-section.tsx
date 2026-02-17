"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18nShowcaseData } from "@/data/i18n-showcase-data";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

/**
 * Seção de métodos do next-intl.
 * 
 * Showcase dos principais métodos com exemplos de código.
 */
export function Methods() {
  const t = useTranslations("i18nPage");
  const { ref, isInView } = useSectionInView();
  const showcase = useI18nShowcaseData();

  return (
    <section ref={ref} className="px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="mb-8 md:mb-12 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="mb-2 text-2xl font-bold text-foreground md:text-4xl"
          >
            {t("methods.title")}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm md:text-base text-muted-foreground">
            {t("methods.subtitle")}
          </motion.p>
        </motion.div>

        <Tabs defaultValue="useTranslations" className="w-full">
          <TabsList className="mb-8 flex w-full flex-wrap gap-2 bg-transparent h-auto">
            {showcase.map((m) => (
              <TabsTrigger
                key={m.title}
                value={m.title}
                className="gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs data-[state=active]:border-primary/50 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                {m.icon && <m.icon className="h-3.5 w-3.5" />}
                {m.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {showcase.map((m) => (
            <TabsContent key={m.title} value={m.title}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid gap-4 md:gap-6 lg:grid-cols-[1fr_1.2fr]"
              >
                <div className="flex flex-col justify-center">
                  <Badge
                    variant="outline"
                    className="mb-4 w-fit border-primary/30 text-primary"
                  >
                    {m.badge}
                  </Badge>
                  <h3 className="mb-3 font-mono text-xl font-bold text-foreground">
                    {m.title}
                  </h3>
                  <p className="leading-relaxed text-sm md:text-base text-muted-foreground">
                    {m.description}
                  </p>
                </div>
                <CodeBlock
                  code={m.code}
                  title={
                    m.title.includes("(")
                      ? m.title.replace("()", ".tsx")
                      : "example.tsx"
                  }
                />
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
