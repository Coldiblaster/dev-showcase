"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp } from "@/lib/animation-variants";

/**
 * Seção com link para repositório GitHub.
 * 
 * Convida usuários a usar o template.
 */
export function GitHubRepo() {
  const t = useTranslations("i18nPage.github");
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Github className="h-8 w-8 text-primary" />
                </motion.div>

                <motion.h2
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.3 }}
                  className="mb-3 text-2xl font-bold text-foreground md:text-3xl"
                >
                  {t("title")}
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.4 }}
                  className="mb-8 max-w-2xl text-muted-foreground"
                >
                  {t("description")}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-3 justify-center"
                >
                  <Button size="lg" className="gap-2" asChild>
                    <a
                      href="https://github.com/vinibastazini/nextjs-i18n-starter"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5" />
                      {t("viewGithub")}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>

                  <Button size="lg" variant="outline" className="gap-2" asChild>
                    <a
                      href="https://github.com/vinibastazini/nextjs-i18n-starter"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Star className="h-5 w-5" />
                      {t("giveStar")}
                    </a>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                  className="mt-8 flex flex-wrap gap-4 justify-center text-sm text-muted-foreground"
                >
                  {["TypeScript", "Next.js 14+", "next-intl", "DeepL API"].map((tech) => (
                    <div key={tech} className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      {tech}
                    </div>
                  ))}
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
