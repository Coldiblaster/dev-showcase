import { Search } from "lucide-react";

interface SearchEmptyProps {
  hasQuery: boolean;
  startTypingText: string;
  hintText: string;
  noResultsText: string;
  tryOtherTermsText: string;
}

export function SearchEmpty({
  hasQuery,
  startTypingText,
  hintText,
  noResultsText,
  tryOtherTermsText,
}: SearchEmptyProps) {
  return (
    <div className="flex flex-1 flex-col justify-center px-4 py-3">
      <div className="flex flex-col items-center justify-center">
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
    </div>
  );
}
