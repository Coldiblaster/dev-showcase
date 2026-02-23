<div align="center">

# VB — Dev Showcase

**Portfolio profissional + plataforma de conteudo para desenvolvedores**

[Acessar ao vivo](https://viniciusbastazin.vercel.app) · [Documentacao](./docs/README.md) · [Contribuir](./docs/CONTRIBUTING.md) · [Reportar Bug](https://github.com/Coldiblaster/dev-showcase/issues)

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-black?style=flat-square&logo=vercel)

</div>

---

## Sobre

Mais do que um portfolio, o **Dev Showcase** e uma plataforma open source que combina:

- **Portfolio profissional** — hero, sobre, projetos, experiencia, estatisticas GitHub e contato
- **IA integrada** — chat assistente (GPT-4.1 Nano) e revisor de codigo com IA (GPT-4o Mini)
- **Implementacoes reais** — showcases tecnicos em producao (i18n, SEO, AI Chatbot, Analytics, Testing, Formulario de Contato)
- **Guias para devs** — Estado no React, Next.js App Router, Evolucao de Codigo, Mapa de Arquitetura e muito mais
- **Engajamento** — reacoes por pagina (❤️🔥💡), comentarios via Giscus (GitHub Discussions) e contador de usuarios online em tempo real
- **Internacionalizacao completa** — 4 idiomas (pt-BR, en, es, de) com traducao automatizada
- **SEO de producao** — OG images dinamicas, JSON-LD, sitemap, robots
- **Busca global** — pesquisa fuzzy em todo o conteudo da plataforma
- **Analytics proprio** — metricas ao vivo (visitantes, page views, top pages) com Upstash Redis
- **Easter eggs** — terminal interativo com comandos (pressione `~`)

O objetivo e alcancar desenvolvedores, recrutadores e empresas, servindo tanto como vitrine profissional quanto como referencia tecnica para a comunidade.

> **Documentacao completa** — arquitetura, seguranca, componentes, convencoes e guias de contribuicao estao centralizados em [`docs/`](./docs/README.md).

---

## Tech Stack

| Camada          | Tecnologias                                                              |
| --------------- | ------------------------------------------------------------------------ |
| **Framework**   | Next.js 16 (App Router)                                                  |
| **UI**          | React 19, Tailwind CSS 4, shadcn/ui (Radix UI)                           |
| **Animacoes**   | Framer Motion                                                            |
| **i18n**        | next-intl (pt-BR, en, es, de) + traducao automatica (DeepL / Google)     |
| **SEO**         | Metadata API, Open Graph dinamico, JSON-LD, Sitemap, Robots              |
| **IA**          | OpenAI (GPT-4o Mini para code review, GPT-4.1 Nano para chat)            |
| **Validacao**   | Zod (schema validation)                                                  |
| **Busca**       | Fuse.js (busca global fuzzy)                                             |
| **Analytics**   | Upstash Redis (page views, visitors via HyperLogLog, top pages)          |
| **Email**       | Resend (formulario de contato)                                           |
| **Comentarios** | Giscus (GitHub Discussions, tema CSS customizado)                        |
| **Seguranca**   | Rate limiting in-memory + Redis distribuido, Zod schemas, anti-injection |
| **Testes**      | Vitest + Testing Library                                                 |
| **Deploy**      | Vercel + Analytics + Speed Insights                                      |

---

## Funcionalidades

### Portfolio

| Secao        | Descricao                                                            |
| ------------ | -------------------------------------------------------------------- |
| Hero         | Apresentacao com animacoes e CTA                                     |
| Sobre        | Bio, skills e informacoes pessoais                                   |
| Stack        | Tecnologias com categorias visuais                                   |
| GitHub Stats | Estatisticas ao vivo do GitHub (repos, stars, linguagens, atividade) |
| Projetos     | Grid de projetos com links e tags                                    |
| Experiencia  | Timeline interativa de carreira                                      |
| IA           | Secao sobre uso de IA no desenvolvimento                             |
| Contato      | Formulario com Resend + reCAPTCHA                                    |

### Implementacoes

