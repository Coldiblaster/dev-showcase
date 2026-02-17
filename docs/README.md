# Documentação — Dev Showcase

Hub centralizado da documentação técnica do projeto.

Aqui você encontra guias detalhados para contribuir, entender a arquitetura e trabalhar com cada parte do sistema.

---

## Guias disponíveis

| Documento | Descrição | Para quem |
|-----------|-----------|-----------|
| [Internacionalização (i18n)](./i18n/INDEX.md) | Sistema de tradução, scripts, boas práticas e troubleshooting | Todos |
| [Adicionando Páginas](./content-management/ADDING_PAGES.md) | Como criar novas páginas de implementações ou guias | Todos |

---

## Visão geral da arquitetura

```
┌─────────────────────────────────────────────────┐
│                  Next.js 16 App Router           │
├──────────┬──────────────┬───────────────────────┤
│  Rotas   │  Middleware   │   SEO (build time)    │
│  /       │  i18n detect  │   sitemap.ts          │
│  /dicas  │  locale cookie│   robots.ts           │
│  /impl.  │              │   opengraph-image.tsx  │
├──────────┴──────────────┴───────────────────────┤
│                    Features                      │
│  home/ (hero, about, projects, experience, etc.) │
│  implementations/ (i18n-showcase, seo-showcase)  │
│  guides/ (ai-tips, tailwind, react-query, etc.)  │
├─────────────────────────────────────────────────┤
│               Shared Components                  │
│  navbar/ (modular, 9 componentes)                │
│  ui/ (shadcn/ui + Radix)                         │
│  hero-section, code-block, cta-section, etc.     │
├─────────────────────────────────────────────────┤
│                  Infraestrutura                  │
│  lib/i18n/ (next-intl, load-messages, routing)   │
│  lib/seo.ts (buildPageMetadata, constants)       │
│  lib/global-search/ (Fuse.js, search data)       │
│  lib/animation-variants.ts (Framer Motion)       │
├─────────────────────────────────────────────────┤
│                    Dados                         │
│  data/content.ts (registro de páginas dinâmicas) │
│  messages/ (pt-BR, en, es, de)                   │
├─────────────────────────────────────────────────┤
│                  Automação                       │
│  scripts/translate.ts (DeepL / Google)           │
│  scripts/validate-i18n.ts                        │
│  scripts/check-pt-leaks.ts                       │
│  scripts/add-locale.ts                           │
└─────────────────────────────────────────────────┘
```

---

## Fluxo de uma nova página

```
1. Registrar em data/content.ts
        ↓
2. Criar feature em src/features/<categoria>/<nome>/
        ↓
3. Mapear componente em lib/dynamic-page-helper.tsx
        ↓
4. Criar traduções em messages/pt-BR/<namespace>.json
        ↓
5. Registrar namespace em messages/pt-BR/index.ts + types.d.ts
        ↓
6. Adicionar ao menu em components/navbar/nav-data.ts
        ↓
7. Rodar pnpm translate && pnpm validate:i18n
        ↓
8. Testar build: pnpm build
```

---

## Convenções do projeto

### Estrutura de componentes

- **Features** ficam em `src/features/` organizadas por domínio
- **Componentes reutilizáveis** ficam em `src/components/`
- **Componentes UI primitivos** (shadcn) ficam em `src/components/ui/`
- Cada feature complexa tem sua pasta com componentes internos (ex: `seo-showcase/`)

### Traduções

- `pt-BR` é a fonte de verdade — nunca edite outros idiomas manualmente
- Todo texto visível ao usuário usa `useTranslations()` ou `getTranslations()`
- Namespaces são registrados em `messages/*/index.ts` e `src/lib/i18n/types.d.ts`
- Valide com `pnpm validate:i18n` antes de commitar

### SEO

- Toda página usa `buildPageMetadata()` de `src/lib/seo.ts`
- Novas páginas entram automaticamente no sitemap via `data/content.ts`
- Open Graph image é gerada em `src/app/opengraph-image.tsx`

### Estilo & Animações

- Tailwind CSS 4 para estilização
- Framer Motion para animações (variants em `lib/animation-variants.ts`)
- Componentes `motion.*` com `fadeUp` e `stagger` para entrada em viewport

---

## Links úteis

- [next-intl docs](https://next-intl.dev/)
- [Next.js App Router docs](https://nextjs.org/docs/app)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Schema.org (JSON-LD)](https://schema.org/)
