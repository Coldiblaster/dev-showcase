import { AlertTriangle, ArrowLeft, LucideIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";

/**
 * Hero de sessão extensível com badge, título, descrição, warning e slots customizáveis.
 * Permite children para customizações (ex: CTAs, stats, social links).
 */
export function HeroSection({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  description,
  warning,
  backHref = "/",
  showBackLink = true,
  children,
  badgeSlot,
  titleSlot,
  descriptionSlot,
  ctaSlot,
  statsSlot,
  socialSlot,
}: {
  badge: string;
  badgeIcon: LucideIcon;
  title: string;
  subtitle?: string;
  description: string;
  warning?: string;
  backHref?: string;
  showBackLink?: boolean;
  children?: ReactNode;
  badgeSlot?: ReactNode;
  titleSlot?: ReactNode;
  descriptionSlot?: ReactNode;
  ctaSlot?: ReactNode;
  statsSlot?: ReactNode;
  socialSlot?: ReactNode;
}) {
  const t = useTranslations("global.pageHero");
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23fff' stroke-width='.5'/%3E%3C/svg%3E\")",
        }}
      />
      <section className="relative flex min-h-[90dvh] flex-col justify-center overflow-hidden px-6 pt-24 pb-16 md:min-h-screen md:py-32">
        {/* Animated grid background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          {showBackLink && (
            <AnimatedSection>
              <Link
                href={backHref}
                className="mb-8 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {t("back")}
              </Link>
            </AnimatedSection>
          )}
          <AnimatedSection delay={0.1}>
            {badgeSlot ?? (
              <Badge
                variant="outline"
                className="mb-6 gap-1.5 border-primary/30 px-3 py-1 text-primary"
              >
                <BadgeIcon className="h-3 w-3" />
                {badge}
              </Badge>
            )}
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            {titleSlot ?? (
              <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                {title}
              </h1>
            )}
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            {subtitle && (
              <p className="mb-2 font-mono text-xs text-primary md:mb-4 md:text-base">
                {subtitle}
              </p>
            )}
            {descriptionSlot ?? (
              <p className="mx-auto mb-8 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </AnimatedSection>
          {ctaSlot}
          {statsSlot}
          {socialSlot}
          {children}
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
    </>
  );
}
