export type SearchResultType = "page" | "section" | "implementation" | "guide";

export type SearchResult = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  type: SearchResultType;
  url: string;
  tags: string[];
};
