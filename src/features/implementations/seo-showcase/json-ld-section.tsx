"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

const jsonLdCode = `const personSchema = {
  "@type": "Person",
  name: "Vinicius Bastazin Araujo",
  url: SITE_URL,
  jobTitle: "Desenvolvedor Frontend Senior",
  sameAs: [
    "https://github.com/Coldiblaster",
    "https://www.linkedin.com/in/vbastazin/",
  ],
  knowsAbout: [
    "React", "Next.js", "TypeScript",
    "React Native", "Tailwind CSS", "Node.js",
  ],
  image: \`\${SITE_URL}/avatar-desk.png\`,
};

const websiteSchema = {
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  author: { "@type": "Person", name: SITE_AUTHOR },
  inLanguage: ["pt-BR", "en", "es", "de"],
};

// Injetado no <head> via layout.tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [personSchema, websiteSchema],
    }),
  }}
/>`;

export function JsonLdSection() {
  const t = useTranslations("seoPage");
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-muted/30 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 max-w-2xl">
            <h2 className="mb-3 text-3xl font-bold text-foreground">
              {t("jsonLd.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("jsonLd.description")}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-6">
            <CodeBlock title={t("jsonLd.codeTitle")} code={jsonLdCode} />
          </motion.div>

          <motion.div variants={fadeUp}>
            <Button variant="outline" className="gap-2" asChild>
              <a
                href="https://search.google.com/test/rich-results"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                {t("jsonLd.testLabel")}
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
