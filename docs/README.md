# Documentacao — Dev Showcase

Hub centralizado da documentacao tecnica do projeto.

Aqui voce encontra guias detalhados para contribuir, entender a arquitetura e trabalhar com cada parte do sistema.

---

## Guias disponiveis

| Documento                                                   | Descricao                                                     | Para quem    |
| ----------------------------------------------------------- | ------------------------------------------------------------- | ------------ |
| [Contribuicao](./CONTRIBUTING.md)                           | Como contribuir, fluxo de PR, convencoes de commit            | Todos        |
| [Branch Protection](./BRANCH_PROTECTION.md)                 | Protecao da main, CI obrigatoria, fluxo de PR                 | Todos        |
| [Seguranca das APIs](./api/SECURITY.md)                     | Rate limiting, sanitizacao, anti prompt injection             | Pleno/Senior |
| [Analytics](./analytics/ANALYTICS.md)                       | Metricas ao vivo com Upstash Redis                            | Todos        |
| [Componentes Reutilizaveis](./architecture/COMPONENTS.md)   | Catalogo de componentes compartilhados                        | Todos        |
| [Adicionando Paginas](./content-management/ADDING_PAGES.md) | Como criar novas paginas (guias, implementacoes, ferramentas) | Todos        |
| [Internacionalizacao (i18n)](./i18n/INDEX.md)               | Sistema de traducao, scripts, boas praticas                   | Todos        |

> **Novo no projeto?** Use o **Tutorial Interativo** em `/contribua/tutorial` — cobre o fluxo completo com duas trilhas: criar uma feature nova ou melhorar uma existente.

---

## Visao geral da arquitetura

```
┌──────────────────────────────────────────────────────────┐
│                    Next.js 16 App Router                  │
├──────────────┬──────────────────┬────────────────────────┤
│  Rotas       │  API Routes      │   SEO (build time)     │
│  /           │  /api/chat       │   sitemap.ts           │
│  /dicas      │  /api/code-review│   robots.ts            │
│  /impl.      │  /api/contact    │   opengraph-image.tsx  │
│  /ferramentas│  /api/github     │   icon.tsx             │
│  /contribua  │  /api/stats      │                        │
│  /novidades  │  /api/stats/track│                        │
├──────────────┴──────────────────┴────────────────────────┤
│                       Features                            │
│  home/ ─── hero, about, stack, github-stats, projects,   │
│            experience, ai-section, contact                │
│  implementations/ ─── i18n, seo, ai-chatbot, analytics,  │
│     testing, contact-form; code-review, regex, json      │
│  guides/ ─── ai-tips, tailwind, react-query, security,   │
│     privacy-tips, dev-resources, ts-patterns, git-workflow│
│     react-patterns, nextjs-app-router, state-management  │
│  changelog/ ─── página /novidades (data/changelog.ts)    │
│  contribute/ ─── tutorial, design-system, arquitetura,   │
│     tech-stack, api, accessibility                        │
├──────────────────────────────────────────────────────────┤
│                  Componentes Globais                      │
│  navbar/ (modular, 9 componentes)                        │
│  chat/ (widget IA com focus trap)                        │
│  terminal/ (easter egg com focus trap)                   │
│  global-search/ (Fuse.js, listbox a11y)                  │
│  skip-link (pular para conteudo)                         │
│  page-skeleton (loading por tipo de pagina)              │
│  section-nav (navegacao entre secoes)                    │
│  ui/ (shadcn/ui + Radix)                                 │
├──────────────────────────────────────────────────────────┤
│                    Infraestrutura                         │
│  lib/api-security.ts (sanitizacao, headers, validacao)   │
│  lib/rate-limit.ts (rate limiting in-memory)             │
│  lib/redis.ts (cliente Upstash Redis)                    │
│  lib/chat/system-prompt.ts (prompt do assistente IA)     │
│  lib/i18n/ (next-intl, load-messages, routing)           │
│  lib/seo.ts (buildPageMetadata, constantes)              │
│  lib/email/ (template Resend)                            │
│  lib/animation-variants.ts (Framer Motion)               │
├──────────────────────────────────────────────────────────┤
│                       Dados                               │
│  data/content.ts (registro de paginas dinamicas)         │
│  data/changelog.ts (versoes e mudancas — /novidades)     │
│  lib/dynamic-page-helper.tsx (COMPONENT_MAP)             │
│  lib/content-paths.ts (mapeamento categoria → rota)      │
│  lib/fill-code-placeholders.ts (util para snippets i18n) │
│  data/demo-messages.ts (mensagens demo do chat)          │
│  messages/ (pt-BR, en, es, de — namespaces por pagina)   │
├──────────────────────────────────────────────────────────┤
│                     Automacao                             │
│  scripts/translate.ts (DeepL / Google)                   │
│  scripts/validate-i18n.ts                                │
│  scripts/check-pt-leaks.ts                               │
│  scripts/add-locale.ts                                   │
└──────────────────────────────────────────────────────────┘
```

---

## Fluxo de uma nova pagina

