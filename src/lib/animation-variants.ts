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

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};
