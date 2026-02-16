import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("GoogleTranslator", () => {
  const OLD = process.env.GOOGLE_TRANSLATE_KEY;

  beforeEach(() => {
    process.env.GOOGLE_TRANSLATE_KEY = "g-key";
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    process.env.GOOGLE_TRANSLATE_KEY = OLD;
    vi.restoreAllMocks();
  });

  it("returns translated text from API shape", async () => {
    const body = JSON.stringify({
      data: { translations: [{ translatedText: "Olá traduzido" }] },
    });

    // set up mock response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => JSON.parse(body),
    });

    const mod = await import("../google.translator");
    const GoogleTranslator = mod.default;
    const g = new GoogleTranslator();
    const out = await g.translate("Olá", "pt-BR", "en");
    expect(out).toBe("Olá traduzido");
  });
});
