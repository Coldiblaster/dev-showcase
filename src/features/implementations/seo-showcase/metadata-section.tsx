"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

const layoutCode = `export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: \`\${SITE_NAME} | Desenvolvedor Frontend Senior\`,
    template: \`%s | \${SITE_NAME}\`,
  },
  description: "Portfolio de Vinicius Bastazin Araujo...",
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: \`\${SITE_NAME} — Desenvolvedor Frontend\`,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES", "de_DE"],
  },
  twitter: { card: "summary_large_image" },
  verification: { google: "OAX_26lbl..." },
};`;

const helperCode = `export function buildPageMetadata(page: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = \`\${SITE_URL}\${page.path ?? ""}\`;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "pt_BR",
    },
  };
}`;

export function MetadataSection() {
  const t = useTranslations("seoPage");
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-muted/30 px-4 py-12 md:px-6 md:py-24 bg-secondary/20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 max-w-2xl">
            <h2 className="mb-3 text-2xl font-bold text-foreground">
              {t("metadata.title")}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              {t("metadata.description")}
            </p>
          </motion.div>

          <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
            <motion.div variants={fadeUp}>
              <CodeBlock title={t("metadata.codeTitle")} code={layoutCode} />
            </motion.div>
            <motion.div variants={fadeUp}>
              <CodeBlock title={t("metadata.helperTitle")} code={helperCode} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
