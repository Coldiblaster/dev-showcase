import * as DeepL from "deepl-node";

import { Translator } from "./translator";

/** DeepL translator provider implementing the shared `Translator` interface. */
export default class DeepLTranslator implements Translator {
  private client: DeepL.Translator;

  constructor() {
    const apiKey = process.env.DEEPL_API_KEY;
    if (!apiKey) {
      throw new Error("Missing DEEPL_API_KEY env var for DeepL provider");
    }
    console.log("[DEBUG] DeepL import:", DeepL);
    console.log("[DEBUG] DeepL.Translator:", DeepL.Translator);
    this.client = new DeepL.Translator(apiKey);
  }

  /**
   * Translate text from sourceLang to targetLang using the deepl-node SDK.
   * @param text Text to translate
   * @param sourceLang Source locale (e.g. 'pt-BR')
   * @param targetLang Target code expected by provider (e.g. 'EN-US')
   */
  async translate(
    text: string,
    sourceLang: string,
    targetLang: string,
  ): Promise<string> {
    // The deepl-node SDK exposes narrow union types for language codes. At
    // runtime we already pass provider-specific codes (via `providerSourceCode`)
    // but the compiler can't verify the string literal union here. Cast to the
    // SDK types so TypeScript is satisfied while preserving runtime behavior.
    // Let DeepL auto-detect source language to avoid unsupported source_lang errors.
    const tgt = targetLang as unknown as DeepL.TargetLanguageCode;
    const result = await this.client.translateText(text, null, tgt);

    if (!result?.text) {
      throw new Error("Invalid response from DeepL API");
    }

    return result.text;
  }
}
