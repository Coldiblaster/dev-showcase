"use client";

import Fuse from "fuse.js";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SEARCH_ITEMS } from "./search-data";
import type { ResolvedSearchResult } from "./types";

const DEBOUNCE_MS = 200;

export function useGlobalSearch() {
  const t = useTranslations("search");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResolvedSearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    setIsMac(
      typeof navigator !== "undefined" &&
        navigator.platform.toLowerCase().includes("mac"),
    );
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

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(() => {
      setResults(fuse.search(query).map((r) => r.item));
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fuse]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [open, query]);

  const handleSelect = useCallback((result: ResolvedSearchResult) => {
    setOpen(false);
    setQuery("");

    if (result.url.startsWith("/#")) {
      const hash = result.url.slice(1);
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = result.url;
    }
  }, []);

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
    selectedIndex,
    handleSelect,
    isMac,
    t,
  };
}