| Rota                           | Descricao                                                                |
| ------------------------------ | ------------------------------------------------------------------------ |
| `/implementacoes/i18n`         | Showcase de internacionalizacao com next-intl                            |
| `/implementacoes/seo`          | SEO completo — Next.js vs React + Vite                                   |
| `/implementacoes/ai-chatbot`   | Showcase de AI Chatbot (arquitetura, streaming, system prompt, pricing)  |
| `/implementacoes/analytics`    | Analytics com Upstash Redis — page views, visitantes, top pages          |
| `/implementacoes/testing`      | Testing com Vitest e Testing Library — estrutura, exemplos e checklist   |
| `/implementacoes/contact-form` | Formulario de contato — API, Zod, Resend, Nodemailer e seção Bibliotecas |

### Ferramentas

| Rota                       | Descricao                                                           |
| -------------------------- | ------------------------------------------------------------------- |
| `/ferramentas/code-review` | Revisor de codigo com IA — analisa qualidade, bugs e seguranca      |
| `/ferramentas/regex`       | Regex Playground — editor, biblioteca de patterns e cheat sheet     |
| `/ferramentas/json`        | JSON Formatter & Validator — pretty print, minify e erros por linha |

### Guias & Dicas

| Rota                         | Descricao                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `/dicas/ai-tips`             | Prompts e workflows com IA para devs                                                                         |
| `/dicas/tailwind-tips`       | Dicas de Tailwind CSS + shadcn/ui                                                                            |
| `/dicas/react-query-tips`    | Patterns essenciais de React Query                                                                           |
| `/dicas/dev-resources`       | Snippets e recursos por nivel (Jr/Pleno/Sr)                                                                  |
| `/dicas/security-tips`       | Seguranca web — frontend, backend, headers, env vars                                                         |
| `/dicas/privacy-tips`        | Privacidade e cookies — LGPD, consentimento, politica                                                        |
| `/dicas/typescript-patterns` | Utility types, generics, narrowing e patterns avancados                                                      |
| `/dicas/git-workflow`        | Branching, commits, workflows e cheat sheet                                                                  |
| `/dicas/react-patterns`      | Composicao, hooks customizados, state e performance                                                          |
| `/dicas/nextjs-app-router`   | App Router — routing, Server/Client Components, data fetching                                                |
| `/dicas/state-management`    | Estado no React — useState, Context, Zustand; comentarios em i18n                                            |
| `/dicas/code-evolution`      | Evolucao de Codigo — player interativo tipo git log com 4 exemplos (Lifecycle, State, Forms, Async)          |
| `/dicas/arch-map`            | Mapa de Arquitetura — 5 projetos reais interativos (E-commerce, Dashboard, Social Feed, Video, Ride Sharing) |

### Projeto

| Rota                        | Descricao                                                     |
| --------------------------- | ------------------------------------------------------------- |
| `/novidades`                | Changelog visual — historico de versoes, features e melhorias |
| `/contribua`                | Hub de contribuicao com visao geral de todas as sub-paginas   |
| `/contribua/tutorial`       | Tutorial interativo passo a passo para novos contribuidores   |
| `/contribua/arquitetura`    | Visao geral da arquitetura tecnica do projeto                 |
| `/contribua/tech-stack`     | Stack de tecnologias com detalhes de cada ferramenta          |
| `/contribua/design-system`  | Catalogo interativo de componentes (previews + codigo)        |
| `/contribua/api`            | Documentacao das API Routes com exemplos de requests          |
| `/contribua/acessibilidade` | Guia de acessibilidade — padrao do projeto                    |

### API Routes

| Rota               | Descricao                                                                               |
| ------------------ | --------------------------------------------------------------------------------------- |
| `/api/chat`        | Chat IA com streaming (GPT-4.1 Nano)                                                    |
| `/api/code-review` | Revisao de codigo com IA (GPT-4o Mini)                                                  |
| `/api/contact`     | Envio de email via Resend                                                               |
| `/api/github`      | Estatisticas do GitHub com cache                                                        |
| `/api/stats`       | Metricas da plataforma (Redis + cache)                                                  |
| `/api/stats/track` | Tracking de page view (bot filter)                                                      |
| `/api/reactions`   | Reacoes por pagina — GET contagens, POST votar/desvota/trocar (Redis + deduplicacao IP) |
| `/api/online`      | Contador de usuarios online — registra presenca via sendBeacon, TTL por sessao no Redis |

