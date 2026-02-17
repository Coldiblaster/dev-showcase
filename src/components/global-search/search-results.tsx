import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import type { TypeConfigMap } from "./search-config";
import type { ResolvedSearchResult } from "./use-global-search";

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
    <ScrollArea className="flex h-full max-h-87.5 flex-col justify-center px-4 py-3 scrollbar-none">
      <div className="flex-1 space-y-1">
        {results.map((result, idx) => {
          const config = typeConfig[result.type];
          const Icon = config.icon;
          const isSelected = idx === selectedIndex;

          return (
            <button
              key={result.id}
              onClick={() => onSelect(result)}
              className={`group flex w-full items-start gap-4 rounded-xl border border-transparent p-3 text-left transition-all hover:border-border hover:bg-muted/50 ${
                isSelected ? "border-primary bg-primary/10" : ""
              }`}
              tabIndex={-1}
              aria-selected={isSelected}
            >
              <div
                className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.color} transition-transform group-hover:scale-110`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <p
                    className={`break-all font-semibold text-foreground group-hover:text-primary ${
                      isSelected ? "text-primary" : ""
                    }`}
                    style={{ wordBreak: "break-word" }}
                  >
                    {result.title}
                  </p>
                  <Badge variant="outline" className="text-xs font-medium">
                    {config.label}
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
  );
}
