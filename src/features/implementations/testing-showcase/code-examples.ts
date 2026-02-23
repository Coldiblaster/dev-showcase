/**
 * Trechos de código dos exemplos da página Testing Showcase.
 * Mantidos fora das traduções (JSON) para evitar que next-intl interprete
 * { } e " " como placeholders e quebre com INVALID_ARGUMENT_TYPE.
 *
 * Tipos: config (Vitest), util (Vitest/Jest), hook (Vitest+TL), componente (Vitest+TL), config com Jest.
 */

export const CONFIG_TEST_CODE = `import { describe, expect, it } from "vitest";

import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "../config";

describe("i18n/config", () => {
  it("deve incluir pt-BR como locale suportado", () => {
    expect(SUPPORTED_LOCALES).toContain("pt-BR");
  });

  it("deve ter DEFAULT_LOCALE em SUPPORTED_LOCALES", () => {
    expect(SUPPORTED_LOCALES).toContain(DEFAULT_LOCALE);
  });
});`;

/** Função pura: mesmo código funciona com Vitest ou Jest (só trocar o import). */
export const UTIL_TEST_CODE = `import { describe, expect, it } from "vitest";

import { formatSlug } from "../formatSlug";

describe("formatSlug", () => {
  it("normaliza texto para slug", () => {
    expect(formatSlug("Hello World")).toBe("hello-world");
  });

  it("remove acentos", () => {
    expect(formatSlug("Ação")).toBe("acao");
  });
});`;

export const HOOK_TEST_CODE = `import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { useMyHook } from "../useMyHook";

describe("useMyHook", () => {
  it("retorna valor inicial e atualiza após ação", async () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current.value).toBe(0);
    result.current.increment();
    await waitFor(() => {
      expect(result.current.value).toBe(1);
    });
  });
});`;

export const COMPONENT_TEST_CODE = `import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { SubmitButton } from "../SubmitButton";

describe("SubmitButton", () => {
  it("exibe label e chama onSubmit ao clicar", () => {
    const onSubmit = vi.fn();
    render(<SubmitButton label="Enviar" onSubmit={onSubmit} />);

    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});`;

/** Mesmo teste de config, com Jest. Útil para quem usa Jest. */
export const JEST_CONFIG_TEST_CODE = `import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "../config";

describe("i18n/config", () => {
  it("deve incluir pt-BR como locale suportado", () => {
    expect(SUPPORTED_LOCALES).toContain("pt-BR");
  });

  it("deve ter DEFAULT_LOCALE em SUPPORTED_LOCALES", () => {
    expect(SUPPORTED_LOCALES).toContain(DEFAULT_LOCALE);
  });
});`;
