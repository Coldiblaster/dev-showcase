import { ArrowRight, Globe } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContentByCategory } from "@/data/content";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav");
  return buildPageMetadata({
    title: t("implementations"),
    description: t("implementationsDesc"),
    path: "/implementacoes",
  });
}

export default async function ImplementacoesPage() {
  const t = await getTranslations("nav");
  const items = getContentByCategory("implementation");

  return (
    <div className="container mx-auto px-6 py-24 pt-32">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold text-foreground">
          {t("implementations")}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t("implementationsDesc")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.slug} href={`/implementacoes/${item.slug}`}>
            <Card className="group h-full border-border/50 transition-all hover:border-primary/30 hover:shadow-lg">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="flex items-center justify-between">
                  {item.title}
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
                <Badge variant="outline" className="mt-4">
                  Implementação
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
