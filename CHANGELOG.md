# Changelog

Todas as mudanças notáveis deste projeto são documentadas aqui.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

---

## [Unreleased]

---

## [0.13.0] — 2026-02-23

### Badges Trending & Popular na Navbar e Listagens

> Badges dinâmicos "Em alta" e "Popular" no menu de navegação desktop e mobile e nas páginas de listagem de conteúdo, calculados com dados reais do Redis. Algoritmo que distingue tendência semanal de popularidade histórica, com fallback inteligente quando não há dados semanais disponíveis.

#### Adicionado

- **Badges na navbar** — "Em alta" (violeta) e "Popular" (laranja) ao lado dos itens de submenu, carregados via RSC com dados reais do Redis
- **getBadgePaths** — agrega badges de todas as categorias em um `Record` plain object serializável para componentes client
- **fetchWeeklyByCategory** — busca os paths mais acessados na semana atual dentro de uma categoria via Redis Sorted Set semanal
- **Fallback inteligente** — sem dados semanais, divide os populares da categoria: top metade → "trending", resto → "popular"

#### Melhorado

- **Badges nas listing pages** — "Em alta" e "Popular" nos cards de conteúdo, usando a mesma lógica do navbar
- **Badges na busca global** — label "Popular" nos chips de sugestão do `search-empty`
- **Traduções** — `badgeTrending` e `badgePopular` adicionados nos `nav.json` de pt-BR, en, es e de

#### Refatorado

- **Navbar para RSC com prop drilling** — Navbar (RSC) busca dados → injeta via props em NavbarClient → DesktopNav / MobileNav → SubmenuItem / MobileMenuItem, eliminando fetch client-side

---

## [0.12.0] — 2026-02-23

### Busca Popular, Cache de Queries e Documentação de API

> Buscas populares em tempo real com rastreamento via Redis, cache client-side de queries no Fuse.js, invalidação automática por troca de idioma, refactor do cálculo de semana ISO em módulo compartilhado e documentação completa dos endpoints /api/reactions e /api/online na página contribua/api.

#### Adicionado

- **API /api/search** — POST rastreia termos buscados em um Redis Sorted Set (`stats:searches`) com rate limit distribuído; GET retorna os top 8 termos mais pesquisados com cache de 60s
- **Sugestões de busca popular** — a busca global exibe chips clicáveis com os termos mais buscados (carregados do Redis); fallback automático para lista curada se Redis indisponível ou vazio
- **selectTerm** — clique em chip de sugestão popula a query instantaneamente sem debounce nem loading, aproveitando o cache client-side do Fuse

#### Melhorado

- **Cache client-side de queries** — resultados do Fuse.js são armazenados em um `Map` por query normalizada; hits no cache são servidos imediatamente sem nova busca ou estado de loading
- **Documentação /contribua/api** — endpoints `/api/reactions` e `/api/online` adicionados com método, path, rate limit, parâmetros e resposta em todos os 4 idiomas (pt-BR, en, es, de)
- **docs/api/SECURITY.md** — tabela de rate limiting expandida e fluxos detalhados de GET/POST para `/api/reactions` e `/api/online`

#### Corrigido

- **Invalidação de cache por troca de idioma** — o Map de queries é limpo quando o índice Fuse muda, evitando resultados em idioma anterior após mudança de locale

#### Refatorado

- **getIsoWeekKey** extraída para `src/lib/week-key.ts` — função de cálculo de semana ISO 8601 centralizada e compartilhada entre `/api/stats/track` e `get-popular-slugs`, eliminando duplicação de código

---

## [0.11.0] — 2026-02-22

### Adicionado

