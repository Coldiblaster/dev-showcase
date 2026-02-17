"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

/**
 * Badge com ícone e animação hover.
 *
 * Badge circular com ícone centralizado e efeito de escala/rotação ao hover.
 * Usado para destacar features ou seções com ícones.
 *
 * @param icon - Ícone do lucide-react
 * @param bgColor - Cor de fundo (padrão: bg-primary/10)
 * @param iconColor - Cor do ícone (padrão: text-primary)
 *
 * @example
 * ```tsx
 * <IconBadge icon={Zap} />
 * ```
 */
export function IconBadge({
  icon: Icon,
  bgColor = "bg-primary/10",
  iconColor = "text-primary",
}: {
  icon: LucideIcon;
  bgColor?: string;
  iconColor?: string;
}) {
  return (
    <motion.div
      className={`flex h-10 w-10 items-center justify-center rounded-lg ${bgColor} ${iconColor}`}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
    >
      <Icon className="h-5 w-5" />
    </motion.div>
  );
}
