# Changelog

Todas as mudanças notáveis deste projeto são documentadas aqui.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

---

## [Unreleased]

---

## [0.8.0] — 2026-02-22

### Refactor

- Centralizado mapeamento `categoria → rota` em `src/lib/content-paths.ts` (antes duplicado em 4 arquivos)
- Unificados `fillCodeComments` e `fillCodePlaceholders` em `src/lib/fill-code-placeholders.ts`
- Consolidado o `CodeBlock` local de `ts-patterns` no componente global `src/components/code-block.tsx` (suporte a `highlight`, `label` e animação linha a linha)
- Renomeados arquivos de exemplos dispersos para o padrão `code-examples.ts`
- Refatorado `react-query-tips.tsx` (arquivo único de 217 linhas) em pasta com `index.tsx` + 5 seções independentes

---

## [0.7.0] — 2026-02-20

### Adicionado

- **Guia: Next.js App Router** — Routing, layouts, Server vs Client Components, data fetching e loading/error boundaries com exemplos replicáveis (`/dicas/nextjs-app-router`)
- **Implementação: Contact / Email Showcase** — API route, validação com Zod, rate limit, reCAPTCHA e envio com Resend; seção de bibliotecas alternativas (Nodemailer, React Email) com exemplos de código (`/implementacoes/contact-form`)
- **Ferramenta: JSON Formatter & Validator** — Pretty print, minify e mensagens de erro por linha no navegador (`/ferramentas/json`)
- **Guia: Estado no React** — useState, Context, Zustand; quando usar cada um com exemplos replicáveis e comentários de código traduzidos por idioma (`/dicas/state-management`)
- **Implementação: Testing Showcase** — Como o projeto estrutura testes com Vitest e Testing Library: pastas, exemplos de componente/hook, mocks e checklist (`/implementacoes/testing`)
- Comentários de código nos exemplos traduzidos por idioma (pt-BR, en, es, de) via `fillCodeComments`
- Ajuste de layout na hero da home (stats sem quebra de linha indevida)

### Corrigido

- Placeholders `{{0}}` visíveis na UI em inglês (`MISSING_MESSAGE` no `localState` do guia Estado no React)

---

## [0.6.0] — 2026-02-18

### Adicionado

- **Guia: Privacidade e Cookies** — LGPD, consentimento, banner de cookies e política de privacidade (`/dicas/privacy-tips`)
- **Implementação: Analytics com Upstash Redis** — Page views e visitantes únicos com HyperLogLog, rate limiting e filtro de bots (`/implementacoes/analytics`)
- **Tutorial interativo de contribuição** — Passo a passo em `/contribua/tutorial` com file tree animada
- Configuração de branch protection e CI/CD (GitHub Actions)
- Componente `BackLink` reutilizável

---

## [0.5.0] — 2026-02-18

### Adicionado

- **Guia: Git Workflow & Cheat Sheet** — Estratégias de branching, conventional commits e comandos essenciais (`/dicas/git-workflow`)
- **Guia: React Design Patterns** — Compound Components, Custom Hooks, Render Props, HOCs e performance (`/dicas/react-patterns`)
- **Ferramenta: Regex Playground** — Editor interativo com highlight em tempo real e biblioteca de patterns (`/ferramentas/regex`)
- **Ferramenta: AI Code Reviewer** — Análise de código com GPT-4o Mini: bugs, performance, segurança e score (`/ferramentas/code-review`)
- **Guia: TypeScript Patterns** — Utility Types, Generics, Type Narrowing e patterns avançados (`/dicas/typescript-patterns`)
- **Guia: Segurança Frontend & Backend** — Rate Limiting, reCAPTCHA v3, Honeypot, Zod, Security Headers e env vars (`/dicas/security-tips`)
- **Guia: Recursos para Devs (Jr, Pleno, Sênior)** — Snippets, comparações before/after e playground interativo por nível (`/dicas/dev-resources`)

### Melhorado

- Busca global refatorada com suporte a i18n, botão limpar e melhorias responsivas
- Navegação com colunas por categoria e links "ver todos"
- Mobile action bar flutuante

---

## [0.4.0] — 2026-02-17

### Adicionado

- **Guia: React Query Essencial** — Cache, mutations, invalidação e optimistic updates (`/dicas/react-query-tips`)
- **Guia: Tailwind CSS + shadcn/ui** — Setup, componentes reutilizáveis e boas práticas (`/dicas/tailwind-tips`)
- **Guia: Dicas de IA para Devs** — v0, Copilot, prompt engineering e ferramentas de produtividade (`/dicas/ai-tips`)
- **Implementação: AI Chatbot com OpenAI** — Streaming, Vercel AI SDK, system prompt e arquitetura (`/implementacoes/ai-chatbot`)
- Página 404 personalizada
- Integração Vercel Analytics e Speed Insights
- Centralização de informações pessoais (`PERSONAL` object)
- Imagens de projetos convertidas para WebP

### Melhorado

- Hero component refatorado para slots flexíveis e reuso
- Navegação mobile aprimorada

---

## [0.3.0] — 2026-02-17

### Adicionado

- **Implementação: SEO Showcase** — Meta tags, Open Graph dinâmico, JSON-LD, Sitemap e Robots (`/implementacoes/seo`)
- Suporte multilíngue completo para todas as seções (pt-BR, en, es, de)
- Variáveis de ambiente documentadas

---

## [0.2.0] — 2026-02-16

### Adicionado

- **Implementação: i18n Showcase** — Demo ao vivo com 4 idiomas usando next-intl e DeepL (`/implementacoes/i18n`)
- Busca global com tipagem e refatoração de segurança de tipos
- Primeiras páginas de dicas (`/dicas`)
- Sistema de rotas dinâmicas com `CONTENT_ITEMS`

### Melhorado

- Estrutura do projeto reorganizada (feature-based folders)
- Hero component com slots flexíveis

---

## [0.1.0] — 2026-02-16

### Adicionado

- Estrutura inicial do projeto com Next.js 15, TypeScript, Tailwind CSS e shadcn/ui
- Sistema de internacionalização (i18n) com next-intl — 4 idiomas (pt-BR, en, es, de)
- Home page com seções: About, Tech Stack, GitHub Stats, Projects, Experience, AI Innovation, Contact
- Documentação técnica completa: i18n, content management, design system
- Configuração ESLint, Prettier e TypeScript strict