- **Sistema de Reações** — ❤️ Curtir, 🔥 Incrível, 💡 Útil por página; toggle completo (adicionar, remover e trocar voto), contagens armazenadas no Redis com deduplicação por IP + TTL de 24h
- **Giscus Comments** — Integração com GitHub Discussions para comentários; tema CSS customizado que acompanha o dark mode; carregamento lazy após a primeira reação do usuário
- **ContentFooter** — Componente unificado ao final de cada conteúdo combinando reações + comentários; comentários abrem automaticamente após o primeiro voto via sessionStorage
- **Online Counter** — Indicador de usuários online em tempo real no footer; polling a cada 30s ao `/api/online`; presença armazenada no Redis com Sorted Set e TTL por sessão
- **API `/api/reactions`** — Validação Zod, rate limiting distribuído via Redis, suporte a GET (contagens + voto do usuário) e POST (votar/desvota/trocar)
- **API `/api/online`** — Rastreamento de presença com Redis, registrado automaticamente pelo `ViewTracker` via `sendBeacon` em toda mudança de rota
- **Rate limiter distribuído** — `redis-rate-limit.ts` via Upstash Redis com fixed window atômica (INCR + EXPIRE); fallback silencioso para in-memory se Redis indisponível

### Corrigido

- **Code Evolution mobile** — Scroll horizontal funcional no código com `whitespace-pre` + `w-max min-w-full`; `min-w-0` nos itens do grid para forçar scroll em vez de expansão do container
- **Code Evolution mobile** — Step dots substituídos por contador compacto `N / total` no mobile, eliminando overflow na barra de controles
- **Seletores de evolução e projeto** — Scroll horizontal (`overflow-x-auto`) com `shrink-0` nos botões no mobile; barras de git e commit com padding reduzido e truncate

### Melhorado

- `ViewTracker` agora dispara beacon duplo (`stats/track` + `online`) em cada mudança de rota para registrar visualização e presença simultaneamente

---

## [0.10.0] — 2026-02-22

### Adicionado

- **Guia: Mapa de Arquitetura Interativo** — Canvas visual com nodes clicáveis, linhas SVG animadas e painel de detalhes com tech stack por camada (`/dicas/arch-map`)
- **5 arquiteturas de referência**: E-commerce SaaS (Next.js + tRPC + Prisma), Real-time Dashboard (WebSocket + Kafka + TimescaleDB), Social Feed (GraphQL + Cassandra + Fan-out), Video Streaming (HLS + FFmpeg GPU + TF Recommenders) e Ride Sharing (Geohash + PostGIS + Redis Geo)
- **Layout dual responsivo** — Desktop com canvas absoluto e connection lines SVG; mobile com grid 2 colunas sem SVG, garantindo usabilidade em telas pequenas
- **Estrutura modular `projects/`** — Cada arquitetura em arquivo independente (`ecommerce-saas.ts`, `realtime-dashboard.ts`, `social-feed.ts`, `video-streaming.ts`, `ride-sharing.ts`); `arch-data.ts` virou re-export de uma linha

### Corrigido

- **DetailPanel + AnimatePresence** — Padrão `DetailSnapshot` captura label, description e details já traduzidos no momento do clique, eliminando `MISSING_MESSAGE` durante transições de projeto
- **React 19 key prop compliance** — Removido padrão `sharedNodeProps` que incluía `key` no spread; props passados explicitamente com `key={node.id}` diretamente no JSX

---

## [0.9.0] — 2026-02-22

### Adicionado

- **Página: Novidades** — Timeline animada do histórico de versões com badges por tipo (feature, fix, refactor, improvement) e links diretos para cada conteúdo (`/novidades`)
- **Guia: Evolução de Código** — Player interativo tipo "git log animado" com steps, métricas de qualidade, melhorias explicadas e autoplay (`/dicas/code-evolution`)
- 4 exemplos de evolução: React Lifecycle (class → SWR), State Management (prop drilling → Zustand), Form Validation (input não controlado → RHF + Zod), Async Error Handling (fetch → Suspense + ErrorBoundary)
- `getPopularSlugs` — busca os conteúdos mais acessados do Redis com `unstable_cache`, filtrando páginas de seção (depth < 2)

### Refatorado

- **Navbar virou Server Component**: lógica de interatividade isolada em `NavbarClient`, slugs populares buscados server-side via `getPopularSlugs`
- Cada evolução isolada em arquivo próprio (`evolutions/*.ts`) — estrutura escalável e de fácil manutenção

### Corrigido

- `AbortError` filtrado no catch do custom hook `useUser` — evitava falso estado de erro ao desmontar o componente
- Rate limit corrigido para IPs desconhecidos — `getIp` retorna fallback seguro em vez de lançar exceção

### Melhorado

- Novidades e Evolução de Código registradas na busca global, navegação e sitemap

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
