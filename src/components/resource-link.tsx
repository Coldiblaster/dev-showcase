"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

/**
 * Link externo com animação e ícone.
 *
 * Card clicável para recursos externos (documentação, ferramentas, etc).
 * Inclui animação hover e ícone de link externo.
 *
 * @param href - URL do recurso externo
 * @param title - Título do recurso
 * @param description - Descrição breve do recurso
 *
 * @example
 * ```tsx
 * <ResourceLink
 *   href="https://react.dev"
 *   title="React Docs"
 *   description="Documentação oficial do React"
 * />
 * ```
 */
export function ResourceLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col gap-2 rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-colors hover:border-primary/30"
      whileHover={{ y: -3 }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/50 transition-colors group-hover:text-primary" />
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.a>
  );
}
