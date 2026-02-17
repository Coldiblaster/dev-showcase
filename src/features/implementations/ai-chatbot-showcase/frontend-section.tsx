"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

interface FeatureItem {
  title: string;
  description: string;
}

export function FrontendSection() {
  const t = useTranslations("aiChatbotPage");
  const { ref, isInView } = useSectionInView();
  const features = t.raw("frontend.features") as FeatureItem[];

  return (
    <section ref={ref} className="px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 text-center md:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-4xl">
              {t("frontend.title")}
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              {t("frontend.description")}
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="h-full border-border/50 bg-card transition-all hover:border-primary/30">
                  <CardContent className="p-4 md:p-6">
                    <h3 className="mb-2 text-base font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
