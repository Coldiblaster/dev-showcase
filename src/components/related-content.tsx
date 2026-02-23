"use client";

import { BookOpen, Code2, Wrench } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CONTENT_ITEMS, type ContentCategory } from "@/data/content";
import { getCategoryPath } from "@/lib/content-paths";

interface RelatedContentProps {
  currentSlug: string;
  currentCategory: ContentCategory;
}

const CATEGORY_ICON: Record<ContentCategory, React.ElementType> = {
  guide: BookOpen,
  implementation: Code2,
  tool: Wrench,
};

/** Exibe até 3 conteúdos da mesma categoria ao final de um conteúdo.
 *  Ordem: os imediatamente adjacentes no array CONTENT_ITEMS, excluindo o atual. */
export function RelatedContent({
  currentSlug,
  currentCategory,
}: RelatedContentProps) {
  const t = useTranslations("global");

  const related = CONTENT_ITEMS.filter(
    (item) => item.category === currentCategory && item.slug !== currentSlug,
  ).slice(0, 3);

  if (related.length === 0) return null;

  const Icon = CATEGORY_ICON[currentCategory];

  return (
    <AnimatedSection>
      <div className="mt-12 border-t border-border pt-10">
        <div className="mb-5 flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">
            {t("relatedContent")}
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {related.map((item, i) => {
            const href = `/${getCategoryPath(item.category)}/${item.slug}`;
            return (
              <AnimatedSection key={item.slug} delay={i * 0.06}>
                <Link
                  href={href}
                  className="group flex flex-col gap-1.5 rounded-xl border border-border/60 bg-card/50 p-4 transition-colors hover:border-primary/40 hover:bg-card"
                >
                  <span className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-primary">
                    {item.title}
                  </span>
                  <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </span>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
