"use client";

import { motion } from "framer-motion";
import { CheckCircle2, type LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
}

/**
 * Card de feature com ícone e animação hover.
 *
 * Card visual para destacar funcionalidades, benefícios ou características.
 * Inclui animação sutil ao passar o mouse.
 *
 * @param title - Título da feature
 * @param description - Descrição detalhada
 * @param icon - Ícone Lucide (padrão: CheckCircle2)
 *
 * @example
 * ```tsx
 * <FeatureCard
 *   title="Cache Automático"
 *   description="Dados são cacheados e reutilizados automaticamente"
 *   icon={Database}
 * />
 * ```
 */
export function FeatureCard({
  title,
  description,
  icon: Icon = CheckCircle2,
}: FeatureCardProps) {
  return (
    <motion.div whileHover={{ y: -2 }} className="h-full">
      <Card className="h-full border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base text-foreground">
            <Icon className="h-4 w-4 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
