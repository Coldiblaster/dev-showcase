import { describe, expect, it } from "vitest";

import { loadMessages, NAMESPACES } from "../load-messages";

describe("i18n/load-messages", () => {
  describe("NAMESPACES", () => {
    it("deve incluir namespaces essenciais", () => {
      const required = ["global", "nav", "hero", "contact", "footer", "search"];
      for (const ns of required) {
        expect(NAMESPACES).toContain(ns);
      }
    });

    it("deve incluir namespaces de paginas", () => {
      const pages = [
        "securityPage",
        "seoPage",
        "i18nPage",
        "codeReviewPage",
        "reactPatterns",
      ];
      for (const ns of pages) {
        expect(NAMESPACES).toContain(ns);
      }
    });

    it("deve ter ao menos 30 namespaces", () => {
      expect(NAMESPACES.length).toBeGreaterThanOrEqual(30);
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

    it("deve fazer fallback para pt-BR com locale invalido", async () => {
      const messages = await loadMessages("invalid-locale");
      expect(messages).toBeDefined();
      expect(Object.keys(messages).length).toBeGreaterThan(0);
    });

    it("deve retornar objeto com namespaces esperados para pt-BR", async () => {
      const messages = await loadMessages("pt-BR");
      const keys = Object.keys(messages);
      const hasNamespace = NAMESPACES.some((ns) => keys.includes(ns));
      expect(hasNamespace).toBe(true);
    });
  });
});
