"use client";

import Fuse from "fuse.js";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SEARCH_ITEMS } from "./search-data";
import type { ResolvedSearchResult } from "./types";

const DEBOUNCE_MS = 200;

/** Termos exibidos quando o Redis ainda não tem dados de busca */
const FALLBACK_TERMS = [
  "Next.js",
  "i18n",
  "Redis",
  "TypeScript",
  "React",
  "testes",
  "API route",
  "chatbot",
  "design system",
  "deploy",
];

function trackSearch(term: string) {
  if (term.trim().length < 2) return;
  fetch("/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ term }),
  }).catch(() => {});
}

export function useGlobalSearch() {
  const t = useTranslations("search");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResolvedSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [popularTerms, setPopularTerms] = useState<string[]>(FALLBACK_TERMS);
  const [isPopularFallback, setIsPopularFallback] = useState(true);
  const [isMac, setIsMac] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  /** Cache client-side: query normalizada → resultados já computados pelo Fuse */
  const queryCache = useRef<Map<string, ResolvedSearchResult[]>>(new Map());

  useEffect(() => {
    setIsMac(/mac|iphone|ipad|ipod/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    fetch("/api/search")
      .then((r) => r.json())
      .then((data: { terms: string[] }) => {
        const terms = data.terms ?? [];
        if (terms.length > 0) {
          setPopularTerms(terms);
          setIsPopularFallback(false);
        } else {
          setPopularTerms(FALLBACK_TERMS);
          setIsPopularFallback(true);
        }
      })
      .catch(() => {
        setPopularTerms(FALLBACK_TERMS);
        setIsPopularFallback(true);
      });
  }, []);

  const resolvedItems = useMemo<ResolvedSearchResult[]>(
    () =>
      SEARCH_ITEMS.map((item) => ({
        ...item,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        title: t(item.titleKey as any),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        description: t(item.descriptionKey as any),
      })),
    [t],
  );

  const fuse = useMemo(
    () =>
      new Fuse(resolvedItems, {
        keys: ["title", "description", "tags"],
        threshold: 0.3,
        ignoreLocation: true,
        includeScore: true,
      }),
    [resolvedItems],
  );

  // Limpa o cache quando o fuse muda (ex: troca de idioma → resolvedItems atualizado)
  useEffect(() => {
    queryCache.current.clear();
  }, [fuse]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    // Cache hit: exibe imediatamente sem debounce nem loading
    const cacheKey = trimmed.toLowerCase();
    const cached = queryCache.current.get(cacheKey);
    if (cached) {
      setResults(cached);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    debounceRef.current = setTimeout(() => {
      const fresh = fuse.search(query).map((r) => r.item);
      queryCache.current.set(cacheKey, fresh);
      setResults(fresh);
      setIsSearching(false);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fuse]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [open, query]);

  /** Clique em chip de sugestão — pula debounce e loading, popula o cache */
  const selectTerm = useCallback(
    (term: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      const cacheKey = term.toLowerCase();
      const cached = queryCache.current.get(cacheKey);
      const fresh = cached ?? fuse.search(term).map((r) => r.item);
      if (!cached) queryCache.current.set(cacheKey, fresh);
      setQuery(term);
      setResults(fresh);
      setIsSearching(false);
    },
    [fuse],
  );

  const handleSelect = useCallback(
    (result: ResolvedSearchResult) => {
      trackSearch(query);
      setOpen(false);
      setQuery("");

      if (result.url.startsWith("/#")) {
        const hash = result.url.slice(1);
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(result.url);
      }
    },
    [router, query],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
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

    const onOpenSearch = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-search", onOpenSearch);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-search", onOpenSearch);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (!results.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + results.length) % results.length,
        );
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, results, selectedIndex, handleSelect]);

  return {
    open,
    setOpen,
    query,
    setQuery,
    results,
    isSearching,
    selectedIndex,
    handleSelect,
    selectTerm,
    popularTerms,
    isPopularFallback,
    isMac,
    t,
  };
}
