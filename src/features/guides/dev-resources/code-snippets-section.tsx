"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Check, Code, Copy, Play, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { useCopyFeedback } from "@/components/copy-feedback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { snippets } from "./data/code-snippets";
import { type DevLevelFilter, levelColors } from "./data/types";
import { SnippetExplanation } from "./snippet-explanation";

interface CodeSnippetsSectionProps {
  level: DevLevelFilter;
}

export function CodeSnippetsSection({ level }: CodeSnippetsSectionProps) {
  const t = useTranslations("devResourcesPage.snippets");
  const tData = useTranslations("devResourcesData.snippets") as unknown as {
    (key: string): string;
    raw(key: string): unknown;
  };
  const tLevel = useTranslations("devResourcesPage.levelSelector.levels");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { showFeedback } = useCopyFeedback();

  useEffect(() => {
    setSearchQuery("");
    setSelectedTags([]);
  }, [level]);

  const handleCopy = useCallback(
    async (code: string, id: string) => {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      showFeedback();
      setTimeout(() => setCopiedId(null), 2000);
    },
    [showFeedback],
  );

  const levelSnippets = useMemo(
    () =>
      level === "all" ? snippets : snippets.filter((s) => s.level === level),
    [level],
  );

  const allTags = useMemo(
    () => Array.from(new Set(levelSnippets.flatMap((s) => s.tags))).sort(),
    [levelSnippets],
  );

  const filteredSnippets = useMemo(() => {
    return levelSnippets.filter((snippet) => {
      const query = searchQuery.toLowerCase();
      const title = String(tData.raw(`${snippet.id}.title`)).toLowerCase();
      const description = String(
        tData.raw(`${snippet.id}.description`),
      ).toLowerCase();
      const matchesSearch =
        !query ||
        title.includes(query) ||
        description.includes(query) ||
        snippet.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => snippet.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [levelSnippets, searchQuery, selectedTags, tData]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  return (
    <section id="snippets" className="relative px-4 py-16 md:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <AnimatedSection>
          <div className="mb-6 text-center md:mb-12">
            <Badge variant="secondary" className="mb-4 font-mono text-xs">
              {t("badge")}
            </Badge>
            <h2 className="mb-3 text-balance text-3xl font-bold tracking-tight md:mb-4 md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-sm text-muted-foreground md:text-lg">
              {t("description")}
            </p>
          </div>
        </AnimatedSection>

        {/* Search & Filters */}
        <AnimatedSection delay={0.1}>
          <div className="mb-6 space-y-3 md:mb-8 md:space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label={t("searchPlaceholder")}
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
              />
            </div>

            <div
              className="flex flex-wrap gap-1.5 md:gap-2"
              role="group"
              aria-label={t("filterByTag")}
            >
              {allTags.map((tag) => (
                <button
                  key={tag}
                  aria-pressed={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:px-2.5 md:text-xs ${
                    selectedTags.includes(tag)
                      ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                      : "border-border text-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              {t("resultCount", { count: filteredSnippets.length })}
            </p>
          </div>
        </AnimatedSection>

        {/* Snippets Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={level}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4 md:grid-cols-2 md:gap-8"
          >
            {filteredSnippets.map((snippet, index) => (
              <AnimatedSection key={snippet.id} delay={0.1 + index * 0.05}>
                <Card className="h-full border-border bg-card">
                  <Tabs defaultValue="code">
                    {/* Card header */}
                    <div className="border-b px-4 py-4 md:px-6 md:py-6">
                      <div className="mb-3 md:mb-4">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold text-foreground md:text-lg">
                            {String(tData.raw(`${snippet.id}.title`))}
                          </h3>
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${levelColors[snippet.level]}`}
                          >
                            {tLevel(snippet.level)}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground md:text-sm">
                          {String(tData.raw(`${snippet.id}.description`))}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {snippet.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-[10px] md:text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger
                          value="code"
                          className="gap-1 text-xs md:gap-2 md:text-sm"
                        >
                          <Code className="h-3.5 w-3.5 md:h-4 md:w-4" />
                          <span className="hidden sm:inline">
                            {t("tabs.code")}
                          </span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="usage"
                          className="gap-1 text-xs md:gap-2 md:text-sm"
                        >
                          <Play className="h-3.5 w-3.5 md:h-4 md:w-4" />
                          <span className="hidden sm:inline">
                            {t("tabs.usage")}
                          </span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="explanation"
                          className="gap-1 text-xs md:gap-2 md:text-sm"
                        >
                          <BookOpen className="h-3.5 w-3.5 md:h-4 md:w-4" />
                          <span className="hidden sm:inline">
                            {t("tabs.explanation")}
                          </span>
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    {/* Code Tab */}
                    <TabsContent value="code" className="p-3 md:p-6">
                      <div className="relative">
                        <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[11px] leading-relaxed md:p-4 md:text-xs">
                          <code className="font-mono">{snippet.code}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="secondary"
                          aria-label={`${t("copy")} ${String(tData.raw(`${snippet.id}.title`))}`}
                          className="absolute right-2 top-2 h-7 px-2 text-[10px] md:h-8 md:px-3 md:text-xs"
                          onClick={() => handleCopy(snippet.code, snippet.id)}
                        >
                          {copiedId === snippet.id ? (
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

                    {/* Usage Tab */}
                    <TabsContent value="usage" className="p-3 md:p-6">
                      <div className="relative">
                        <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[11px] leading-relaxed md:p-4 md:text-xs">
                          <code className="font-mono">{snippet.usage}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="secondary"
                          aria-label={`${t("copy")} ${String(tData.raw(`${snippet.id}.title`))} usage`}
                          className="absolute right-2 top-2 h-7 px-2 text-[10px] md:h-8 md:px-3 md:text-xs"
                          onClick={() =>
                            handleCopy(snippet.usage, `${snippet.id}-usage`)
                          }
                        >
                          {copiedId === `${snippet.id}-usage` ? (
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

                    {/* Explanation Tab */}
                    <TabsContent value="explanation" className="p-3 md:p-6">
                      <SnippetExplanation
                        text={String(tData.raw(`${snippet.id}.explanation`))}
                      />
                    </TabsContent>
                  </Tabs>
                </Card>
              </AnimatedSection>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredSnippets.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">{t("emptyState")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
