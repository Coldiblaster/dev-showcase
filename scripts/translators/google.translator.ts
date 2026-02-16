import type { Translator } from "./translator";

const API_KEY =
  process.env.GOOGLE_TRANSLATE_KEY || process.env.GOOGLE_TRANSLATE_API_KEY;

type GoogleResponse = {
  data?: {
    translations?: Array<{ translatedText?: string }>;
  };
};

/** Google Translate provider implementing `Translator` interface. */
export default class GoogleTranslator implements Translator {
  constructor() {
    // nothing
  }

  /**
   * Translate text using Google Translate REST API.
   * @param text Text to translate
   * @param sourceLang Source locale (e.g. 'pt-BR')
   * @param targetLang Target language (e.g. 'en')
   */
  async translate(
    text: string,
    sourceLang: string,
    targetLang: string,
  ): Promise<string> {
    if (!API_KEY) {
      throw new Error(
        "Missing GOOGLE_TRANSLATE_KEY env var for Google provider",
      );
    }
    const base = "https://translation.googleapis.com/language/translate/v2";
    const url = `${base}?key=${API_KEY}`;
    const body = {
      q: text,
      target: targetLang.split("-")[0],
      format: "text",
      source: sourceLang.split("-")[0],
    };
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Google Translate API error: ${res.status}`);
    const json = (await res.json()) as GoogleResponse;
    return json?.data?.translations?.[0]?.translatedText ?? text;
  }
}
