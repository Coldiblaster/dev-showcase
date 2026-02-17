"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

const ogCode = `import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const avatar = await readFile(
    join(process.cwd(), "public", "avatar-desk.png"),
  );
  const src = \`data:image/png;base64,\${avatar.toString("base64")}\`;

  return new ImageResponse(
    <div style={{ /* dark bg, avatar, name, skills */ }}>
      <img src={src} width={280} height={280} />
      <h1>Vinicius Bastazin</h1>
      <p>Desenvolvedor Frontend Senior</p>
      {skills.map(s => <span>{s}</span>)}
    </div>,
    { ...size },
  );
}`;

export function OgImageSection() {
  const t = useTranslations("seoPage");
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 max-w-2xl">
            <h2 className="mb-3 text-3xl font-bold text-foreground">
              {t("ogImage.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("ogImage.description")}
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div variants={fadeUp}>
              <CodeBlock title={t("ogImage.codeTitle")} code={ogCode} />
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
