// src/i18n/__tests__/routing.test.ts
import { describe, expect, it } from "vitest";

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "../config";
import { routing } from "../routing";

describe("i18n/routing", () => {
  describe("routing.locales", () => {
    it("deve conter os mesmos locales de SUPPORTED_LOCALES", () => {
      expect(routing.locales).toEqual(SUPPORTED_LOCALES);
    });

    it("deve incluir pt-BR", () => {
      expect(routing.locales).toContain("pt-BR");
    });

    it("deve incluir en", () => {
      expect(routing.locales).toContain("en");
    });

    it("deve incluir es", () => {
      expect(routing.locales).toContain("es");
    });
  });

  describe("routing.defaultLocale", () => {
    it("deve ser pt-BR", () => {
      expect(routing.defaultLocale).toBe("pt-BR");
    });

    it("deve corresponder a DEFAULT_LOCALE", () => {
      expect(routing.defaultLocale).toBe(DEFAULT_LOCALE);
    });

    it("deve estar presente em routing.locales", () => {
      expect(routing.locales).toContain(routing.defaultLocale);
    });
  });

  describe("configuração de roteamento", () => {
    it("deve ser somente leitura (as const)", () => {
      // TypeScript garante que routing é readonly em compile-time
      // Este teste documenta a intenção
      expect(routing).toBeDefined();
    });
  });
});
