import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("DeepLTranslator", () => {
  const OLD_KEY = process.env.DEEPL_API_KEY;

  beforeEach(() => {
    process.env.DEEPL_API_KEY = "test-key";
  });

  afterEach(() => {
    process.env.DEEPL_API_KEY = OLD_KEY;
    vi.restoreAllMocks();
  });

  it("translates using DeepL SDK", async () => {
    const mockTranslateText = vi.fn(async (text: string) => ({
      text: `${text}-translated`,
    }));

    vi.doMock("deepl-node", () => ({
      Translator: vi.fn(() => ({
        translateText: mockTranslateText,
      })),
    }));

    const mod = await import("../deepl.translator");
    const DeepLTranslator = mod.default;
    const t = new DeepLTranslator();
    const out = await t.translate("hello {name}", "PT-BR", "EN-US");
    expect(out).toBe("hello {name}-translated");
    expect(mockTranslateText).toHaveBeenCalledWith(
      "hello {name}",
      null,
      "EN-US",
    );
  });

  it("throws if API key missing at instantiation", async () => {
    process.env.DEEPL_API_KEY = "";
    const mod = await import("../deepl.translator");
    const DeepLTranslator = mod.default;
    expect(() => new DeepLTranslator()).toThrow(
      "Missing DEEPL_API_KEY env var for DeepL provider",
    );
  });
});