---

## Estrutura do Projeto

```
src/
├── app/                              # Rotas (App Router)
│   ├── api/                          # API Routes
│   │   ├── chat/route.ts             #   Chat IA (streaming)
│   │   ├── code-review/route.ts      #   Code Review IA
│   │   ├── contact/route.ts          #   Envio de email
│   │   ├── github/route.ts           #   GitHub stats
│   │   ├── online/route.ts           #   Contador de usuarios online (Redis)
│   │   ├── reactions/route.ts        #   Reacoes por pagina — ❤️🔥💡 (Redis)
│   │   └── stats/                    #   Analytics proprio
│   │       ├── route.ts              #     GET — metricas agregadas
│   │       └── track/route.ts        #     POST — registra page view
│   ├── novidades/                    # Changelog visual (/novidades)
│   ├── dicas/[slug]/                 # Guias dinamicos (13 guias)
│   ├── ferramentas/[slug]/           # Ferramentas dinamicas (code-review, regex, json)
│   ├── implementacoes/[slug]/        # Implementacoes (i18n, seo, ai-chatbot, analytics, testing, contact-form)
│   ├── icon.tsx                      # Favicon dinamico (VB)
│   ├── opengraph-image.tsx           # OG image 1200x630
│   ├── sitemap.ts                    # Sitemap automatico
│   └── robots.ts                     # Regras de crawling
├── components/
│   ├── chat/                         # Widget de chat IA (dialog com a11y)
│   ├── global-search/                # Busca global (Fuse.js)
│   ├── navbar/                       # Navbar Server Component + client interativo
│   ├── terminal/                     # Terminal Easter Egg (focus trap)
│   ├── ui/                           # Primitivos shadcn/ui
│   ├── reactions.tsx                 # Sistema de reacoes por pagina (❤️🔥💡)
│   ├── giscus-comments.tsx           # Comentarios via GitHub Discussions (Giscus)
│   ├── content-footer.tsx            # Footer de conteudo — reacoes + comentarios
│   ├── online-counter.tsx            # Contador de usuarios online (polling 30s)
│   ├── view-tracker.tsx              # Tracking de page view + presenca online
│   ├── skip-link.tsx                 # Skip to content (acessibilidade)
│   ├── page-skeleton.tsx             # Loading skeletons por tipo de pagina
│   ├── section-nav.tsx               # Navegacao entre secoes
│   └── ...                           # Componentes reutilizaveis
├── features/
│   ├── home/                         # Hero, About, Stack, GitHub Stats, Projects, etc.
│   │   └── github-stats/             # GitHub Stats (hook + sub-componentes)
│   ├── changelog/                    # Timeline animada de versoes (/novidades)
│   ├── implementations/
│   │   ├── ai-chatbot-showcase/      # Showcase AI Chatbot
│   │   ├── analytics-showcase/       # Analytics com Upstash Redis
│   │   ├── code-review/              # Revisor de Codigo IA (ferramenta)
│   │   ├── contact-showcase/         # Formulario de Contato (API, Resend, Bibliotecas)
│   │   ├── i18n-showcase/            # Showcase i18n
│   │   ├── json-tool/                # JSON Formatter & Validator (ferramenta)
│   │   ├── regex-playground/         # Regex Playground (ferramenta)
│   │   ├── seo-showcase/             # Showcase SEO
│   │   └── testing-showcase/         # Testing Vitest + Testing Library
│   ├── guides/
│   │   ├── arch-map/                 # Mapa de Arquitetura — 5 projetos interativos
│   │   │   └── projects/             #   Cada arquitetura em arquivo independente
│   │   ├── code-evolution/           # Evolucao de Codigo — player tipo git log animado
│   │   ├── ai-tips/                  # Dicas de IA
│   │   ├── dev-resources/            # Recursos por nivel
│   │   ├── git-workflow/             # Git Workflow & Cheat Sheet
│   │   ├── nextjs-app-router/        # Next.js App Router
│   │   ├── privacy-tips/             # Privacidade e Cookies
│   │   ├── react-patterns/           # React Design Patterns
│   │   ├── react-query-tips/         # React Query Essencial
│   │   ├── security-tips/            # Seguranca Frontend & Backend
│   │   ├── state-management/         # Estado no React (comentarios i18n)
│   │   ├── tailwind-tips/            # Tailwind CSS + shadcn/ui
│   │   └── ts-patterns/              # TypeScript Patterns
│   ├── contribute/
│   │   ├── tutorial/                 # Tutorial interativo (9 steps + trilhas)
│   │   ├── design-system/            # Catalogo de componentes com previews
│   │   ├── architecture/             # Arquitetura tecnica
│   │   ├── tech-stack/               # Stack de tecnologias
│   │   ├── api/                      # Documentacao das APIs
│   │   └── accessibility/            # Guia de acessibilidade
│   └── not-found/                    # Pagina 404
├── data/                             # Registros e dados estaticos
│   ├── content.ts                    #   Registro de paginas dinamicas (guias, impl., ferramentas)
│   └── changelog.ts                  #   Historico de versoes — alimenta /novidades
├── hooks/                            # Hooks customizados
└── lib/
    ├── api-security.ts               # Seguranca compartilhada para APIs
    ├── rate-limit.ts                 # Rate limiting in-memory (fallback)
    ├── redis-rate-limit.ts           # Rate limiting distribuido via Upstash Redis
    ├── redis.ts                      # Cliente Upstash Redis (graceful degradation)
    ├── get-popular-slugs.ts          # Slugs mais acessados do Redis com unstable_cache
    ├── content-paths.ts              # Mapeamento canonico categoria → rota (fonte unica)
    ├── fill-code-placeholders.ts     # Util para i18n em snippets de codigo
    ├── dynamic-page-helper.tsx       # Mapa componente ↔ slug (COMPONENT_MAP)
    ├── chat/                         # System prompt do chat IA
    ├── email/                        # Template de email (Resend)
    ├── i18n/                         # Configuracao de internacionalizacao
    ├── seo.ts                        # Helpers de SEO
    └── animation-variants.ts         # Variantes Framer Motion

messages/                             # Traducoes por idioma (pt-BR, en, es, de)
├── pt-BR/                            # Portugues (fonte de verdade)
├── en/                               # English (gerado)
├── es/                               # Espanol (gerado)
└── de/                               # Deutsch (gerado)

scripts/                              # Automacao (traducao, validacao)
docs/                                 # Documentacao tecnica
```

