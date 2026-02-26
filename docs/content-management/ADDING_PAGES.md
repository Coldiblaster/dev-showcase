# Como Adicionar Novas Paginas

Guia pratico para adicionar paginas de **Dicas**, **Implementacoes** ou **Ferramentas** no projeto.

---

## O que voce vai fazer

Criar uma nova pagina acessivel via URL, tipo:

- `/dicas/sua-nova-pagina` (guia)
- `/implementacoes/sua-implementacao` (showcase tecnico)
- `/ferramentas/sua-ferramenta` (ferramenta interativa)

**Tempo estimado:** 20-30 minutos

> **Dica:** O [Tutorial Interativo em `/contribua/tutorial`](/contribua/tutorial) cobre este fluxo passo a passo com exemplos de codigo e FAQs para cada etapa.

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

| Category         | Rota gerada              | Exemplo                    |
| ---------------- | ------------------------ | -------------------------- |
| `guide`          | `/dicas/[slug]`          | `/dicas/react-patterns`    |
| `implementation` | `/implementacoes/[slug]` | `/implementacoes/seo`      |
| `tool`           | `/ferramentas/[slug]`    | `/ferramentas/code-review` |

**Por que?** Este arquivo e o indice de todas as paginas. O sistema le daqui para saber quais paginas existem, gerar o sitemap e listar no menu.

---

### 2. Criar a feature

**Pasta:** `src/features/guides/react-patterns/` (ou `implementations/` se for implementacao)

Nome da pasta em **kebab-case** (nao PascalCase): `meu-guia/`, `react-patterns/` — nao `MeuGuia/` nem `ReactPatterns/`.

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
      <SectionWrapper>{/* Suas secoes aqui */}</SectionWrapper>
    </div>
  );
}
```

**Dica:** Use os componentes reutilizaveis existentes. Veja o [catalogo completo](../architecture/COMPONENTS.md).

---

### 3. Registrar no helper de paginas

**Arquivo:** `src/lib/dynamic-page-helper.tsx`

Adicione ao `COMPONENT_MAP` com `dynamic()` (lazy loading). Nao use import estatico:

```tsx
ReactPatternsPage: dynamic(() =>
  import("@/features/guides/react-patterns").then((m) => m.ReactPatternsPage),
),
```

Componente = PascalCase. Caminho do import = kebab-case (`react-patterns`).

**Por que?** O helper conecta o slug (URL) ao componente React. Sem isso, acessar a URL resulta em 404.

---

### 4. Adicionar icone na pagina de listagem

**Arquivo:** `src/app/dicas/page.tsx` (ou `implementacoes/page.tsx` / `ferramentas/page.tsx`)

Adicione o icone no `iconMap` da pagina de listagem correspondente:

```tsx
import { Layers } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  // ... existentes
  "react-patterns": Layers, // slug → icone
};
```

**Por que?** A pagina de listagem (ex: `/dicas`) exibe um card com icone para cada item. Sem isso, o icone fica em branco.

---

### 5. Criar traducoes

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

2. Adicione em `src/lib/i18n/load-messages.ts` (array NAMESPACES):

```typescript
"reactPatternsPage",
```

3. Adicione em `src/lib/i18n/types.d.ts`:

```typescript
import type reactPatternsPage from "../../../messages/pt-BR/reactPatternsPage.json";

type Messages = {
  // ... existentes
  reactPatternsPage: typeof reactPatternsPage;
};
```

4. Gere traducoes para outros idiomas:

```bash
pnpm translate
pnpm validate:i18n
```

---

### 6. Adicionar ao menu

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

### 7. Adicionar a busca global

A pagina precisa aparecer em dois lugares para a busca funcionar:

**1. `src/components/global-search/search-data.ts`** — adicione o slug ao `tagMap` em `buildTags()`:

```typescript
"react-patterns": ["react", "patterns", "hooks", "composição", "design"],
```

**2. `messages/pt-BR/search.json`** — adicione em `items` (a busca usa `items.[slug].title` e `items.[slug].description`):

```json
"items": {
  "react-patterns": {
    "title": "React Patterns",
    "description": "Composicao, hooks customizados e boas praticas"
  }
}
```

Depois: `pnpm translate` para en, es, de.

---

### 8. Atualizar o chatbot (system-prompt)

**Arquivo:** `src/lib/chat/system-prompt.ts`

Adicione a nova pagina na secao PAGINAS correspondente (Implementacoes, Ferramentas ou Guias). O chatbot usa essa lista para recomendar paginas aos visitantes. Sem isso, a IA nao conhece o novo conteudo.

Exemplo para guia:

```
- ${PERSONAL.siteUrl}/dicas/react-patterns — React Design Patterns (Composition, Hooks, performance)
```

---

### 9. Criar loading skeleton

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

### 10. Testar

```bash
# 1. Dev server
pnpm dev

