# Testes com i18n

Guia de como testar componentes que usam traducoes.

---

## Visao Geral

O sistema de testes suporta i18n automaticamente:

- Mensagens reais de pt-BR sao usadas (sem duplicacao de mocks)
- `renderWithProviders()` ja inclui `NextIntlClientProvider`
- Nenhuma configuracao extra necessaria na maioria dos casos

---

## Uso Basico

### Testar Componente com i18n

```tsx
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@tests/utils";

import { MyComponent } from "./my-component";

test("renderiza titulo traduzido", () => {
  renderWithProviders(<MyComponent />);

  // Mensagens de pt-BR sao usadas automaticamente
  expect(screen.getByText("Titulo Esperado")).toBeInTheDocument();
});
```

Pronto! Nao precisa de configuracao adicional.

---

## Casos Avancados

### 1. Sobrescrever Mensagens para um Teste

Se precisar testar com mensagens customizadas:

```tsx
import { renderWithProviders, mergeMessages } from "@tests/utils";

test("mostra mensagem customizada", () => {
  const customMessages = mergeMessages({
    hero: {
      title: "Custom Title",
    },
  });

  renderWithProviders(<HeroSection />, { customMessages });

  expect(screen.getByText("Custom Title")).toBeInTheDocument();
});
```

### 2. Testar com Mensagens Reais

```tsx
import messages from "@/messages/pt-BR";

test("mostra conteudo em portugues", () => {
  renderWithProviders(<MyComponent />, { customMessages: messages });

  expect(screen.getByText("Texto em PT-BR")).toBeInTheDocument();
});
```

### 3. Testar Hooks que Usam i18n

```tsx
import { renderHook } from "@testing-library/react";
import { createQueryClientWrapper } from "@tests/utils";

test("hook usa traducoes", () => {
  const { result } = renderHook(() => useMyHook(), {
    wrapper: createQueryClientWrapper(),
  });

  expect(result.current.message).toBe("Mensagem traduzida");
});
```

---

## Boas Praticas

### Faca

```tsx
// Use renderWithProviders para componentes com i18n
renderWithProviders(<MyComponent />);

// Use as mensagens reais de pt-BR nos expects
expect(screen.getByText("Titulo")).toBeInTheDocument();

// Sobrescreva apenas o necessario
const customMessages = mergeMessages({
  hero: { title: "Custom" },
});
```

### Nao Faca

```tsx
// Nao use render() direto (falta i18n provider)
render(<MyComponent />); // Vai quebrar se usar useTranslations()

// Nao crie mocks duplicados de mensagens
const mockMessages = { hero: { ... } }; // Ja temos messages de pt-BR!

// Nao force todos os testes a usar custom messages
// Use customMessages apenas quando realmente necessario
```

---

## Helpers Disponiveis

### `renderWithProviders()`

Renderiza componente com todos os providers (incluindo i18n).

```tsx
renderWithProviders(<MyComponent />, {
  customMessages, // Opcional: mensagens customizadas
  withRouter: true, // Opcional: adiciona router mock
});
```

### `createQueryClientWrapper()`

Wrapper para `renderHook()` com QueryClient e i18n.

```tsx
const { result } = renderHook(() => useMyHook(), {
  wrapper: createQueryClientWrapper(customMessages),
});
```

### `createQueryClientWrapperWithClient()`

Wrapper que retorna tambem o queryClient (util para spies).

```tsx
import { createQueryClientWrapperWithClient } from "@tests/utils";

test("invalida cache apos mutation", async () => {
  const { wrapper, queryClient } = createQueryClientWrapperWithClient();
  const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

  const { result } = renderHook(() => useCreateItem(), { wrapper });

  result.current.mutate(data);

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(invalidateSpy).toHaveBeenCalled();
});
```

### `mergeMessages()`

Mescla mensagens customizadas com as mensagens padrao de pt-BR.

```tsx
const custom = mergeMessages({
  hero: { title: "Override" },
});
// Resultado: todas mensagens de pt-BR + override no hero.title
```

---

## Troubleshooting

### Erro: "context from NextIntlClientProvider was not found"

**Causa:** Componente usa `useTranslations()` mas teste nao usa `renderWithProviders()`.

**Solucao:**

```tsx
// Antes (errado)
render(<MyComponent />);

// Depois (correto)
renderWithProviders(<MyComponent />);
```

### Mensagem esperada nao aparece

**Causa:** Texto pode estar diferente se o teste antigo tinha mock em ingles.

**Solucao:** Use as mensagens reais de pt-BR:

```tsx
expect(screen.getByText("Titulo")).toBeInTheDocument(); // pt-BR
// Nao: expect(screen.getByText("Title")).toBeInTheDocument(); // ingles antigo
```

### Preciso adicionar traducao em novo namespace

Nao precisa fazer nada especial nos testes! O sistema importa `messages/pt-BR/index.ts` automaticamente. Quando voce adicionar um novo namespace:

1. Crie `messages/pt-BR/meuNamespace.json`
2. Exporte no `messages/pt-BR/index.ts`
3. Rode `pnpm translate`

Os testes ja funcionarao automaticamente.

---

## Estrutura nos Testes

```
tests/utils.tsx
├── import messages from "../messages/pt-BR"   ← Mensagens reais
├── mergeMessages()                            ← Helper para customizacao
├── renderWithProviders()                      ← Inclui NextIntlClientProvider
└── createQueryClientWrapper()                 ← Inclui NextIntlClientProvider

Beneficios:
- Sem duplicacao de codigo
- Sem manutencao dupla (messages/ e tests/)
- Sempre sincronizado com producao
- Facil customizacao quando necessario
```

---

## Ver Tambem

- [INDEX.md](./INDEX.md) — Hub de navegacao i18n
- [QUICK_START.md](./QUICK_START.md) — Como usar i18n em componentes
- [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md) — Como adicionar traducoes
- [BEST_PRACTICES.md](./BEST_PRACTICES.md) — Convencoes e padroes
