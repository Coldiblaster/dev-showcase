# Prompt — Regras Completas do Projeto Dev Showcase

> Copie o bloco abaixo e cole no chat da IA antes de pedir qualquer criação ou modificação no projeto.

---

## BLOCO PARA COPIAR (início)

```
Você é um assistente especializado no projeto Dev Showcase. Ao criar ou modificar qualquer código, você DEVE seguir rigorosamente as regras abaixo. Consulte a documentação em docs/ quando necessário.

---

## 1. ESTRUTURA DO PROJETO

```

src/
├── app/ # Rotas e API routes (Next.js App Router)
├── components/ # Componentes reutilizáveis (globais)
├── features/ # Features por domínio (guides, implementations, tools)
├── data/ # Registro de conteúdo (content.ts, changelog.ts)
├── hooks/ # Hooks customizados
└── lib/ # Infraestrutura (i18n, api-security, seo, etc.)

messages/ # Traduções (pt-BR = fonte de verdade)
docs/ # Documentação técnica

```

---

## 2. CONVENÇÕES DE CÓDIGO

### Componentes
- Nomes em PascalCase: `ScoreGauge`, `StepCard`
- Um componente por arquivo
- **Arquivos e pastas em kebab-case** — não PascalCase: `meu-componente.tsx`, pasta `meu-guia/` (não `MeuComponente.tsx` nem `MeuGuia/`)
- JSDoc em português: `/** Medidor circular de pontuação. */`
- Props com interface tipada

### Features
- Features em `src/features/` organizadas por domínio:
  - `guides/` → guias (category: "guide")
  - `implementations/` → implementações e ferramentas (category: "implementation" ou "tool")
- Estrutura de feature complexa:
```

src/features/guides/react-patterns/
├── index.tsx
├── constants.ts
├── types.ts
└── sections/

````

### Reutilização
- Verifique o catálogo em docs/architecture/COMPONENTS.md antes de criar
- Componentes reutilizáveis → `src/components/`
- Componentes específicos de feature → pasta da feature

### Estilo
- Tailwind CSS 4 (nunca CSS inline ou arquivos .css)
- Framer Motion para animações (variants em lib/animation-variants.ts)
- shadcn/ui para primitivos
- Responsividade obrigatória (mobile-first)

---

## 3. INTERNACIONALIZAÇÃO (i18n) — REGRA CRÍTICA

### Nada de texto fixo. Sempre tradução.
- pt-BR é a FONTE DE VERDADE. NUNCA edite en/es/de manualmente.
- TODO texto visível ao usuário usa `useTranslations()` ou `getTranslations()`.
- NUNCA hardcode strings — nem em português, nem em inglês. Zero exceções.
- aria-label, title, placeholder, mensagens de erro — tudo via t().

### Novo namespace
1. Crie `messages/pt-BR/meuNamespace.json`
2. Adicione em `messages/pt-BR/index.ts` (e en, es, de)
3. Adicione em `src/lib/i18n/load-messages.ts` (array NAMESPACES)
4. Adicione em `src/lib/i18n/types.d.ts`
5. Execute: `pnpm translate` e `pnpm validate:i18n`

