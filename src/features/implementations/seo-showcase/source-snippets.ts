export const METADATA_SECTION_SOURCE = `"use client";

import { motion } from "framer-motion";
import { FileCode } from "lucide-react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

import { LAYOUT_CODE } from "./examples";

export function MetadataSection() {
  const t = useTranslations("seoPage");
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={stagger}>
          <SectionHeader icon={FileCode} title={t("metadata.title")} subtitle={t("metadata.subtitle")} />
          <motion.p variants={fadeUp} className="mb-8 text-muted-foreground">
            {t("metadata.description")}
          </motion.p>
          <motion.div variants={fadeUp}>
            <CodeBlock title="src/app/layout.tsx" code={LAYOUT_CODE} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}`;

export const JSON_LD_SECTION_SOURCE = `"use client";

import { motion } from "framer-motion";
import { Braces } from "lucide-react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

import { JSON_LD_CODE } from "./examples";

export function JsonLdSection() {
  const t = useTranslations("seoPage");
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-muted/10 px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={stagger}>
          <SectionHeader icon={Braces} title={t("jsonLd.title")} subtitle={t("jsonLd.subtitle")} />
          <motion.p variants={fadeUp} className="mb-8 text-muted-foreground">
            {t("jsonLd.description")}
          </motion.p>
          <motion.div variants={fadeUp}>
            <CodeBlock title="src/components/json-ld.tsx" code={JSON_LD_CODE} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}`;

export const HERO_SECTION_SOURCE = `"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { fadeUp, stagger } from "@/lib/animation-variants";

export function SeoHero() {
  const t = useTranslations("seoPage");

  return (
    <section className="relative overflow-hidden px-4 py-20 md:px-6 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <Link href="/implementacoes" className="inline-flex items-center gap-1 text-sm ...">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <Badge variant="secondary" className="mb-6 gap-2">
            <Search className="h-3.5 w-3.5" /> {t("hero.badge")}
          </Badge>
          <motion.h1 variants={fadeUp} className="text-4xl font-bold ...">
            {t("hero.title")}
          </motion.h1>
          ...
        </motion.div>
      </div>
    </section>
  );
}`;

export const RATE_LIMIT_SOURCE = `// src/lib/rate-limit.ts
const store = new Map<string, { count: number; resetAt: number }>();

export function getClientIp(request: Request): string {
  const headers = new Headers(request.headers);
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? headers.get("x-real-ip") ?? "unknown";
}

export function rateLimit(identifier: string, config: {
  prefix: string; limit: number; windowSeconds: number;
}) {
  const key = \`\${config.prefix}:\${identifier}\`;
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + config.windowSeconds * 1000 });
    return { success: true, remaining: config.limit - 1 };
  }
  entry.count++;
  return {
    success: entry.count <= config.limit,
    remaining: Math.max(0, config.limit - entry.count),
  };
}`;
