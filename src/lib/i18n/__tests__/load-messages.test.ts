// src/i18n/__tests__/load-messages.test.ts
import { describe, expect, it } from "vitest";

import { loadMessages, NAMESPACES } from "../load-messages";

describe("i18n/load-messages", () => {
  describe("NAMESPACES", () => {
    it("deve incluir namespace global", () => {
      expect(NAMESPACES).toContain("global");
    });

    it("deve incluir namespace auth", () => {
      expect(NAMESPACES).toContain("auth");
    });

    it("deve incluir namespace components", () => {
      expect(NAMESPACES).toContain("components");
    });

    it("deve incluir namespace errors", () => {
      expect(NAMESPACES).toContain("errors");
    });

    it("deve ter ao menos 8 namespaces", () => {
      expect(NAMESPACES.length).toBeGreaterThanOrEqual(8);
    });
  });

  describe("loadMessages()", () => {
    it("deve carregar mensagens para pt-BR", async () => {
      const messages = await loadMessages("pt-BR");
      expect(messages).toBeDefined();
      expect(typeof messages).toBe("object");
      expect(Object.keys(messages).length).toBeGreaterThan(0);
    });

    it("deve carregar mensagens para en", async () => {
      const messages = await loadMessages("en");
      expect(messages).toBeDefined();
      expect(typeof messages).toBe("object");
    });

    it("deve carregar mensagens para es", async () => {
      const messages = await loadMessages("es");
      expect(messages).toBeDefined();
      expect(typeof messages).toBe("object");
    });

    it("deve fazer fallback para pt-BR quando locale não existe", async () => {
      const messages = await loadMessages("de");
      expect(messages).toBeDefined();
      expect(typeof messages).toBe("object");
      // Verifica se retornou algo (fallback pt-BR)
      expect(Object.keys(messages).length).toBeGreaterThan(0);
    });

    it("deve fazer fallback para pt-BR com locale inválido", async () => {
      const messages = await loadMessages("invalid-locale");
      expect(messages).toBeDefined();
    });

    it("deve retornar objeto com namespaces esperados para pt-BR", async () => {
      const messages = await loadMessages("pt-BR");
      // Verifica que algum namespace está presente
      const keys = Object.keys(messages);
      const hasNamespace = NAMESPACES.some((ns) => keys.includes(ns));
      expect(hasNamespace).toBe(true);
    });
  });
});
