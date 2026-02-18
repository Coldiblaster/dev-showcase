"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

import { OG_CODE } from "./examples";

export function OgImageSection() {
  const t = useTranslations("seoPage");
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} id="og-image" className="px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 max-w-2xl">
            <h2 className="mb-3 text-2xl font-bold text-foreground">
              {t("ogImage.title")}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              {t("ogImage.description")}
            </p>
          </motion.div>

          <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
            <motion.div variants={fadeUp}>
              <CodeBlock title={t("ogImage.codeTitle")} code={OG_CODE} />
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-xl border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/opengraph-image"
                  alt={t("ogImage.preview")}
                  className="w-full"
                  loading="lazy"
                />
              </div>
              <Button variant="outline" className="gap-2 self-start" asChild>
                <a
                  href="/opengraph-image"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t("ogImage.inspect")}
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
