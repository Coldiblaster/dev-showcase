/**
 * Variantes de animação reutilizáveis para framer-motion.
 *
 * Conjunto de animações padrão para uso em todo o projeto.
 */

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};
