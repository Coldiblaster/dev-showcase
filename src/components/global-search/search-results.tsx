import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import type { TypeConfigMap } from "./search-config";
import type { ResolvedSearchResult } from "./types";

interface SearchResultsProps {
  results: ResolvedSearchResult[];
  selectedIndex: number;
  typeConfig: TypeConfigMap;
  onSelect: (result: ResolvedSearchResult) => void;
}

export function SearchResults({
  results,
  selectedIndex,
  typeConfig,
  onSelect,
}: SearchResultsProps) {
  return (
    <ScrollArea className="h-full px-3 py-2 scrollbar-none md:px-4 md:py-3">
      <div className="flex-1 space-y-0.5 md:space-y-1">
        {results.map((result, idx) => {
          const config = typeConfig[result.type];
          const Icon = config.icon;
          const isSelected = idx === selectedIndex;

          return (
            <button
              key={result.id}
              onClick={() => onSelect(result)}
              className={`group flex w-full items-start gap-3 rounded-lg border border-transparent p-2.5 text-left transition-all hover:border-border hover:bg-muted/50 md:gap-4 md:rounded-xl md:p-3 ${
                isSelected ? "border-primary bg-primary/10" : ""
              }`}
              tabIndex={-1}
              aria-selected={isSelected}
            >
              <div
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg md:h-10 md:w-10 ${config.color} transition-transform group-hover:scale-110`}
              >
                <Icon className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                  <p
                    className={`text-sm font-semibold text-foreground group-hover:text-primary md:text-base ${
                      isSelected ? "text-primary" : ""
                    }`}
                    style={{ wordBreak: "break-word" }}
                  >
                    {result.title}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-medium md:text-xs"
                  >
                    {config.label}
                  </Badge>
                </div>
                <p
                  className="text-xs text-muted-foreground md:text-sm"
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
  );
}