### Uso no componente
```tsx
const t = useTranslations("meuNamespace");
return <h1>{t("hero.title")}</h1>;
````

### Comandos obrigatórios

```bash
pnpm translate        # Gera traduções para en, es, de
pnpm validate:i18n    # Valida sincronização
pnpm check:pt-leaks   # Detecta português vazando em outros idiomas
```

---

## 4. ADICIONAR NOVA PÁGINA (guia, implementação, ferramenta)

### Fluxo completo (11 passos)

1. **content.ts** — Registrar em CONTENT_ITEMS:

   ```ts
   { slug: "meu-slug", title: "...", description: "...", component: "MeuComponente", category: "guide" }
   ```

   category: "guide" | "implementation" | "tool"

2. **Criar feature** em `src/features/guides/` ou `implementations/`:
   - Pasta em kebab-case: `meu-guia/` (não `MeuGuia/`)
   - index.tsx com composição principal
   - subcomponentes se necessário

3. **dynamic-page-helper.tsx** — Adicionar ao COMPONENT_MAP:

   ```ts
   MeuComponente: dynamic(() =>
     import("@/features/guides/meu-guia").then((m) => m.MeuComponente),
   );
   ```

   Componente = PascalCase. Caminho do import = kebab-case.
   Guias em features/guides/, implementações e ferramentas em features/implementations/

4. **iconMap** em `src/app/dicas/page.tsx` (ou implementacoes/ferramentas):

   ```ts
   "meu-slug": MeuIcone
   ```

5. **Traduções** — Criar messages/pt-BR/meuPage.json e registrar namespace (ver seção 3)

6. **nav-data.ts** — Adicionar item no submenu + traduções em nav.json

7. **Busca global (Ctrl+K)** — Dois arquivos obrigatórios:
   - **search-data.ts**: Adicionar slug ao `tagMap` em `buildTags()` (tags para fuzzy search)
   - **search.json** (pt-BR): Adicionar `items.[slug].title` e `items.[slug].description`
   - Depois: `pnpm translate` para en, es, de

8. **system-prompt.ts** — Adicionar a nova página na seção PÁGINAS correspondente (Implementações, Ferramentas ou Guias). O chatbot usa essa lista para recomendar páginas aos visitantes. Sem isso, a IA não conhece o novo conteúdo.

9. **loading.tsx** — Criar em `src/app/dicas/[slug]/loading.tsx`:

   ```tsx
   <PageSkeleton variant="guide" />
   ```

   variant: "guide" | "implementation" | "tool"

10. **Testar** — `pnpm dev`, `pnpm build`

11. **Changelog** — Atualizar src/data/changelog.ts e CHANGELOG.md

### Ordem do fluxo (resumo)

content.ts → feature → dynamic-page-helper → iconMap → traduções (pt-BR) → nav → **busca (search-data + search.json)** → **chatbot (system-prompt.ts)** → loading → changelog

### URLs geradas

- guide → /dicas/[slug]
- implementation → /implementacoes/[slug]
- tool → /ferramentas/[slug]

---

## 5. SEGURANÇA DAS APIs

### Todas as API routes usam lib/api-security.ts

- `checkBodySize(req, max)` — antes de parse
- `safeParseBody(req)` — parse JSON seguro
- `checkApiKey()` — para rotas com OpenAI
- `sanitizeUserInput(text)` — anti prompt injection (dados de usuário)
- `sanitizeOutput(obj)` — anti XSS na resposta da IA
- `secureJsonHeaders()` — headers seguros
- `jsonError(msg, status)` — erro padronizado

### Rate limiting

- In-memory: `lib/rate-limit.ts`
- Redis: `lib/redis-rate-limit.ts` (para rotas com IA)

### Validação

- Zod schema em TODO input
- Zod schema na saída da IA (quando aplicável)

### Rotas com IA

- Delimitar dados do usuário com XML no prompt (ex: <pr_context>)
- response_format: { type: "json_object" } quando aplicável
- Sanitizar dados de terceiros (ex: bio do GitHub) antes de usar no prompt

---

## 6. ACESSIBILIDADE

- Skip link (`SkipLink`) — pula para main
- Focus trap em dialogs (terminal, chat)
- ARIA: role="dialog", aria-modal, aria-label em botões de ícone
- aria-label e sr-only traduzidos via i18n
- Navegação por teclado: Tab, Enter, Escape

---

## 7. COMMITS

Conventional Commits:

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
refactor: refatoração sem mudança funcional
style: formatação
test: testes
chore: build, config, deps
```

- Descrição em português ou inglês (consistente)
- Primeira letra minúscula, sem ponto final
- Imperativo: "adiciona" não "adicionado"

---

## 8. CHECKLIST ANTES DE PR

- [ ] pnpm lint passa
- [ ] pnpm build passa
- [ ] pnpm test passa
- [ ] Nenhum texto fixo — tudo em messages/pt-BR via useTranslations
- [ ] pnpm translate e pnpm validate:i18n executados
- [ ] Busca: slug em search-data.ts (tagMap) e search.json (items.[slug])
- [ ] Chatbot: nova página em system-prompt.ts (seção PÁGINAS)
- [ ] Responsivo (mobile)
- [ ] Acessibilidade: Tab, aria-label, focus trap em modais

---

## 9. COMPONENTES REUTILIZÁVEIS

Antes de criar, verifique o catálogo em docs/architecture/COMPONENTS.md:

HeroSection, SectionWrapper, SectionHeader, SectionDivider, SectionNav, StepCard, CodeBlock, ViewSource, FeatureCard, ScoreGauge, CtaSection, PageSkeleton, AnimatedSection, Accordion, etc.

---

## 10. DOCUMENTAÇÃO DE REFERÊNCIA

- docs/README.md — visão geral
- docs/CONTRIBUTING.md — fluxo de contribuição
- docs/content-management/ADDING_PAGES.md — adicionar páginas
- docs/architecture/COMPONENTS.md — catálogo de componentes
- docs/i18n/INDEX.md — i18n
- docs/api/SECURITY.md — segurança das APIs

---

Ao criar ou modificar código, siga estas regras rigorosamente. Consulte os docs quando necessário.

```

---

## BLOCO PARA COPIAR (fim)
```
