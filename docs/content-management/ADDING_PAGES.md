# Como Adicionar Novas Paginas

Guia pratico para adicionar paginas de **Dicas**, **Implementacoes** ou **Ferramentas** no projeto.

---

## O que voce vai fazer

Criar uma nova pagina acessivel via URL, tipo:
- `/dicas/sua-nova-pagina` (guia)
- `/implementacoes/sua-implementacao` (showcase tecnico)
- `/ferramentas/sua-ferramenta` (ferramenta interativa)

**Tempo estimado:** 15-20 minutos

---

## Passo a Passo

### 1. Registrar no arquivo de conteudo

**Arquivo:** `src/data/content.ts`

Adicione um novo objeto no array `CONTENT_ITEMS`:

```typescript
{
  slug: "react-patterns",                // URL: /dicas/react-patterns
  title: "React Patterns Essenciais",    // Titulo da pagina (SEO)
  description: "Composicao, hooks...",   // Descricao (SEO)
  component: "ReactPatternsPage",        // Nome do componente React
  category: "guide",                     // "guide", "implementation" ou "tool"
}
```

**Categorias disponiveis:**

| Category | Rota gerada | Exemplo |
|----------|------------|---------|
| `guide` | `/dicas/[slug]` | `/dicas/react-patterns` |
| `implementation` | `/implementacoes/[slug]` | `/implementacoes/seo` |
| `tool` | `/ferramentas/[slug]` | `/ferramentas/code-review` |

**Por que?** Este arquivo e o indice de todas as paginas. O sistema le daqui para saber quais paginas existem, gerar o sitemap e listar no menu.

---

### 2. Criar a feature

**Pasta:** `src/features/guides/react-patterns/` (ou `implementations/` se for implementacao)

Crie a pasta com a estrutura recomendada:

```
src/features/guides/react-patterns/
├── index.tsx              # Componente principal (composicao)
├── constants.ts           # Constantes e dados (opcional)
├── types.ts               # Tipos (opcional)
├── hero-section.tsx       # Sub-componentes por secao
├── examples-section.tsx
└── checklist-section.tsx
```

**Componente principal (`index.tsx`):**

```tsx
"use client";

import { useTranslations } from "next-intl";

import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { SectionWrapper } from "@/components/section-wrapper";

/** Pagina de React Patterns com exemplos praticos. */
export function ReactPatternsPage() {
  const t = useTranslations("reactPatternsPage");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        title={t("hero.title")}
        description={t("hero.description")}
      />
      <SectionDivider />
      <SectionWrapper>
        {/* Suas secoes aqui */}
      </SectionWrapper>
    </div>
  );
}
```

**Dica:** Use os componentes reutilizaveis existentes. Veja o [catalogo completo](../architecture/COMPONENTS.md).

---

### 3. Registrar no helper de paginas

**Arquivo:** `src/data/dynamic-page-helper.tsx`

Importe e adicione seu componente no `COMPONENT_MAP`:

```tsx
import { ReactPatternsPage } from "@/features/guides/react-patterns";

const COMPONENT_MAP: Record<string, React.ComponentType> = {
  // ... existentes
  ReactPatternsPage,  // Adicione aqui
};
```

**Por que?** O helper conecta o slug (URL) ao componente React. Sem isso, acessar a URL resulta em 404.

---

### 4. Criar traducoes

**Arquivo:** `messages/pt-BR/reactPatternsPage.json`

```json
{
  "hero": {
    "badge": "Guia",
    "title": "React Patterns Essenciais",
    "description": "Padroes de composicao, hooks customizados e mais"
  },
  "sections": {
    "composition": {
      "title": "Composicao",
      "description": "..."
    }
  }
}
```

**Registrar o namespace:**

1. Adicione em `messages/pt-BR/index.ts`:

```typescript
import reactPatternsPage from "./reactPatternsPage.json";

export default {
  // ... existentes
  reactPatternsPage,
};
```

2. Adicione em `src/lib/i18n/types.d.ts`:

```typescript
import type reactPatternsPage from "../../messages/pt-BR/reactPatternsPage.json";

type Messages = {
  // ... existentes
  reactPatternsPage: typeof reactPatternsPage;
};
```

3. Gere traducoes para outros idiomas:

```bash
pnpm translate
pnpm validate:i18n
```

---

### 5. Adicionar ao menu

**Arquivo:** `src/components/navbar/nav-data.ts`

Adicione o item no submenu correspondente (guias ou implementacoes):

```typescript
{
  icon: Layers,
  label: t("reactPatterns"),
  sublabel: t("reactPatternsDesc"),
  href: "/dicas/react-patterns",
}
```

**Traducoes do menu:** Adicione em `messages/pt-BR/nav.json`:

