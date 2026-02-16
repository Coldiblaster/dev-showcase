"use client";

import { motion, useInView } from "framer-motion";
import { Check, Copy, Search } from "lucide-react";
import { useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { snippets } from "./data/code-snippets";

export function CodeSnippetsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleCopy = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Get all unique tags
  const allTags = Array.from(new Set(snippets.flatMap((s) => s.tags))).sort();

  // Filter snippets
  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      searchQuery === "" ||
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => snippet.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <section id="snippets" className="relative px-6 py-32" ref={ref}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <Badge variant="secondary" className="mb-4 font-mono text-xs">
            Code Snippets
          </Badge>
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Biblioteca de Snippets
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Códigos úteis e reutilizáveis. Copie, cole e adapte aos seus
            projetos
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer transition-colors hover:bg-primary/90"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground">
            {filteredSnippets.length}{" "}
            {filteredSnippets.length === 1
              ? "snippet encontrado"
              : "snippets encontrados"}
          </p>
        </motion.div>

        {/* Snippets Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredSnippets.map((snippet, index) => (
            <motion.div
              key={snippet.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
            >
              <Card className="h-full overflow-hidden border-border bg-card">
                <div className="space-y-4 p-6">
                  {/* Header */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {snippet.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {snippet.description}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(snippet.code, snippet.id)}
                        className="shrink-0"
                      >
                        {copiedId === snippet.id ? (
                          <>
                            <Check className="mr-1 h-3 w-3" />
                            Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="mr-1 h-3 w-3" />
                            Copiar
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
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

                  {/* Code Block */}
                  <div className="relative">
                    <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
                      <code className="font-mono">{snippet.code}</code>
                    </pre>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSnippets.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              Nenhum snippet encontrado. Tente outro termo de busca.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
