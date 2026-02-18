"use client";

import { Terminal } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CardBlur } from "@/components/ui/card-blur";

interface CommandItem {
  command: string;
  description: string;
}

interface CommandCategory {
  title: string;
  items: CommandItem[];
}

const CATEGORY_KEYS = [
  "basics",
  "branches",
  "remote",
  "history",
  "undo",
] as const;

export function CommandsSection() {
  const tRaw = useTranslations("gitWorkflow.commands") as unknown as {
    (key: string): string;
    raw(key: string): unknown;
  };

  const categories: (CommandCategory & { key: string })[] = CATEGORY_KEYS.map(
    (key) => {
      const raw = tRaw.raw(`categories.${key}`) as CommandCategory;
      return { key, ...raw };
    },
  );

  return (
    <section id="commands" className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="mb-8 flex items-center gap-3 md:mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
              <Terminal className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                {tRaw("title")}
              </h2>
              <p className="font-mono text-sm text-muted-foreground">
                {tRaw("subtitle")}
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <p className="mb-8 max-w-2xl text-sm text-muted-foreground md:text-base">
            {tRaw("description")}
          </p>
        </AnimatedSection>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.key} delay={0.1 + i * 0.05}>
              <CardBlur className="h-full">
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                  {cat.title}
                </h3>
                <div className="flex flex-col gap-2">
                  {cat.items.map((item) => (
                    <div
                      key={item.command}
                      className="rounded-lg px-2 py-1.5 transition-colors hover:bg-secondary/50"
                    >
                      <code className="block font-mono text-xs font-medium text-primary">
                        {item.command}
                      </code>
                      <span className="text-[11px] text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                  ))}
                </div>
              </CardBlur>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
