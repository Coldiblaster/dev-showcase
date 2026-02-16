import { describe, expect, it } from "vitest";

import {
  COOKIE_NAME,
  DEFAULT_LOCALE,
  getCookieName,
  isSupportedLocale,
  SUPPORTED_LOCALES,
} from "../config";

describe("i18n/config", () => {
  describe("SUPPORTED_LOCALES", () => {
    it("deve incluir pt-BR como locale suportado", () => {
      expect(SUPPORTED_LOCALES).toContain("pt-BR");
    });

    it("deve incluir en como locale suportado", () => {
      expect(SUPPORTED_LOCALES).toContain("en");
    });

    it("deve incluir es como locale suportado", () => {
      expect(SUPPORTED_LOCALES).toContain("es");
    });

    it("deve incluir de como locale suportado", () => {
      expect(SUPPORTED_LOCALES).toContain("de");
    });

    it("deve ter ao menos 3 locales suportados", () => {
      expect(SUPPORTED_LOCALES.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("DEFAULT_LOCALE", () => {
    it("deve ser pt-BR", () => {
      expect(DEFAULT_LOCALE).toBe("pt-BR");
    });

    it("deve estar presente em SUPPORTED_LOCALES", () => {
      expect(SUPPORTED_LOCALES).toContain(DEFAULT_LOCALE);
    });
  });

  describe("COOKIE_NAME", () => {
    it("deve ser safer_locale", () => {
      expect(COOKIE_NAME).toBe("safer_locale");
    });
  });

  describe("isSupportedLocale()", () => {
    it("deve retornar true para pt-BR", () => {
      expect(isSupportedLocale("pt-BR")).toBe(true);
    });

    it("deve retornar true para en", () => {
      expect(isSupportedLocale("en")).toBe(true);
    });

    it("deve retornar true para es", () => {
      expect(isSupportedLocale("es")).toBe(true);
    });

    it("deve retornar true para de", () => {
      expect(isSupportedLocale("de")).toBe(true);
    });

    it("deve retornar false para locale não suportado", () => {
      expect(isSupportedLocale("fr")).toBe(false);
      expect(isSupportedLocale("ja")).toBe(false);
      expect(isSupportedLocale("it")).toBe(false);
    });

    it("deve retornar false para string vazia", () => {
      expect(isSupportedLocale("")).toBe(false);
    });

    it("deve retornar false para undefined", () => {
      expect(isSupportedLocale()).toBe(false);
    });

    it("deve retornar false para valores com case diferente", () => {
      expect(isSupportedLocale("PT-BR")).toBe(false);
      expect(isSupportedLocale("EN")).toBe(false);
      expect(isSupportedLocale("pt-br")).toBe(false);
    });

    it("deve retornar false para valores inválidos", () => {
      expect(isSupportedLocale("123")).toBe(false);
      expect(isSupportedLocale("pt_BR")).toBe(false);
      expect(isSupportedLocale("pt")).toBe(false);
    });
  });

  describe("getCookieName()", () => {
    it("deve retornar o nome correto do cookie", () => {
      expect(getCookieName()).toBe("safer_locale");
    });

    it("deve retornar o mesmo valor de COOKIE_NAME", () => {
      expect(getCookieName()).toBe(COOKIE_NAME);
    });
  });
});
