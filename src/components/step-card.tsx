"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

/** Props do card de passo/etapa com ícone e numeração. */
interface StepCardProps {
  /** Ícone do lucide-react */
  icon: LucideIcon;
  /** Título do passo */
  title: string;
  /** Descrição do passo */
  description: string;
  /** Número do passo (exibido como 01, 02, etc.) */
  step?: number;
}

/** Card reutilizável para exibir etapas/passos com ícone, numeração e hover. */
export function StepCard({
  icon: Icon,
  title,
  description,
  step,
}: StepCardProps) {
  return (
    <motion.div whileHover={{ y: -3 }} className="h-full">
      <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-6 text-center backdrop-blur-sm transition-colors hover:border-primary/30">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="relative">
          {step !== undefined && (
            <div className="mx-auto mb-1 font-mono text-xs font-bold text-primary/40">
              {String(step).padStart(2, "0")}
            </div>
          )}
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 font-semibold">{title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
