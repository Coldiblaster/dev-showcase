export type ProviderName = "deepl" | "google";

export interface Translator {
  translate(
    text: string,
    sourceLang: string,
    targetLang: string,
  ): Promise<string>;
}

export function resolveProviderName(raw?: string): ProviderName {
  const p = (raw || "deepl").toLowerCase();
  return p === "google" ? "google" : "deepl";
}
