"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { CardBlur } from "@/components/ui/card-blur";

interface Pattern {
  name: string;
  regex: string;
  description: string;
  testString: string;
}

interface PatternsLibraryProps {
  onSelectPattern: (regex: string, testString: string) => void;
}

const PATTERN_KEYS = [
  "email",
  "url",
  "phone",
  "cpf",
  "cep",
  "uuid",
  "date",
  "hexColor",
  "ipv4",
  "htmlTag",
] as const;

export function PatternsLibrary({ onSelectPattern }: PatternsLibraryProps) {
  const t = useTranslations("regexPage.patterns");
  const tItems = useTranslations("regexPage.patterns.items");

  const patterns: (Pattern & { key: string })[] = PATTERN_KEYS.map((key) => ({
    key,
    name: String(
      (tItems as unknown as { raw: (k: string) => unknown }).raw(`${key}.name`),
    ),
    regex: String(
      (tItems as unknown as { raw: (k: string) => unknown }).raw(
        `${key}.regex`,
      ),
    ),
    description: String(
      (tItems as unknown as { raw: (k: string) => unknown }).raw(
        `${key}.description`,
      ),
    ),
    testString: String(
      (tItems as unknown as { raw: (k: string) => unknown }).raw(
        `${key}.testString`,
      ),
    ),
  }));

  return (
    <section
      id="patterns"
      className="bg-secondary/20 px-4 py-12 md:px-6 md:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="mb-8 max-w-2xl">
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              {t("title")}
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              {t("description")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {patterns.map((pattern, i) => (
            <AnimatedSection key={pattern.key} delay={i * 0.05}>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <CardBlur
                  className="group cursor-pointer transition-colors hover:border-primary/40"
                  padding="p-4"
                  onClick={() =>
                    onSelectPattern(pattern.regex, pattern.testString)
                  }
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">
                      {pattern.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className="gap-1 border-primary/20 px-2 py-0.5 text-[10px] text-primary opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Play className="h-2.5 w-2.5" />
                      {t("usePattern")}
                    </Badge>
                  </div>
                  <p className="mb-3 text-xs text-muted-foreground">
                    {pattern.description}
                  </p>
                  <code className="block truncate rounded-lg bg-secondary/50 px-2.5 py-1.5 font-mono text-[11px] text-primary/80">
                    /{pattern.regex}/g
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
