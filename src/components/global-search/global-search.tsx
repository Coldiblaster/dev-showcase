"use client";

import { Search } from "lucide-react";
import { useMemo } from "react";

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
    selectedIndex,
    handleSelect,
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
        <DialogContent className="flex h-[min(500px,85dvh)] max-w-2xl flex-col p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{t("title")}</DialogTitle>
          </DialogHeader>

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

          {results.length > 0 ? (
            <SearchResults
              results={results}
              selectedIndex={selectedIndex}
              typeConfig={typeConfig}
              onSelect={handleSelect}
            />
          ) : (
            <SearchEmpty
              hasQuery={hasQuery}
              startTypingText={t("startTyping")}
              hintText={t("hint")}
              noResultsText={t("noResults")}
              tryOtherTermsText={t("tryOtherTerms")}
            />
          )}

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
