# 🧪 Testes com i18n

Guia de como testar componentes que usam traduções.

---

## 🎯 Visão Geral

O sistema de testes já está configurado para suportar i18n automaticamente:

- ✅ **Mensagens reais de pt-BR** são usadas (sem duplicação de mocks)
- ✅ **`renderWithProviders()`** já inclui `NextIntlClientProvider`
- ✅ **Todos os helpers** suportam i18n out-of-the-box
- ✅ **Nenhuma configuração extra** necessária na maioria dos casos

---

## 🚀 Uso Básico

### Testar Componente com i18n

```tsx
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@tests/utils";

import { MyComponent } from "./my-component";

test("renderiza título traduzido", () => {
  renderWithProviders(<MyComponent />);

  // Mensagens de pt-BR são usadas automaticamente
  expect(screen.getByText("Bem-vindo")).toBeInTheDocument();
});
```

**Pronto!** Não precisa de configuração adicional. 🎉

---

## 🔧 Casos Avançados

### 1. Sobrescrever Mensagens para um Teste Específico

Se precisar testar com mensagens customizadas:

```tsx
import { renderWithProviders, mergeMessages } from "@tests/utils";

test("mostra mensagem de erro customizada", () => {
  const customMessages = mergeMessages({
    errors: {
      notFound: {
        title: "Custom Error Title",
      },
    },
  });

  renderWithProviders(<ErrorPage />, { customMessages });

  expect(screen.getByText("Custom Error Title")).toBeInTheDocument();
});
```

### 2. Testar com Diferentes Idiomas

```tsx
import messages from "@/messages/pt-BR";

test("mostra conteúdo em português", () => {
  // pt-BR é padrão, mas você pode ser explícito
  renderWithProviders(<MyComponent />, { customMessages: messages });

  expect(screen.getByText("Salvar")).toBeInTheDocument();
});
```

### 3. Testar Hooks que Usam i18n

```tsx
import { renderHook } from "@testing-library/react";
import { createQueryClientWrapper } from "@tests/utils";

test("hook usa traduções", () => {
  const { result } = renderHook(() => useMyHook(), {
    wrapper: createQueryClientWrapper(),
  });

  // Hook tem acesso ao useTranslations()
  expect(result.current.message).toBe("Mensagem traduzida");
});
```

---

## 📝 Boas Práticas

### ✅ Do (Faça)

```tsx
// ✅ Use renderWithProviders para componentes com i18n
renderWithProviders(<MyComponent />);

// ✅ Use as mensagens reais de pt-BR nos expects
expect(screen.getByText("Salvar")).toBeInTheDocument();

// ✅ Sobrescreva apenas o necessário
const customMessages = mergeMessages({
  auth: { login: { title: "Custom" } },
});
```

### ❌ Don't (Não faça)

```tsx
// ❌ Não use render() direto (falta i18n provider)
render(<MyComponent />); // Vai quebrar se usar useTranslations()

// ❌ Não crie mocks duplicados de mensagens
const mockMessages = { auth: { ... } }; // Já temos messages de pt-BR!

// ❌ Não force todos os testes a usar custom messages
// Use customMessages apenas quando realmente necessário
```

---

## 🛠️ Helpers Disponíveis

### `renderWithProviders()`

Renderiza componente com todos os providers (incluindo i18n).

```tsx
renderWithProviders(<MyComponent />, {
  customMessages, // Opcional: mensagens customizadas
  withRouter: true, // Opcional: adiciona router mock
  withSidebar: true, // Opcional: adiciona sidebar provider
});
```

### `createQueryClientWrapper()`

Wrapper para `renderHook()` com QueryClient e i18n.

```tsx
const { result } = renderHook(() => useMyHook(), {
  wrapper: createQueryClientWrapper(customMessages), // customMessages opcional
});
```

### `createQueryClientWrapperWithClient()`

Wrapper com QueryClient e i18n, retornando também o queryClient.
Útil quando você precisa fazer spy ou acessar o queryClient diretamente.

```tsx
import { createQueryClientWrapperWithClient } from "@tests/utils";

test("invalida cache após mutation", async () => {
  const { wrapper, queryClient } = createQueryClientWrapperWithClient();
  const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
  
  const { result } = renderHook(() => useCreatePlant(), { wrapper });
  
  result.current.mutate(plantData);
  
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["plants"] });
});
```

### `mergeMessages()`

Mescla mensagens customizadas com as mensagens padrão.

```tsx
const custom = mergeMessages({
  auth: { login: { title: "Override" } },
});
// Resultado: todas mensagens de pt-BR + override no auth.login.title
```

### `createTestWrapper()`

Wrapper completo com todas as opções.

```tsx
const wrapper = createTestWrapper({
  withQueryClient: true,
  withRouter: true,
  withSidebar: true,
  customMessages,
});
```

---

## 🔍 Troubleshooting

### Erro: "context from NextIntlClientProvider was not found"

**Causa:** Componente usa `useTranslations()` mas teste não usa `renderWithProviders()`

**Solução:**

```tsx
// ❌ Antes
render(<MyComponent />);

// ✅ Depois
renderWithProviders(<MyComponent />);
```

### Mensagem esperada não aparece

**Causa:** Texto pode estar em inglês se o teste antigo tinha mock em inglês

**Solução:**

```tsx
// Agora usa pt-BR por padrão
expect(screen.getByText("Salvar")).toBeInTheDocument(); // ✅
expect(screen.getByText("Save")).toBeInTheDocument(); // ❌ (era o antigo mock)
```

### Preciso adicionar tradução em novo módulo

**Não precisa fazer nada!** 🎉

O sistema importa `messages/pt-BR/index.ts` automaticamente. Quando você adicionar um novo módulo:

1. Crie `messages/pt-BR/meu-modulo/index.ts`
2. Exporte no `messages/pt-BR/index.ts`
3. Rode `pnpm run translate`

**Os testes já funcionarão automaticamente!** Não precisa atualizar mocks.

---

## 📊 Estrutura de Mensagens nos Testes

```
tests/utils.tsx
├── import messages from "../messages/pt-BR"  ← Mensagens reais
├── mergeMessages() ← Helper para customização
├── renderWithProviders() ← Já inclui NextIntlClientProvider
└── createQueryClientWrapper() ← Já inclui NextIntlClientProvider

Benefícios:
✅ Sem duplicação de código
✅ Sem manutenção dupla (messages/ e tests/)
✅ Sempre sincronizado com produç
ão
✅ Fácil customização quando necessário
```

---

## 🔗 Ver Também

- [INDEX.md](./INDEX.md) - Hub de navegação i18n
- [QUICK_START.md](./QUICK_START.md) - Como usar i18n em componentes
- [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md) - Como adicionar traduções
- [BEST_PRACTICES.md](./BEST_PRACTICES.md) - Convenções e padrões

---

**Última atualização:** Janeiro 2026
