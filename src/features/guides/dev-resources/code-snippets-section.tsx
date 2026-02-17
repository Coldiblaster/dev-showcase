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

interface CodeSnippetsSectionProps {
  level: DevLevelFilter;
}

export function CodeSnippetsSection({ level }: CodeSnippetsSectionProps) {
  const t = useTranslations("devResourcesPage.snippets");
  const tLevel = useTranslations("devResourcesPage.levelSelector.levels");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { showFeedback } = useCopyFeedback();

  useEffect(() => {
    setSearchQuery("");
    setSelectedTags([]);
  }, [level]);

  const handleCopy = useCallback(async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    showFeedback();
    setTimeout(() => setCopiedId(null), 2000);
  }, [showFeedback]);

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
      const matchesSearch =
        !query ||
        snippet.title.toLowerCase().includes(query) ||
        snippet.description.toLowerCase().includes(query) ||
        snippet.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => snippet.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [levelSnippets, searchQuery, selectedTags]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  return (
    <section id="snippets" className="relative px-6 py-16 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <AnimatedSection>
          <div className="mb-8 text-center md:mb-12">
            <Badge variant="secondary" className="mb-4 font-mono text-xs">
              {t("badge")}
            </Badge>
            <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
              {t("description")}
            </p>
          </div>
        </AnimatedSection>

        {/* Search & Filters */}
        <AnimatedSection delay={0.1}>
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label={t("searchPlaceholder")}
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tag">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  aria-pressed={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
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
            className="grid gap-6 md:grid-cols-2 md:gap-8"
          >
            {filteredSnippets.map((snippet, index) => (
              <AnimatedSection key={snippet.id} delay={0.1 + index * 0.05}>
                <Card className="h-full overflow-hidden border-border bg-card">
                  <Tabs defaultValue="code" className="w-full">
                    {/* Card header */}
                    <div className="border-b px-6 pt-6">
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <h3 className="text-base font-semibold text-foreground md:text-lg">
                              {snippet.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className={`text-[10px] ${levelColors[snippet.level]}`}
                            >
                              {tLevel(snippet.level)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {snippet.description}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {snippet.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="code" className="gap-2">
                          <Code className="h-4 w-4" />
                          <span className="hidden sm:inline">
                            {t("tabs.code")}
                          </span>
                        </TabsTrigger>
                        <TabsTrigger value="usage" className="gap-2">
                          <Play className="h-4 w-4" />
                          <span className="hidden sm:inline">
                            {t("tabs.usage")}
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

                    {/* Code Tab */}
                    <TabsContent value="code" className="p-6">
                      <div className="relative">
                        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
                          <code className="font-mono">{snippet.code}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="secondary"
                          aria-label={`${t("copy")} ${snippet.title}`}
                          className="absolute right-2 top-2"
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
                    <TabsContent value="usage" className="p-6">
                      <div className="relative">
                        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
                          <code className="font-mono">{snippet.usage}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="secondary"
                          aria-label={`${t("copy")} ${snippet.title} usage`}
                          className="absolute right-2 top-2"
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
                    <TabsContent value="explanation" className="p-6">
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <div className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                          {snippet.explanation}
                        </div>
                      </div>
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
