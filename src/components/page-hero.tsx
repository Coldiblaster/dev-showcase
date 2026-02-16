"use client";

import { AlertTriangle, ArrowLeft, LucideIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";

/**
 * Hero de página com badge, título, descrição e warning opcional.
 *
 * Seção hero padrão para páginas de conteúdo com animações sequenciais.
 * Inclui link de voltar, badge, título, subtítulo, descrição e aviso opcional.
 *
 * @param badge - Texto do badge (ex: "Guia Prático")
 * @param badgeIcon - Ícone do badge
 * @param title - Título principal da página
 * @param subtitle - Subtítulo em destaque
 * @param description - Descrição detalhada
 * @param warning - Texto de aviso opcional (exibe box amarelo)
 * @param backHref - URL do link voltar (padrão: "/")
 *
 * @example
 * ```tsx
 * <PageHero
 *   badge="Data Fetching"
 *   badgeIcon={Database}
 *   title="React Query Essencial"
 *   subtitle="TanStack Query"
 *   description="Domine cache e mutations"
 *   warning="Requer conhecimento de React"
 * />
 * ```
 */
export function PageHero({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  description,
  warning,
  backHref = "/",
}: {
  badge: string;
  badgeIcon: LucideIcon;
  title: string;
  subtitle?: string;
  description: string;
  warning?: string;
  backHref?: string;
}) {
  const t = useTranslations("global.pageHero");
  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_50%)]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <AnimatedSection>
          <Link
            href={backHref}
            className="mb-8 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("back")}
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Badge
            variant="outline"
            className="mb-6 gap-1.5 border-primary/30 px-3 py-1 text-primary"
          >
            <BadgeIcon className="h-3 w-3" />
            {badge}
          </Badge>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            {title}
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          {subtitle && (
            <p className="mb-4 font-mono text-sm text-primary md:text-base">
              {subtitle}
            </p>
          )}
          <p className="mx-auto mb-8 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {description}
          </p>
        </AnimatedSection>

        {warning && (
          <AnimatedSection delay={0.25}>
            <div className="mx-auto max-w-2xl rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <p className="text-left text-sm leading-relaxed text-amber-200/80">
                  {warning}
                </p>
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
