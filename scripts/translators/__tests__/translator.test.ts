import { describe, expect, it } from "vitest";

import { resolveProviderName } from "../translator";

describe("translator resolver", () => {
  it("defaults to deepl", () => {
    expect(resolveProviderName(undefined)).toBe("deepl");
  });

  it("recognizes google", () => {
    expect(resolveProviderName("google")).toBe("google");
    expect(resolveProviderName("GOOGLE")).toBe("google");
  });
});