```json
{
  "reactPatterns": "React Patterns",
  "reactPatternsDesc": "Composicao, hooks e boas praticas"
}
```

---

### 6. Criar loading skeleton

**Arquivo:** `src/app/dicas/[slug]/loading.tsx` (ou `ferramentas/[slug]/` ou `implementacoes/[slug]/`)

Se a rota dinamica ainda nao tem `loading.tsx`, crie:

```tsx
import { PageSkeleton } from "@/components/page-skeleton";

export default function Loading() {
  return <PageSkeleton variant="guide" />;
}
```

Use a variant correspondente: `"guide"`, `"implementation"` ou `"tool"`.

---

### 7. Adicionar a busca global

**Arquivo:** `src/components/global-search/search-data.ts`

Adicione o item para que apareca nos resultados de busca (`Ctrl+K`):

```typescript
{
  title: t("reactPatterns"),
  href: "/dicas/react-patterns",
  category: "tips" as const,  // "tips", "implementations" ou "tools"
}
```

---

### 8. Testar

```bash
# 1. Dev server
pnpm dev

# 2. Acesse
http://localhost:3000/dicas/react-patterns

# 3. Valide build
pnpm build
```

---

## Estrutura de arquivos (resumo)

```
src/
├── app/dicas/[slug]/
│   └── loading.tsx              # 6. Loading skeleton
├── data/
│   ├── content.ts               # 1. Registre aqui
│   └── dynamic-page-helper.tsx  # 3. Mapeie aqui
├── features/
│   └── guides/
│       └── react-patterns/      # 2. Crie aqui
│           ├── index.tsx
│           └── ...
└── components/
    ├── navbar/nav-data.ts       # 5. Menu aqui
    └── global-search/search-data.ts  # 7. Busca global

messages/
└── pt-BR/
    ├── reactPatternsPage.json   # 4. Traducoes
    ├── nav.json                 # 5. Menu traducoes
    └── index.ts                 # 4. Barrel export
```

**Voce mexe nos arquivos marcados com numeros!**

---

## Componentes disponiveis

Antes de criar componentes do zero, veja o que ja existe:

| Componente | Uso |
|------------|-----|
| `HeroSection` | Cabecalho com badge, titulo e descricao |
| `SectionWrapper` | Wrapper com padding e max-width |
| `SectionHeader` | Titulo + subtitulo de secao |
| `SectionDivider` | Separador visual |
| `SectionNav` | Navegacao fixa entre secoes (desktop) |
| `StepCard` | Card de etapa com icone e numeracao |
| `CodeBlock` | Bloco de codigo com syntax highlight |
| `ViewSource` | Toggle conteudo/codigo |
| `FeatureCard` | Card de feature |
| `ScoreGauge` | Medidor circular de pontuacao |
| `CtaSection` | Call-to-action final |
| `PageSkeleton` | Loading skeleton (usado no loading.tsx) |

> Catalogo completo: [Componentes Reutilizaveis](../architecture/COMPONENTS.md)

---

## Problemas comuns

### Erro: "Component not found"
**Causa:** O nome do componente em `content.ts` nao bate com o `COMPONENT_MAP`.
**Solucao:** Verifique se o valor de `component` e EXATAMENTE igual a chave no map.

### Pagina 404
**Causa:** `slug` errado em `content.ts` ou `category` invalida.
**Solucao:** Confira que `slug` corresponde a URL e `category` e `"guide"`, `"implementation"` ou `"tool"`.

### Traducoes nao aparecem
**Causa:** Namespace nao registrado no barrel ou types.
**Solucao:** Verifique `messages/pt-BR/index.ts` e `src/lib/i18n/types.d.ts`. Reinicie o TS Server (`Ctrl+Shift+P` > "TypeScript: Restart TS Server").

### Autocomplete de traducoes nao funciona
**Causa:** TypeScript cache desatualizado.
**Solucao:** Reinicie o TS Server ou recarregue o VS Code.

---

## Exemplo de referencia

Veja features existentes como base:

| Feature | Path | Categoria | Complexidade |
|---------|------|-----------|-------------|
| AI Tips | `src/features/guides/ai-tips/` | guide | Composto (subdiretório) |
| Security Tips | `src/features/guides/security-tips/` | guide | Media (subpasta) |
| React Patterns | `src/features/guides/react-patterns/` | guide | Simples (3 secoes) |
| SEO Showcase | `src/features/implementations/seo-showcase/` | implementation | Complexa (muitas secoes) |
| Code Review | `src/features/implementations/code-review/` | tool | Complexa (hook, tipos, sub-componentes) |
| Regex Playground | `src/features/implementations/regex-playground/` | tool | Media (editor + patterns) |
