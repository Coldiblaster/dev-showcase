"use client";

import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CardBlur } from "@/components/ui/card-blur";

interface CheatItem {
  token: string;
  description: string;
}

interface CheatCategory {
  title: string;
  items: CheatItem[];
}

const CATEGORY_KEYS = [
  "basics",
  "quantifiers",
  "anchors",
  "groups",
  "lookaround",
  "classes",
] as const;

export function CheatSheet() {
  const tRaw = useTranslations("regexPage.cheatSheet") as unknown as {
    (key: string): string;
    raw(key: string): unknown;
  };

  const categories: (CheatCategory & { key: string })[] = CATEGORY_KEYS.map(
    (key) => {
      const raw = tRaw.raw(`categories.${key}`) as {
        title: string;
        items: CheatItem[];
      };
      return { key, title: raw.title, items: raw.items };
    },
  );

  return (
    <section id="cheat-sheet" className="px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="mb-8 max-w-2xl">
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              {tRaw("title")}
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              {tRaw("description")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.key} delay={i * 0.05}>
              <CardBlur className="h-full">
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                  {cat.title}
                </h3>
                <div className="flex flex-col gap-1.5">
                  {cat.items.map((item) => (
                    <div
                      key={item.token}
                      className="flex items-baseline gap-3 rounded-lg px-2 py-1 transition-colors hover:bg-secondary/50"
                    >
                      <code className="shrink-0 rounded bg-primary/10 px-1.5 py-0.5 font-mono text-xs font-medium text-primary">
                        {item.token}
                      </code>
                      <span className="text-xs text-muted-foreground">
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