# 2. Acesse
http://localhost:3000/dicas/react-patterns

# 3. Valide build
pnpm build
```

### Opcional: Analytics (nome na pagina de stats)

Se quiser que a pagina apareca com nome traduzido em `/contribua` (Top paginas), adicione em `messages/pt-BR/contributePage.json` (e nos outros idiomas via `pnpm translate`):

```json
"platformStats": {
  "pageNames": {
    "/dicas/react-patterns": "React Patterns"
  }
}
```

---

## Estrutura de arquivos (resumo)

```
src/
├── app/
│   ├── dicas/page.tsx              # 4. iconMap (icone do card na listagem)
│   └── dicas/[slug]/
│       └── loading.tsx             # 9. Loading skeleton
├── data/
│   └── content.ts                  # 1. Registre aqui
├── lib/
│   └── dynamic-page-helper.tsx     # 3. Mapeie aqui (COMPONENT_MAP)
├── features/
│   └── guides/
│       └── react-patterns/         # 2. Crie aqui
│           ├── index.tsx
│           └── ...
└── components/
    ├── navbar/nav-data.ts           # 6. Menu aqui
    └── global-search/search-data.ts # 7. Busca global

src/lib/chat/
└── system-prompt.ts                 # 8. Chatbot (IA conhece a pagina)

messages/
└── pt-BR/
    ├── reactPatternsPage.json       # 5. Traducoes da pagina
    ├── nav.json                     # 6. Traducoes do menu
    ├── search.json                  # 7. Traducoes da busca
    └── index.ts                     # 5. Barrel export
```

**Voce mexe nos arquivos marcados com numeros!** Incluindo system-prompt.ts para o chatbot conhecer a nova pagina.

---

## Componentes disponiveis

Antes de criar componentes do zero, veja o que ja existe:

| Componente        | Uso                                            |
| ----------------- | ---------------------------------------------- |
| `HeroSection`     | Cabecalho com badge, titulo e descricao        |
| `SectionWrapper`  | Wrapper com padding e max-width                |
| `SectionHeader`   | Titulo + subtitulo de secao                    |
| `SectionDivider`  | Separador visual                               |
| `SectionNav`      | Navegacao fixa entre secoes (desktop)          |
| `StepCard`        | Card de etapa com icone e numeracao            |
| `CodeBlock`       | Bloco de codigo com syntax highlight           |
| `ViewSource`      | Toggle conteudo/codigo                         |
| `FeatureCard`     | Card de feature                                |
| `ScoreGauge`      | Medidor circular de pontuacao                  |
| `CtaSection`      | Call-to-action final                           |
| `PageSkeleton`    | Loading skeleton (usado no loading.tsx)        |
| `AnimatedSection` | Animacao fade-up ao entrar no viewport         |
| `Accordion`       | Acordeao expansivel (FAQs, listas colapsaveis) |

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

| Feature          | Path                                             | Categoria      | Complexidade                            |
| ---------------- | ------------------------------------------------ | -------------- | --------------------------------------- |
| AI Tips          | `src/features/guides/ai-tips/`                   | guide          | Composto (subdiretório)                 |
| Security Tips    | `src/features/guides/security-tips/`             | guide          | Media (subpasta)                        |
| React Patterns   | `src/features/guides/react-patterns/`            | guide          | Simples (3 secoes)                      |
| SEO Showcase     | `src/features/implementations/seo-showcase/`     | implementation | Complexa (muitas secoes)                |
| Code Review      | `src/features/implementations/code-review/`      | tool           | Complexa (hook, tipos, sub-componentes) |
| Regex Playground | `src/features/implementations/regex-playground/` | tool           | Media (editor + patterns)               |
