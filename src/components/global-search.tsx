"use client";

import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { typeConfig } from "@/lib/global-search/global-search-helper";
import {
  type SearchItemI18nKey,
  searchItems,
} from "@/lib/global-search/search-items";

// Tipos de resultado de busca
export type GlobalSearchResult = {
  id: string;
  title: string;
  description: string;
  type: "project" | "implementation" | "guide";
  url: string;
};

export function GlobalSearch() {
  // Index do item selecionado para navegação por teclado
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  // Detecta o sistema operacional para exibir o atalho correto (client only)
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(window.navigator.platform.toLowerCase().includes("mac"));
    }
  }, []);
  // Usar o namespace 'search' para traduções específicas
  const t = useTranslations("search");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GlobalSearchResult[]>([]);
  // Monta textos internacionalizados para cada item
  const getI18nTexts = (i18nKey: SearchItemI18nKey) => {
    const title = t(`${i18nKey}.title`) || "";
    const description = t(`${i18nKey}.description`) || "";
    return { title, description };
  };

  // Helper de busca
  const search = (query: string) => {
    if (!query.trim()) {
      return searchItems.map((item) => {
        const { title, description } = getI18nTexts(item.i18nKey);
        return {
          ...item,
          title,
          description,
          type: item.type as "project" | "implementation" | "guide",
        };
      });
    }
    const results = searchItems.map((item) => {
      const { title, description } = getI18nTexts(item.i18nKey);
      return {
        ...item,
        title,
        description,
        type: item.type as "project" | "implementation" | "guide",
      };
    });
    const fuse = new Fuse(results, {
      keys: ["title", "description", "tags", "category"],
      threshold: 0.3,
      ignoreLocation: true,
      includeScore: true,
    });
    return fuse.search(query).map((result) => result.item);
  };

  // Atalho: Cmd/Ctrl + K (apenas um atalho, SSR safe)
  // Atalhos globais: abrir busca
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const isInput =
        tag === "input" ||
        tag === "textarea" ||
        (e.target as HTMLElement)?.isContentEditable;
      if (
        !isInput &&
        (e.key === "k" || e.key === "K") &&
        (e.metaKey || e.ctrlKey)
      ) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  // Função para selecionar resultado (mantém apenas uma definição)
  const handleSelect = useCallback((result: GlobalSearchResult) => {
    setOpen(false);
    setQuery("");
    if (result.url.startsWith("#")) {
      const element = document.querySelector(result.url);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = result.url;
    }
  }, []);

  // Navegação por teclado nos resultados
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      // Só ativa se houver resultados e o Dialog estiver aberto
      if (!results.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + results.length) % results.length,
        );
      } else if (e.key === "Enter") {
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          e.preventDefault();
          handleSelect(results[selectedIndex]);
        }
      } else if (e.key === "Escape") {
        setSelectedIndex(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, results, selectedIndex, handleSelect]);

  // Resetar seleção ao abrir dialog ou mudar resultados
  useEffect(() => {
    if (open) setSelectedIndex(-1);
  }, [open, query]);

  // Debounce para busca
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    debounceTimeout.current = setTimeout(() => {
      setResults(search(query));
    }, 200);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query]);

  const types = typeConfig({
    project: t("project"),
    implementation: t("implementation"),
    guide: t("guide"),
  });

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2
          transition-all duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
          hover:bg-primary hover:text-primary-foreground
          hover:shadow-lg hover:scale-[1.03]
          active:scale-95
          group"
        onClick={() => setOpen(true)}
        aria-label={t("open")}
        aria-haspopup="dialog"
        aria-expanded={open}
        tabIndex={0}
      >
        <Search className="h-4 w-4 xl:mr-2 group-hover:scale-110 group-focus-visible:scale-110 transition-transform duration-150" />
        <span className="hidden xl:inline-flex">{t("placeholder")}</span>
        <kbd
          className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex
            transition-colors duration-150
            group-hover:bg-primary group-hover:text-primary-foreground
            group-focus-visible:bg-primary group-focus-visible:text-primary-foreground
            group-active:bg-primary/80 group-active:text-primary-foreground"
        >
          {isMac ? (
            <>
              <span className="text-base">⌘</span>K
            </>
          ) : (
            <>
              <span className="text-xs">Ctrl</span>+K
            </>
          )}
        </kbd>
        <span className="sr-only">{t("open")}</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl p-0 h-125 flex flex-col">
          <DialogHeader className="sr-only">
            <DialogTitle>{t("title")}</DialogTitle>
          </DialogHeader>

          {/* Campo de busca */}
          <div className="flex items-center gap-3 border-b px-6 py-2">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <Input
              placeholder={t("inputPlaceholder")}
              className="h-11 flex-1 border-0 bg-transparent p-0 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>

          {/* Resultados - altura fixa para evitar layout shift */}
          {results.length > 0 ? (
            <ScrollArea className="h-full max-h-87.5 px-4 py-3 flex flex-col justify-center scrollbar-none">
              <div className="space-y-1 flex-1">
                {results.map((result, idx) => {
                  const { icon: Icon, label, color } = types[result.type];
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      className={
                        `group flex w-full items-start gap-4 rounded-xl border border-transparent p-3 text-left transition-all hover:border-border hover:bg-muted/50 ` +
                        (isSelected ? "bg-primary/10 border-primary" : "")
                      }
                      tabIndex={-1}
                      aria-selected={isSelected}
                    >
                      <div
                        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${color} transition-transform group-hover:scale-110`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <p
                            className={
                              `font-semibold text-foreground group-hover:text-primary break-all ` +
                              (isSelected ? "text-primary" : "")
                            }
                            style={{ wordBreak: "break-word" }}
                          >
                            {result.title}
                          </p>
                          <Badge
                            variant="outline"
                            className="text-xs font-medium"
                          >
                            {label}
                          </Badge>
                        </div>
                        <p
                          className="text-sm text-muted-foreground"
                          style={{ whiteSpace: "normal" }}
                        >
                          {result.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          ) : (
            <div className="px-4 py-3 flex flex-col justify-center flex-1">
              {query.trim() === "" ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-3 rounded-full bg-muted p-4">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {t("startTyping")}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t("hint")}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1">
                  <div className="mb-3 rounded-full bg-muted p-4">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {t("noResults")}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t("tryOtherTerms")}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Rodapé */}
          <div className="flex items-center justify-between border-t p-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <kbd className="flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono">
                ↑↓
              </kbd>
              <span>{t("navigate")}</span>
            </div>
            <div className="flex items-center gap-4">
              <kbd className="flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono">
                ↵
              </kbd>
              <span>{t("select")}</span>
            </div>
            <div className="flex items-center gap-4">
              <kbd className="flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono">
                ESC
              </kbd>
              <span>{t("close")}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
