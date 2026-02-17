# Documentacao — Dev Showcase

Hub centralizado da documentacao tecnica do projeto.

Aqui voce encontra guias detalhados para contribuir, entender a arquitetura e trabalhar com cada parte do sistema.

---

## Guias disponiveis

| Documento                                                   | Descricao                                           | Para quem    |
| ----------------------------------------------------------- | --------------------------------------------------- | ------------ |
| [Contribuicao](./CONTRIBUTING.md)                           | Como contribuir, fluxo de PR, convencoes de commit  | Todos        |
| [Seguranca das APIs](./api/SECURITY.md)                     | Rate limiting, sanitizacao, anti prompt injection   | Pleno/Senior |
| [Componentes Reutilizaveis](./architecture/COMPONENTS.md)   | Catalogo de componentes compartilhados              | Todos        |
| [Adicionando Paginas](./content-management/ADDING_PAGES.md) | Como criar novas paginas de implementacoes ou guias | Todos        |
| [Internacionalizacao (i18n)](./i18n/INDEX.md)               | Sistema de traducao, scripts, boas praticas         | Todos        |

---

## Visao geral da arquitetura

```
┌──────────────────────────────────────────────────────────┐
│                    Next.js 16 App Router                  │
├──────────┬──────────────────┬────────────────────────────┤
│  Rotas   │  API Routes      │   SEO (build time)         │
│  /       │  /api/chat       │   sitemap.ts               │
│  /dicas  │  /api/code-review│   robots.ts                │
│  /impl.  │  /api/contact    │   opengraph-image.tsx      │
│          │  /api/github     │   icon.tsx                 │
├──────────┴──────────────────┴────────────────────────────┤
│                       Features                            │
│  home/ ─── hero, about, stack, github-stats, projects,   │
│            experience, ai-section, contact                │
│  implementations/ ─── i18n, seo, ai-chatbot, code-review │
│  guides/ ─── ai-tips, tailwind, react-query, security,   │
│              dev-resources                                │
├──────────────────────────────────────────────────────────┤
│                  Componentes Globais                      │
│  navbar/ (modular, 9 componentes)                        │
│  chat/ (widget IA flutuante)                             │
│  terminal/ (easter egg interativo)                       │
│  global-search/ (Fuse.js)                                │
│  ui/ (shadcn/ui + Radix)                                 │
│  section-header, section-wrapper, section-divider,       │
│  step-card, score-gauge, code-block, hero-section, etc.  │
├──────────────────────────────────────────────────────────┤
│                    Infraestrutura                         │
│  lib/api-security.ts (sanitizacao, headers, validacao)   │
│  lib/rate-limit.ts (rate limiting in-memory)             │
│  lib/chat/system-prompt.ts (prompt do assistente IA)     │
│  lib/i18n/ (next-intl, load-messages, routing)           │
│  lib/seo.ts (buildPageMetadata, constantes)              │
│  lib/email/ (template Resend)                            │
│  lib/animation-variants.ts (Framer Motion)               │
├──────────────────────────────────────────────────────────┤
│                       Dados                               │
│  data/content.ts (registro de paginas dinamicas)         │
│  data/dynamic-page-helper.tsx (mapa componente ↔ slug)   │
│  data/demo-messages.ts (mensagens demo do chat)          │
│  messages/ (pt-BR, en, es, de)                           │
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
3. Mapear componente em data/dynamic-page-helper.tsx
        ↓
4. Criar traducoes em messages/pt-BR/<namespace>.json
        ↓
5. Registrar namespace em messages/pt-BR/index.ts + types.d.ts
        ↓
6. Adicionar ao menu em components/navbar/nav-data.ts
        ↓
7. Rodar pnpm translate && pnpm validate:i18n
        ↓
8. Testar build: pnpm build
```

> Guia detalhado: [Adicionando Paginas](./content-management/ADDING_PAGES.md)

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

## Links uteis

- [Next.js App Router docs](https://nextjs.org/docs/app)
- [next-intl docs](https://next-intl.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [OpenAI API docs](https://platform.openai.com/docs)
- [Resend docs](https://resend.com/docs)
- [Schema.org (JSON-LD)](https://schema.org/)
- [Zod](https://zod.dev/)
