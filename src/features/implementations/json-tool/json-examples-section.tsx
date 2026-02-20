"use client";

import { motion } from "framer-motion";
import { FileJson, Play } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { CardBlur } from "@/components/ui/card-blur";

import {
  JSON_EXAMPLE_KEYS,
  JSON_EXAMPLES,
  type JsonExampleId,
} from "./examples-data";

interface JsonExamplesSectionProps {
  onSelectExample: (json: string) => void;
}

export function JsonExamplesSection({
  onSelectExample,
}: JsonExamplesSectionProps) {
  const t = useTranslations("jsonPage.examples");
  const tItems = useTranslations("jsonPage.examples.items");

  const handleClick = (id: JsonExampleId) => {
    onSelectExample(JSON_EXAMPLES[id]);
    document.getElementById("editor")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="examples"
      className="bg-secondary/20 px-4 py-12 md:px-6 md:py-24"
      role="region"
      aria-labelledby="json-examples-heading"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div id="json-examples-heading" className="mb-8 max-w-2xl">
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              {t("title")}
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              {t("description")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {JSON_EXAMPLE_KEYS.map((id, i) => (
            <AnimatedSection key={id} delay={i * 0.05}>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <CardBlur
                  className="group cursor-pointer transition-colors hover:border-primary/40"
                  padding="p-4"
                  onClick={() => handleClick(id)}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <FileJson
                        className="h-4 w-4 text-primary/80"
                        aria-hidden
                      />
                      {tItems(`${id}.name`)}
                    </h3>
                    <Badge
                      variant="outline"
                      className="gap-1 border-primary/20 px-2 py-0.5 text-[10px] text-primary opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Play className="h-2.5 w-2.5" />
                      {t("useExample")}
                    </Badge>
                  </div>
                  <p className="mb-3 text-xs text-muted-foreground">
                    {tItems(`${id}.description`)}
                  </p>
                  <code className="block max-h-12 overflow-hidden truncate rounded-lg bg-secondary/50 px-2.5 py-1.5 font-mono text-[11px] text-primary/80">
                    {JSON_EXAMPLES[id].slice(0, 60)}…
                  </code>
                </CardBlur>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
