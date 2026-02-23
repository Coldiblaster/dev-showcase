"use client";

import { Search, X } from "lucide-react";
import { useCallback, useMemo } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { getTypeConfig } from "./search-config";
import { SearchEmpty } from "./search-empty";
import { SearchFooter } from "./search-footer";
import { SearchLoading } from "./search-loading";
import { SearchResults } from "./search-results";
import { SearchTrigger } from "./search-trigger";
import { useGlobalSearch } from "./use-global-search";

export function GlobalSearch() {
  const {
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
  } = useGlobalSearch();

  const typeConfig = useMemo(
    () =>
      getTypeConfig({
        page: t("page"),
        section: t("section"),
        implementation: t("implementation"),
        guide: t("guide"),
        tool: t("tool"),
      }),
    [t],
  );

  const hasQuery = query.trim().length > 0;

  const handleClear = useCallback(() => {
    if (query) {
      setQuery("");
    } else {
      setOpen(false);
    }
  }, [query, setQuery, setOpen]);

  return (
    <>
      <SearchTrigger
        onClick={() => setOpen(true)}
        open={open}
        isMac={isMac}
        label={t("open")}
        placeholder={t("placeholder")}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="flex h-[min(500px,85dvh)] max-w-2xl flex-col gap-0 p-0 max-md:top-0 max-md:h-dvh max-md:max-w-full max-md:translate-y-0 max-md:rounded-none max-md:border-0"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{t("title")}</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-3 border-b px-4 py-3 md:px-6 md:py-2">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <Input
              placeholder={t("inputPlaceholder")}
              aria-label={t("inputPlaceholder")}
              className="h-10 flex-1 border-0 bg-transparent p-0 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 md:h-11"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button
              onClick={handleClear}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
              aria-label={t("close")}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {results.length > 0 ? (
              <SearchResults
                results={results}
                selectedIndex={selectedIndex}
                typeConfig={typeConfig}
                onSelect={handleSelect}
              />
            ) : isSearching ? (
              <SearchLoading />
            ) : (
              <SearchEmpty
                hasQuery={hasQuery}
                startTypingText={t("startTyping")}
                hintText={t("hint")}
                noResultsText={t("noResults")}
                tryOtherTermsText={t("tryOtherTerms")}
                popularTerms={popularTerms}
                popularLabel={
                  isPopularFallback ? t("suggestions") : t("popularSearches")
                }
                onTermSelect={selectTerm}
              />
            )}
          </div>

          <SearchFooter
            navigateText={t("navigate")}
            selectText={t("select")}
            closeText={t("close")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
