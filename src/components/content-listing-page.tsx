import type { LucideIcon } from "lucide-react";
import { ArrowRight, Flame } from "lucide-react";
import Link from "next/link";
import { getMessages, getTranslations } from "next-intl/server";

import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ContentCategory, getContentByCategory } from "@/data/content";
import { getPopularSlugs } from "@/lib/get-popular-slugs";

interface ContentListingPageProps {
  category: ContentCategory;
  titleKey: string;
  descriptionKey: string;
  badgeKey: string;
  countKey: string;
  basePath: string;
  iconMap: Record<string, LucideIcon>;
  defaultIcon: LucideIcon;
}

export async function ContentListingPage({
  category,
  titleKey,
  descriptionKey,
  badgeKey,
  countKey,
  basePath,
  iconMap,
  defaultIcon: DefaultIcon,
}: ContentListingPageProps) {
  const [tNav, messages, popularSlugs] = await Promise.all([
    getTranslations("nav"),
    getMessages(),
    getPopularSlugs(10),
  ]);
  const t = tNav as unknown as {
    (key: string, values?: Record<string, unknown>): string;
  };
  const searchItems = (
    messages.search as {
      items: Record<string, { title: string; description: string }>;
    }
  ).items;
  const popularSet = new Set(popularSlugs);
  const items = getContentByCategory(category);

  return (
    <div className="relative min-h-[calc(100dvh-4rem)]">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-size-[60px_60px]" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[400px] translate-x-1/4 rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <div className="relative container mx-auto px-6 py-12 pt-24 md:py-24 md:pt-32">
        {/* Header */}
        <AnimatedSection>
          <div className="mb-10 text-center md:mb-16">
            <Badge
              variant="outline"
              className="mb-5 gap-1.5 border-primary/30 px-3 py-1 text-primary"
            >
              <DefaultIcon className="h-3 w-3" />
              {t(countKey, { count: items.length })}
            </Badge>
            <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-5xl">
              <span className="bg-linear-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                {t(titleKey)}
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              {t(descriptionKey)}
            </p>
          </div>
        </AnimatedSection>

        {/* Cards grid */}
        <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = iconMap[item.slug] || DefaultIcon;
            const isPopular = popularSet.has(`${basePath}/${item.slug}`);
            return (
              <AnimatedSection key={item.slug} delay={0.1 + index * 0.08}>
                <Link
                  href={`${basePath}/${item.slug}`}
                  className="group block h-full"
                >
                  <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    <CardHeader>
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-md group-hover:shadow-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="flex items-center justify-between gap-2">
                        <span className="transition-colors group-hover:text-primary">
                          {searchItems[item.slug]?.title ?? item.title}
                        </span>
                        <div className="flex shrink-0 items-center gap-2">
                          {isPopular && (
                            <span className="flex items-center gap-0.5 rounded-full bg-orange-500/10 px-1.5 py-0.5 text-[10px] font-medium text-orange-400">
                              <Flame className="h-2.5 w-2.5" />
                              Popular
                            </span>
                          )}
                          <ArrowRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {searchItems[item.slug]?.description ??
                          item.description}
                      </p>
                      <Badge variant="outline" className="mt-4 text-[10px]">
                        {t(badgeKey)}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </div>
  );
}