> Veja a [documentacao completa](./docs/README.md) para detalhes da arquitetura, seguranca e componentes.

---

## Comecando

### Pre-requisitos

- Node.js 18+
- pnpm

### Instalacao

```bash
git clone https://github.com/Coldiblaster/dev-showcase.git
cd dev-showcase
cp .env.example .env.local   # Configure suas variaveis
pnpm install
pnpm dev
```

### Variaveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

| Variavel                         |   Obrigatoria    | Descricao                                        |
| -------------------------------- | :--------------: | ------------------------------------------------ |
| `OPENAI_API_KEY`                 |     Para IA      | Chat e Code Review                               |
| `RESEND_API_KEY`                 |    Para email    | Formulario de contato                            |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` |   Para contato   | reCAPTCHA v3 (client)                            |
| `RECAPTCHA_SECRET_KEY`           |   Para contato   | reCAPTCHA v3 (server)                            |
| `UPSTASH_REDIS_REST_URL`         |  Para analytics  | Metricas ao vivo, reacoes e online counter       |
| `UPSTASH_REDIS_REST_TOKEN`       |  Para analytics  | Token do Upstash Redis                           |
| `NEXT_PUBLIC_GISCUS_REPO`        | Para comentarios | Repositorio GitHub para Giscus (ex: `user/repo`) |
| `NEXT_PUBLIC_GISCUS_REPO_ID`     | Para comentarios | ID do repositorio Giscus                         |
| `NEXT_PUBLIC_GISCUS_CATEGORY`    | Para comentarios | Categoria do Giscus (ex: `General`)              |
| `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | Para comentarios | ID da categoria Giscus                           |
| `DEEPL_API_KEY`                  |  Para traducao   | Traducao automatica (DeepL)                      |
| `GOOGLE_CLOUD_API_KEY`           |  Para traducao   | Fallback de traducao (Google)                    |

