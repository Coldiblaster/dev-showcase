/**
 * Exemplos de JSON para a ferramenta. Clique no card preenche o editor.
 * Nomes e descrições vêm das traduções (jsonPage.examples.items.{id}).
 */
export const JSON_EXAMPLE_KEYS = [
  "user",
  "config",
  "apiResponse",
  "array",
  "nested",
] as const;

export type JsonExampleId = (typeof JSON_EXAMPLE_KEYS)[number];

/** Nomes no padrão de testes (Joe, Jane). */
export const JSON_EXAMPLES: Record<JsonExampleId, string> = {
  user: JSON.stringify({
    name: "Joe",
    email: "joe@example.com",
    active: true,
    createdAt: "2024-01-15T10:00:00Z",
  }),
  config: JSON.stringify({
    env: "production",
    debug: false,
    timeout: 3000,
    features: { darkMode: true, notifications: true },
  }),
  apiResponse: JSON.stringify({
    data: [
      { id: 1, name: "Item 1", quantity: 2 },
      { id: 2, name: "Item 2", quantity: 1 },
    ],
    total: 2,
    page: 1,
  }),
  array: JSON.stringify([1, 2, 3, "a", "b", true, null, { key: "value" }]),
  nested: JSON.stringify({
    user: { name: "Joe", roles: ["admin", "editor"] },
    settings: { theme: "dark", language: "pt-BR" },
  }),
};
