"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Seção com animação de entrada ao entrar no viewport.
 *
 * Anima opacidade e posição Y quando o elemento entra na tela.
 * Usa Intersection Observer via framer-motion para performance.
 *
 * @param children - Conteúdo a ser animado
 * @param delay - Atraso da animação em segundos (padrão: 0)
 *
 * @example
 * ```tsx
 * <AnimatedSection delay={0.2}>
 *   <h2>Título animado</h2>
 * </AnimatedSection>
 * ```
 */
export function AnimatedSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="min-w-0"
    >
      {children}
    </motion.div>
  );
}
