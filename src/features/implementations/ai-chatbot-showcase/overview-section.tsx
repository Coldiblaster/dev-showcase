"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Globe,
  Lock,
  type LucideIcon,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Brain,
  Shield,
  Lock,
  Smartphone,
  Globe,
};

interface OverviewItem {
  title: string;
  description: string;
  icon: string;
}

export function OverviewSection() {
  const t = useTranslations("aiChatbotPage");
  const { ref, isInView } = useSectionInView();
  const items = t.raw("overview.items") as OverviewItem[];

  return (
    <section ref={ref} className="px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 max-w-2xl md:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-4xl">
              {t("overview.title")}
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              {t("overview.description")}
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {items.map((item) => {
              const Icon = iconMap[item.icon] || Zap;
              return (
                <motion.div key={item.title} variants={fadeUp}>
                  <Card className="h-full border-border/50 transition-colors hover:border-primary/30">
                    <CardContent className="flex gap-4 p-4 md:p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
