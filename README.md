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
- **Implementacoes reais** — showcases tecnicos rodando em producao (i18n, SEO, AI Chatbot, Code Review)
- **Guias para devs** — dicas praticas de IA, Tailwind, React Query, seguranca e recursos por nivel
- **Internacionalizacao completa** — 4 idiomas (pt-BR, en, es, de) com traducao automatizada
- **SEO de producao** — OG images dinamicas, JSON-LD, sitemap, robots
- **Busca global** — pesquisa fuzzy em todo o conteudo da plataforma
- **Easter eggs** — terminal interativo com comandos (pressione `~`)

O objetivo e alcancar desenvolvedores, recrutadores e empresas, servindo tanto como vitrine profissional quanto como referencia tecnica para a comunidade.

> **Documentacao completa** — arquitetura, seguranca, componentes, convencoes e guias de contribuicao estao centralizados em [`docs/`](./docs/README.md).

---

## Tech Stack

| Camada | Tecnologias |
|--------|------------|
| **Framework** | Next.js 16 (App Router) |
| **UI** | React 19, Tailwind CSS 4, shadcn/ui (Radix UI) |
| **Animacoes** | Framer Motion |
| **i18n** | next-intl (pt-BR, en, es, de) + traducao automatica (DeepL / Google) |
| **SEO** | Metadata API, Open Graph dinamico, JSON-LD, Sitemap, Robots |
| **IA** | OpenAI (GPT-4o Mini para code review, GPT-4.1 Nano para chat) |
| **Validacao** | Zod (schema validation) |
| **Busca** | Fuse.js (busca global fuzzy) |
| **Email** | Resend (formulario de contato) |
| **Seguranca** | Rate limiting, sanitizacao I/O, anti prompt injection, Zod schemas |
| **Testes** | Vitest + Testing Library |
| **Deploy** | Vercel + Analytics + Speed Insights |

---

## Funcionalidades

### Portfolio

| Secao | Descricao |
|-------|-----------|
| Hero | Apresentacao com animacoes e CTA |
| Sobre | Bio, skills e informacoes pessoais |
| Stack | Tecnologias com categorias visuais |
| GitHub Stats | Estatisticas ao vivo do GitHub (repos, stars, linguagens, atividade) |
| Projetos | Grid de projetos com links e tags |
| Experiencia | Timeline interativa de carreira |
| IA | Secao sobre uso de IA no desenvolvimento |
| Contato | Formulario com Resend + reCAPTCHA |

### Implementacoes

| Rota | Descricao |
|------|-----------|
| `/implementacoes/i18n` | Showcase de internacionalizacao com next-intl |
| `/implementacoes/seo` | SEO completo — Next.js vs React + Vite |
| `/implementacoes/ai-chatbot` | Showcase de AI Chatbot (arquitetura, streaming, system prompt, pricing) |
| `/implementacoes/code-review` | Revisor de codigo com IA — analisa qualidade, bugs e seguranca |

### Guias & Dicas

| Rota | Descricao |
|------|-----------|
| `/dicas/ai-tips` | Prompts e workflows com IA para devs |
| `/dicas/tailwind-tips` | Dicas de Tailwind CSS + shadcn/ui |
| `/dicas/react-query-tips` | Patterns essenciais de React Query |
| `/dicas/dev-resources` | Snippets e recursos por nivel (Jr/Pleno/Sr) |
| `/dicas/security-tips` | Seguranca web — frontend, backend, headers, env vars |

### API Routes

| Rota | Descricao |
|------|-----------|
| `/api/chat` | Chat IA com streaming (GPT-4.1 Nano) |
| `/api/code-review` | Revisao de codigo com IA (GPT-4o Mini) |
| `/api/contact` | Envio de email via Resend |
| `/api/github` | Estatisticas do GitHub com cache |

---

## Estrutura do Projeto

