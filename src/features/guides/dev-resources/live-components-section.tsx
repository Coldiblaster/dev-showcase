"use client";

import { BookOpen, Check, Code, Copy, Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { componentMap } from "./components/showcase-previews";
import { showcaseComponents } from "./data/showcase-components";

export function LiveComponentsSection() {
  const t = useTranslations("devResourcesPage.liveComponents");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = useCallback((code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  return (
    <section id="components" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <AnimatedSection>
          <div className="mb-16 text-center">
            <Badge variant="secondary" className="mb-4 font-mono text-xs">
              {t("badge")}
            </Badge>
            <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </AnimatedSection>

        {/* Components Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {showcaseComponents.map((item, index) => {
            const Component = componentMap[item.componentKey];
            return (
              <AnimatedSection key={item.id} delay={index * 0.1}>
                <Card className="overflow-hidden border-border bg-card">
                  <Tabs defaultValue="preview" className="w-full">
                    <div className="border-b px-6 pt-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="preview" className="gap-2">
                          <Eye className="h-4 w-4" />
                          <span className="hidden sm:inline">
                            {t("tabs.preview")}
                          </span>
                        </TabsTrigger>
                        <TabsTrigger value="code" className="gap-2">
                          <Code className="h-4 w-4" />
                          <span className="hidden sm:inline">
                            {t("tabs.code")}
                          </span>
                        </TabsTrigger>
                        <TabsTrigger value="explanation" className="gap-2">
                          <BookOpen className="h-4 w-4" />
                          <span className="hidden sm:inline">
                            {t("tabs.explanation")}
                          </span>
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="preview" className="p-6">
                      <div className="flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-8">
                        {Component && <Component />}
                      </div>
                    </TabsContent>

                    <TabsContent value="code" className="p-6">
                      <div className="relative">
                        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                          <code className="font-mono">{item.code}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute right-2 top-2"
                          onClick={() => handleCopyCode(item.code, item.id)}
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="mr-1 h-3 w-3" />
                              {t("copied")}
                            </>
                          ) : (
                            <>
                              <Copy className="mr-1 h-3 w-3" />
                              {t("copy")}
                            </>
                          )}
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="explanation" className="p-6">
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <div className="space-y-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                          {item.explanation}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