> A plataforma funciona sem essas chaves — os recursos que dependem delas ficam desabilitados graciosamente.

### Build & Testes

```bash
pnpm build             # Build de producao
pnpm start             # Servidor de producao
pnpm test              # Roda os testes
pnpm test:watch        # Modo watch
pnpm test:coverage     # Com cobertura
```

---

## Scripts

| Comando                     | Descricao                                 |
| --------------------------- | ----------------------------------------- |
| `pnpm dev`                  | Servidor de desenvolvimento               |
| `pnpm build`                | Build de producao                         |
| `pnpm lint`                 | Linting com ESLint                        |
| `pnpm translate`            | Traduz chaves novas para todos os idiomas |
| `pnpm translate:force`      | Retraduz tudo                             |
| `pnpm add-locale -- <code>` | Adiciona novo idioma                      |
| `pnpm validate:i18n`        | Valida chaves entre idiomas               |
| `pnpm check:pt-leaks`       | Detecta pt-BR vazando para outros idiomas |
| `pnpm test`                 | Roda testes com Vitest                    |

> Detalhes dos scripts de i18n em [`docs/i18n/`](./docs/i18n/INDEX.md)

---

## Deploy

O projeto esta configurado para deploy na **Vercel** com zero configuracao:

1. Faca fork do repositorio
2. Conecte a Vercel
3. Configure variaveis de ambiente (veja tabela acima)
4. Deploy automatico a cada push

---

## Documentacao

| Documento                                                                            | Descricao                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| [docs/README.md](./docs/README.md)                                                   | Hub da documentacao — arquitetura e convencoes         |
| [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md)                                       | Guia de contribuicao                                   |
| [docs/BRANCH_PROTECTION.md](./docs/BRANCH_PROTECTION.md)                             | CI, branch protection e fluxo de PR                    |
| [docs/api/SECURITY.md](./docs/api/SECURITY.md)                                       | Seguranca das API Routes                               |
| [docs/analytics/ANALYTICS.md](./docs/analytics/ANALYTICS.md)                         | Sistema de analytics proprio (Upstash Redis)           |
| [docs/architecture/COMPONENTS.md](./docs/architecture/COMPONENTS.md)                 | Catalogo de componentes reutilizaveis                  |
| [docs/content-management/ADDING_PAGES.md](./docs/content-management/ADDING_PAGES.md) | Como criar novas paginas (guias, impl., tools)         |
| [docs/i18n/INDEX.md](./docs/i18n/INDEX.md)                                           | Sistema de internacionalizacao                         |
| [docs/revisao-dev-senior-novidades.md](./docs/revisao-dev-senior-novidades.md)       | Revisao das novidades (Estado no React, Form. Contato) |
| [CHANGELOG.md](./CHANGELOG.md)                                                       | Historico de versoes — Keep a Changelog                |

> **Tutorial interativo** para novos contribuidores: [`/contribua/tutorial`](https://viniciusbastazin.vercel.app/contribua/tutorial) — passo a passo com trilhas para "nova feature" e "melhorar existente".

---

## Contribuindo

Contribuicoes sao bem-vindas! Veja o [guia de contribuicao](./docs/CONTRIBUTING.md) para entender o fluxo.

1. Fork o projeto
2. Crie uma branch a partir de `develop` (`git checkout -b feature/minha-feature`)
3. Commit suas mudancas (`git commit -m 'feat: minha feature'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request para `develop` (nunca direto para `main`)

---

## Licenca

MIT — veja [LICENSE](LICENSE).

---

<div align="center">

Feito por [Vinicius Bastazin](https://viniciusbastazin.vercel.app)

</div>
