export type SearchResultType =
  | "page"
  | "section"
  | "implementation"
  | "guide"
  | "tool";

export type SearchResult = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  type: SearchResultType;
  url: string;
  tags: string[];
};

/** SearchResult com título e descrição já traduzidos. */
export type ResolvedSearchResult = SearchResult & {
  title: string;
  description: string;
};
