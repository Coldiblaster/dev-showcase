"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

import { ROBOTS_CODE, SITEMAP_CODE } from "./examples";

export function SitemapSection() {
  const t = useTranslations("seoPage");
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} id="sitemap" className="px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 max-w-2xl">
            <h2 className="mb-3 text-2xl font-bold text-foreground">
              {t("sitemap.title")}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              {t("sitemap.description")}
            </p>
          </motion.div>

          <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
            <motion.div variants={fadeUp}>
              <CodeBlock
                title={t("sitemap.sitemapTitle")}
                code={SITEMAP_CODE}
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <CodeBlock title={t("sitemap.robotsTitle")} code={ROBOTS_CODE} />
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2" asChild>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                {t("sitemap.inspectSitemap")}
              </a>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <a href="/robots.txt" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                {t("sitemap.inspectRobots")}
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
