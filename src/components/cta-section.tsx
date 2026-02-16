"use client";

import { motion } from "framer-motion";
import { ArrowLeft, LucideIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";

/**
 * Seção de Call-to-Action final de página.
 *
 * CTA padrão para final de páginas de conteúdo com ícone, título,
 * descrição e botão de ação. Inclui animações e hover effects.
 *
 * @param icon - Ícone do lucide-react
 * @param title - Título do CTA
 * @param description - Descrição ou chamada para ação
 * @param buttonText - Texto do botão (padrão: "Voltar ao Portfolio")
 * @param buttonHref - URL do botão (padrão: "/")
 *
 * @example
 * ```tsx
 * <CTASection
 *   icon={BookOpen}
 *   title="Quer Mais Dicas?"
 *   description="Explore outros guias práticos"
 * />
 * ```
 */
export function CTASection({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonHref = "/",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}) {
  const t = useTranslations("global.cta");
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center md:p-12">
            <Icon className="mx-auto mb-4 h-8 w-8 text-primary" />
            <h2 className="mb-3 text-2xl font-bold text-foreground">{title}</h2>
            <p className="mb-6 text-muted-foreground">{description}</p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href={buttonHref}>
                  <ArrowLeft className="h-4 w-4" />
                  {buttonText ?? t("backToPortfolio")}
                </Link>
              </Button>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
