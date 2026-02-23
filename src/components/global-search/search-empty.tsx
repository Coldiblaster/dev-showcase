import { Search, TrendingUp } from "lucide-react";

interface SearchEmptyProps {
  hasQuery: boolean;
  startTypingText: string;
  hintText: string;
  noResultsText: string;
  tryOtherTermsText: string;
  popularTerms?: string[];
  popularLabel?: string;
  onTermSelect?: (term: string) => void;
}

export function SearchEmpty({
  hasQuery,
  startTypingText,
  hintText,
  noResultsText,
  tryOtherTermsText,
  popularTerms = [],
  popularLabel = "Sugestões",
  onTermSelect,
}: SearchEmptyProps) {
  const hasTerms = popularTerms.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 py-4">
      {/* Chips — sempre visíveis quando há termos e não há query */}
      {!hasQuery && hasTerms && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              {popularLabel}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularTerms.map((term) => (
              <button
                key={term}
                onClick={() => onTermSelect?.(term)}
                className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-foreground/80 transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Estado vazio (sem query e sem termos, ou com query sem resultados) */}
      {(hasQuery || !hasTerms) && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="mb-3 rounded-full bg-muted p-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">
            {hasQuery ? noResultsText : startTypingText}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {hasQuery ? tryOtherTermsText : hintText}
          </p>
        </div>
      )}
    </div>
  );
}