```
src/
├── app/                              # Rotas (App Router)
│   ├── api/                          # API Routes
│   │   ├── chat/route.ts             #   Chat IA (streaming)
│   │   ├── code-review/route.ts      #   Code Review IA
│   │   ├── contact/route.ts          #   Envio de email
│   │   └── github/route.ts           #   GitHub stats
│   ├── dicas/[slug]/                 # Guias dinamicos
│   ├── implementacoes/[slug]/        # Implementacoes dinamicas
│   ├── icon.tsx                      # Favicon dinamico (VB)
│   ├── opengraph-image.tsx           # OG image 1200x630
│   ├── sitemap.ts                    # Sitemap automatico
│   └── robots.ts                     # Regras de crawling
├── components/
│   ├── chat/                         # Widget de chat IA
│   ├── global-search/                # Busca global (Fuse.js)
│   ├── navbar/                       # Navbar modular (9 componentes)
│   ├── terminal/                     # Terminal Easter Egg
│   ├── ui/                           # Primitivos shadcn/ui
│   └── ...                           # Componentes reutilizaveis
├── features/
│   ├── home/                         # Hero, About, Projects, Experience, etc.
│   │   └── github-stats/             # GitHub Stats (hook + sub-componentes)
│   ├── implementations/
│   │   ├── ai-chatbot-showcase/      # Showcase AI Chatbot
│   │   ├── code-review/              # Revisor de Codigo IA
│   │   ├── i18n-showcase/            # Showcase i18n
│   │   └── seo-showcase/             # Showcase SEO
│   ├── guides/
│   │   ├── dev-resources/            # Recursos por nivel
│   │   └── security-tips/            # Dicas de seguranca
│   └── not-found/                    # Pagina 404
├── data/                             # Registro de conteudo e dados estaticos
├── hooks/                            # Hooks customizados
└── lib/
    ├── api-security.ts               # Seguranca compartilhada para APIs
    ├── rate-limit.ts                 # Rate limiting in-memory
    ├── chat/                         # System prompt do chat IA
    ├── email/                        # Template de email (Resend)
    ├── i18n/                         # Configuracao de internacionalizacao
    ├── seo.ts                        # Helpers de SEO
    └── animation-variants.ts         # Variantes Framer Motion

messages/                             # Traducoes por idioma
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

| Variavel | Obrigatoria | Descricao |
|----------|:-----------:|-----------|
| `OPENAI_API_KEY` | Para IA | Chat e Code Review |
| `RESEND_API_KEY` | Para email | Formulario de contato |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Para contato | reCAPTCHA v3 (client) |
| `RECAPTCHA_SECRET_KEY` | Para contato | reCAPTCHA v3 (server) |
| `DEEPL_API_KEY` | Para traducao | Traducao automatica (DeepL) |
| `GOOGLE_CLOUD_API_KEY` | Para traducao | Fallback de traducao (Google) |

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

| Comando | Descricao |
|---------|-----------|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Build de producao |
| `pnpm lint` | Linting com ESLint |
| `pnpm translate` | Traduz chaves novas para todos os idiomas |
| `pnpm translate:force` | Retraduz tudo |
| `pnpm add-locale -- <code>` | Adiciona novo idioma |
| `pnpm validate:i18n` | Valida chaves entre idiomas |
| `pnpm check:pt-leaks` | Detecta pt-BR vazando para outros idiomas |
| `pnpm test` | Roda testes com Vitest |

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

| Documento | Descricao |
|-----------|-----------|
| [docs/README.md](./docs/README.md) | Hub da documentacao — arquitetura e convencoes |
| [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) | Guia de contribuicao |
| [docs/api/SECURITY.md](./docs/api/SECURITY.md) | Seguranca das API Routes |
| [docs/architecture/COMPONENTS.md](./docs/architecture/COMPONENTS.md) | Catalogo de componentes reutilizaveis |
| [docs/content-management/ADDING_PAGES.md](./docs/content-management/ADDING_PAGES.md) | Como criar novas paginas |
| [docs/i18n/INDEX.md](./docs/i18n/INDEX.md) | Sistema de internacionalizacao |

---

## Contribuindo

Contribuicoes sao bem-vindas! Veja o [guia de contribuicao](./docs/CONTRIBUTING.md) para entender o fluxo.

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/minha-feature`)
3. Commit suas mudancas (`git commit -m 'feat: minha feature'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

---

## Licenca

MIT — veja [LICENSE](LICENSE).

---

<div align="center">

Feito por [Vinicius Bastazin](https://viniciusbastazin.vercel.app)

</div>
