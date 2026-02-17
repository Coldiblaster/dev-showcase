import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  Database,
  Palette,
  Shield,
  Sparkles,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { getMessages, getTranslations } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContentByCategory } from "@/data/content";
import { buildPageMetadata } from "@/lib/seo";

const iconMap: Record<string, LucideIcon> = {
  "ai-tips": Sparkles,
  "tailwind-tips": Palette,
  "react-query-tips": Database,
  "security-tips": Shield,
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav");
  return buildPageMetadata({
    title: t("tips"),
    description: t("tipsDesc"),
    path: "/dicas",
  });
}

export default async function DicasPage() {
  const t = await getTranslations("nav");
  const messages = await getMessages();
  const searchItems = (
    messages.search as {
      items: Record<string, { title: string; description: string }>;
    }
  ).items;
  const items = getContentByCategory("guide");

  return (
    <div className="container mx-auto px-6 py-12 pt-24 md:py-24 md:pt-32">
      <div className="mb-8 md:mb-12">
        <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          {t("tips")}
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">
          {t("tipsDesc")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = iconMap[item.slug] || BookOpen;
          return (
            <Link key={item.slug} href={`/dicas/${item.slug}`}>
              <Card className="group h-full border-border/50 transition-all hover:border-primary/30 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    {searchItems[item.slug]?.title ?? item.title}
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {searchItems[item.slug]?.description ?? item.description}
                  </p>
                  <Badge variant="outline" className="mt-4">
                    {t("sectionTips")}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
