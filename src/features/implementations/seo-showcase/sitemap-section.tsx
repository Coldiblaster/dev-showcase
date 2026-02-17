"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

const sitemapCode = `import { CONTENT_ITEMS } from "@/data/content";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: SITE_URL, priority: 1 },
    { url: \`\${SITE_URL}/implementacoes\`, priority: 0.8 },
    { url: \`\${SITE_URL}/dicas\`, priority: 0.8 },
  ];

  const dynamicPages = CONTENT_ITEMS.map((item) => ({
    url: \`\${SITE_URL}/\${prefix}/\${item.slug}\`,
    priority: 0.7,
  }));

  return [...staticPages, ...dynamicPages];
}`;

const robotsCode = `export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: \`\${SITE_URL}/sitemap.xml\`,
  };
}`;

export function SitemapSection() {
  const t = useTranslations("seoPage");
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="px-4 py-12 md:px-6 md:py-24">
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
                code={sitemapCode}
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <CodeBlock
                title={t("sitemap.robotsTitle")}
                code={robotsCode}
              />
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