```
1. Registrar em data/content.ts
        ↓
2. Criar feature em src/features/<categoria>/<nome>/
        ↓
3. Mapear componente em lib/dynamic-page-helper.tsx (COMPONENT_MAP)
        ↓
4. Adicionar icone em src/app/<categoria>/page.tsx (iconMap)
        ↓
5. Criar traducoes em messages/pt-BR/<namespace>.json
        ↓
6. Registrar namespace em:
   - messages/pt-BR/index.ts (e nos outros 3 idiomas)
   - src/lib/i18n/load-messages.ts (array NAMESPACES)
   - src/lib/i18n/types.d.ts
        ↓
7. Adicionar ao menu (navbar/nav-data.ts) e busca (search-data.ts + search.json)
        ↓
8. Rodar pnpm translate && pnpm validate:i18n
        ↓
9. Testar build: pnpm build
        ↓
10. Atualizar CHANGELOG.md e src/data/changelog.ts
```

> **Pagina standalone** (sem content.ts): crie `src/app/<rota>/page.tsx` e `src/features/<nome>/index.tsx`.
> Se tiver dados proprios, crie `src/data/<nome>.ts` (ex: `changelog.ts`).
> Ainda precisa dos passos 5, 6, 7, 9 e 10.

> Guia detalhado: [Adicionando Paginas](./content-management/ADDING_PAGES.md)
> Tutorial interativo para contribuidores: `/contribua/tutorial`

---

## Convencoes do projeto

### Estrutura de componentes

- **Features** ficam em `src/features/` organizadas por dominio
- Features complexas tem subpasta com componentes internos, constants, types e hooks
- **Componentes reutilizaveis** ficam em `src/components/`
- **Componentes UI primitivos** (shadcn) ficam em `src/components/ui/`
- Cada componente exportado tem **JSDoc em portugues**

> Catalogo completo: [Componentes Reutilizaveis](./architecture/COMPONENTS.md)

### Traducoes

- `pt-BR` e a fonte de verdade — nunca edite outros idiomas manualmente
- Todo texto visivel ao usuario usa `useTranslations()` ou `getTranslations()`
- Namespaces sao registrados em `messages/*/index.ts` e `src/lib/i18n/types.d.ts`
- Valide com `pnpm validate:i18n` antes de commitar

> Guia completo: [Internacionalizacao](./i18n/INDEX.md)

### SEO

- Toda pagina usa `buildPageMetadata()` de `src/lib/seo.ts`
- Novas paginas entram automaticamente no sitemap via `data/content.ts`
- Open Graph image e gerada em `src/app/opengraph-image.tsx`

### Seguranca das APIs

- Todas as API routes usam o modulo compartilhado `lib/api-security.ts`
- Rate limiting, sanitizacao de input/output, headers seguros
- Anti prompt injection para rotas com IA
- Validacao de schemas com Zod na entrada e na saida

> Guia completo: [Seguranca das APIs](./api/SECURITY.md)

### Acessibilidade

- Skip link (`SkipLink`) — pula direto para `<main>` com Tab
- Focus trap em dialogs (terminal, chat) — teclado nao escapa do overlay
- ARIA semantico: `role="dialog"`, `aria-modal`, `role="listbox"` na busca
- Todos os textos `aria-label` e `sr-only` sao traduzidos via i18n
- Navegacao por teclado: Tab, Enter, Escape, Arrow keys nos componentes interativos

### Estilo & Animacoes

- Tailwind CSS 4 para estilizacao
- Framer Motion para animacoes (variants em `lib/animation-variants.ts`)
- Componentes `motion.*` com `fadeUp` e `stagger` para entrada em viewport
- Tema dark/light via `next-themes`

### Commits

O projeto segue [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nova funcionalidade
fix: correcao de bug
docs: documentacao
refactor: refatoracao sem mudanca funcional
style: formatacao, espacos
test: testes
chore: tarefas de build/config
```

---

## Outros documentos

| Documento                                                                  | Descricao                                                                                                                      |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [CHANGELOG.md](../CHANGELOG.md)                                            | Historico de versoes do projeto (Keep a Changelog). Fonte de verdade para src/data/changelog.ts e a pagina /novidades.         |
| [Revisao dev senior (novidades)](./revisao-dev-senior-novidades.md)        | Revisao tecnica: comentarios i18n (Estado no React) e secao Bibliotecas (Form. Contato). Ver tambem PLANO (Status — Lancados). |
| [Post LinkedIn (lancamentos)](./linkedin-post-novidades-estado-contato.md) | Rascunhos de post para LinkedIn: 5 lancamentos (Next.js App Router, Testing, JSON Formatter, Estado no React, Form. Contato)   |

---

## Links uteis

- [Next.js App Router docs](https://nextjs.org/docs/app)
- [next-intl docs](https://next-intl.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [OpenAI API docs](https://platform.openai.com/docs)
- [Resend docs](https://resend.com/docs)
- [Nodemailer](https://nodemailer.com/)
- [React Email](https://react.email/)
- [Schema.org (JSON-LD)](https://schema.org/)
- [Zod](https://zod.dev/)
