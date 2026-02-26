export type ChangelogEntryType = "feature" | "fix" | "refactor" | "improvement";

export interface ChangelogItem {
  type: ChangelogEntryType;
  description: string;
  href?: string;
}

export interface ChangelogVersion {
  version: string;
  date: string;
  title: string;
  summary: string;
  items: ChangelogItem[];
}

export const CHANGELOG: ChangelogVersion[] = [
  {
    version: "0.16.0",
    date: "2026-02-20",
    title: "Newsletter completo: Redis + broadcast via curl",
    summary:
      "Inscritos salvos no Redis. Disparo manual com um clique via curl — conteúdo gerado do changelog. docs/NEWSLETTER.md com instruções.",
    items: [
      {
        type: "feature",
        description:
          "Newsletter no footer — formulário 'Avise-me de novidades' salva emails em Redis (newsletter:subscribers) + notifica o dono. Rate limit 3/hora por IP, honeypot anti-spam",
      },
      {
        type: "feature",
        description:
          "API /api/newsletter/broadcast — disparo manual via curl com Authorization Bearer. Envia para todos os inscritos o último changelog. Template HTML com título, resumo, itens e link para /novidades",
      },
      {
        type: "improvement",
        description:
          "docs/NEWSLETTER.md — documentação do fluxo, variáveis de ambiente (NEWSLETTER_BROADCAST_TOKEN, RESEND_FROM_EMAIL), exemplo de curl e configuração Resend",
      },
    ],
  },
  {
    version: "0.15.0",
    date: "2026-02-23",
    title: "FAB Unificado, Focus Mode Mobile, Segurança IA e Polimento Geral",
    summary:
      "FloatingActionMenu unifica scroll-to-top, modo foco e chat num único FAB expandível no desktop. Focus Mode integrado na MobileActionBar (só em conteúdos). Prompts de IA reescritos com delimitação XML, response_format json_object e 10 camadas de sanitização. Correção crítica nas reações e série de hardcoded strings traduzidas.",
    items: [
      {
        type: "feature",
        description:
          "FloatingActionMenu — FAB unificado no desktop (bottom-right): botão principal expande 3 ações animadas (scroll ao topo, modo foco, chat). Substitui os 3 botões flutuantes independentes. Usa framer-motion + AnimatePresence, fecha ao clicar fora",
      },
      {
        type: "feature",
        description:
          "Focus Mode no mobile — FocusModeToggle removido como botão flutuante e integrado na MobileActionBar como 6ª ação (grid-cols-6), exibido apenas em páginas de conteúdo (/dicas/*, /ferramentas/*, /implementacoes/*). Ícone destaca-se em cor primary quando ativo",
      },
      {
        type: "feature",
        description:
          "Exemplos clicáveis no PR Generator — 3 cards de exemplo (feat, fix, refactor) preenchem automaticamente todos os campos do formulário. Tipo exibido em cor específica (emerald/rose/violet). Card ativo destacado. Traduzidos em pt-BR, en, es, de",
        href: "/ferramentas/pr-generator",
      },
      {
        type: "improvement",
        description:
          "sanitizeUserInput hardened — 10 camadas de defesa: normalização Unicode NFKC, strip de chars de controle, instruction override, role switching, DAN/jailbreak, role markers markdown, leak de prompt, new task injection, context switching e XML tag injection",
      },
      {
        type: "improvement",
        description:
          "Prompts de IA reescritos (PR Generator e GitHub Analyzer) — identidade clara (PRBot/ProfileBot), delimitação XML (<pr_context>/<github_profile>) para separar dados de instruções, response_format: json_object garantindo JSON válido, temperature reduzida (0.3/0.4), guidelines de qualidade detalhados",
      },
      {
        type: "improvement",
        description:
          "GitHub Analyzer — bio, location, company e descrições de repos sanitizados via sanitizeUserInput() antes de entrar no prompt (dados de terceiros podem conter injections)",
      },
      {
        type: "fix",
        description:
          "Reações sempre zeradas — bug crítico: Upstash Redis hmget retorna Record<field, value> (objeto), não array. getCounts usava raw[0]/raw[1]/raw[2] que eram sempre undefined. Corrigido para raw['heart']/raw['fire']/raw['bulb']",
      },
      {
        type: "fix",
        description:
          "Chat widget não abria pelo FloatingActionMenu — evento 'open-chat-widget' era despachado em document mas o ChatWidget escutava em window. Corrigido para window.dispatchEvent()",
      },
      {
        type: "fix",
        description:
          "ReactionsSection buscava apenas os 10 primeiros CONTENT_ITEMS (slice(0,10)) — com 27 itens, páginas 11-27 nunca apareciam no dashboard /stats. Corrigido para usar todos os itens",
      },
      {
        type: "improvement",
        description:
          "Chat API — currentPage validado com regex de path URL (/^/[a-zA-Z0-9\\-_/]*$/) antes de entrar no system prompt. Valores inválidos descartados silenciosamente via .catch(undefined)",
      },
      {
        type: "improvement",
        description:
          "Hardcoded strings traduzidas: aria-label 'Progresso de leitura' em reading-progress.tsx, stat labels 'versão atual/versões/mudanças' no changelog (pt-BR fixo), data com toLocaleDateString('pt-BR') agora usa locale ativo, label 'Email' no footer.tsx",
      },
      {
        type: "fix",
        description:
          "namespace 'tutorialPage' adicionado ao array NAMESPACES em load-messages.ts — estava sendo usado em /contribua/tutorial mas não registrado, potencialmente causando falha em testes de namespace",
      },
      {
        type: "improvement",
        description:
          "Novas chaves de tradução adicionadas (pt-BR, en, es, de): global.readingProgress, changelogPage.hero.statCurrentVersion/statVersions/statChanges, footer.emailLabel, global.mobileFocus",
      },
    ],
  },
  {
    version: "0.14.0",
    date: "2026-02-23",
    title: "10 Novas Implementações — UX Global, Stats, Guias e Ferramentas IA",
    summary:
      "Maior release da plataforma: 4 melhorias de UX globais (ReadingProgress, ShareButton, FocusMode, RelatedContent), dashboard de métricas ao vivo (/stats), 3 novos guias técnicos (API Security, Design Patterns, Acessibilidade) e 2 novas ferramentas IA (PR Generator e GitHub Profile Analyzer) com APIs seguras no padrão da plataforma.",
    items: [
      {
        type: "feature",
        description:
          "ReadingProgress — barra de progresso de leitura fixada no topo (fixed top-0), calculada com scroll position / (documentHeight - viewportHeight). Exibida em todas as páginas de conteúdo via dynamic-page-helper",
      },
      {
        type: "feature",
        description:
          "ReadingTime — badge com tempo estimado de leitura em minutos. Campo readingMinutes? adicionado ao ContentItem type; todos os 21 itens existentes receberam valores calibrados",
      },
      {
        type: "feature",
        description:
          "ShareButton — botão de compartilhamento com Web Share API nativa (mobile/Chrome) e fallback automático para clipboard. Toast de 'Link copiado!' por 2s. Integrado ao rodapé de todas as páginas de conteúdo",
      },
      {
        type: "feature",
        description:
          "FocusModeToggle — botão flutuante no canto inferior direito que oculta navbar, footer e elementos [data-hide-focus] via classe CSS focus-mode no <html>. Estado persiste em localStorage",
      },
      {
        type: "feature",
        description:
          "RelatedContent — seção no final de cada conteúdo com até 3 itens da mesma categoria. Usa CONTENT_ITEMS filtrado por categoria, excluindo o item atual. Animado com AnimatedSection",
      },
      {
        type: "feature",
        description:
          "Dashboard /stats — página standalone de métricas ao vivo: visão geral (page views + visitantes únicos), top páginas com barra de progresso relativa, termos mais buscados via /api/search e reações por conteúdo via /api/reactions",
      },
      {
        type: "feature",
        description:
          "Guia /dicas/api-security — pipeline de segurança completo com 7 camadas: body size check, rate limiting in-memory e Redis, API key check, Zod schema, sanitização de input e output e secure headers. Com código real do projeto e checklist interativo",
        href: "/dicas/api-security",
      },
      {
        type: "feature",
        description:
          "Guia /dicas/design-patterns — 5 padrões GoF em TypeScript (Observer, Strategy, Factory, Decorator, Command) com toggle antes/depois de código, exemplos reais e guia de quando usar/não usar cada padrão",
        href: "/dicas/design-patterns",
      },
      {
        type: "feature",
        description:
          "Guia /dicas/a11y-guide — acessibilidade prática: ARIA roles e live regions, gerenciamento de foco (skip links, focus trap), HTML semântico e landmarks, contraste WCAG AA com ferramentas e checklist interativo de 10 itens para PRs",
        href: "/dicas/a11y-guide",
      },
      {
        type: "feature",
        description:
          "Ferramenta /ferramentas/pr-generator — gerador de PR descriptions com IA (gpt-4.1-nano). Suporta 8 tipos de PR (feat, fix, refactor...), gera sumário, lista de mudanças, passos de teste e notas de breaking changes. Copy para markdown. Rate limit 5 req/min via Redis",
        href: "/ferramentas/pr-generator",
      },
      {
        type: "feature",
        description:
          "Ferramenta /ferramentas/github-analyzer — análise de perfil GitHub com IA. Busca dados públicos da API do GitHub (perfil + top 10 repos) e gera análise com linguagens dominantes, destaques e sugestões de melhoria. Rate limit 3 req/min via Redis",
        href: "/ferramentas/github-analyzer",
      },
      {
        type: "feature",
        description:
          "API /api/pr-generator — POST com validação Zod, sanitização completa, rate limiting Redis (5/min), suporte a 4 locales e validação do output da IA antes de retornar ao cliente",
      },
      {
        type: "feature",
        description:
          "API /api/github-analyzer — POST com username validado por regex, busca paralela de perfil e repos na API pública do GitHub, análise via OpenAI com cache de 5min via Next.js fetch revalidate",
      },
      {
        type: "improvement",
        description:
          "content.ts — campo readingMinutes? adicionado ao tipo ContentItem e 5 novos itens registrados (api-security, design-patterns, a11y-guide, pr-generator, github-analyzer)",
      },
      {
        type: "improvement",
        description:
          "dynamic-page-helper.tsx — integra ReadingProgress, ReadingTime, ShareButton, FocusModeToggle e RelatedContent em todas as páginas de conteúdo. Registro de 5 novos componentes no COMPONENT_MAP",
      },
      {
        type: "improvement",
        description:
          "nav-data.ts — 5 novos itens no menu de navegação (api-security, design-patterns, a11y-guide, pr-generator, github-analyzer) e item /stats no grupo contribua",
      },
      {
        type: "improvement",
        description:
          "search-data.ts + search.json — tags e traduções para os 6 novos itens (5 conteúdos + stats). Traduzido em 4 idiomas",
      },
      {
        type: "improvement",
        description:
          "global.json — 7 novas chaves: readingTime, share, linkCopied, shareAriaLabel, focusMode, exitFocusMode, relatedContent. Traduzido em pt-BR, en, es, de",
      },
      {
        type: "improvement",
        description:
          "globals.css — regras CSS do focus mode: .focus-mode header, footer e [data-hide-focus] com display: none",
      },
      {
        type: "improvement",
        description:
          "types.d.ts + index.ts — 7 novos namespaces registrados: statsPage, apiSecurityPage, designPatternsPage, a11yGuidePage, prGeneratorPage, githubAnalyzerPage. Traduzidos em pt-BR, en, es, de",
      },
      {
        type: "improvement",
        description:
          "sitemap.ts — entrada estática adicionada para /stats com changeFrequency: daily",
      },
    ],
  },
  {
    version: "0.13.0",
    date: "2026-02-23",
    title: "Badges Trending & Popular na Navbar e Listagens",
    summary:
      "Badges dinâmicos 'Em alta' e 'Popular' no menu de navegação desktop e mobile e nas páginas de listagem de conteúdo, calculados com dados reais do Redis. Algoritmo que distingue tendência semanal de popularidade histórica, com fallback inteligente quando não há dados semanais disponíveis.",
    items: [
      {
        type: "feature",
        description:
          "Badges 'Em alta' (🔺 violeta) e 'Popular' (🔥 laranja) na navbar desktop e mobile — exibidos ao lado dos itens de submenu com base em dados reais de acesso, carregados no servidor via RSC",
      },
      {
        type: "feature",
        description:
          "getBadgePaths — função server-side que agrega os badges de todas as categorias de conteúdo (/implementacoes, /dicas, /ferramentas) e retorna um Record plain object serializável para os componentes client",
      },
      {
        type: "feature",
        description:
          "fetchWeeklyByCategory — busca os paths mais acessados na semana atual dentro de uma categoria, filtrando o sorted set semanal global por prefixo de path",
      },
      {
        type: "feature",
        description:
          "Fallback inteligente de badges — quando não há dados semanais reais ainda, divide os populares da categoria: top metade recebe badge 'trending', o restante recebe 'popular', garantindo badges visíveis desde o primeiro acesso",
      },
      {
        type: "improvement",
        description:
          "Badges nas páginas de listagem (content-listing-page) — 'Em alta' e 'Popular' também exibidos nos cards de conteúdo das listing pages, usando a mesma lógica do navbar para consistência visual",
      },
      {
        type: "improvement",
        description:
          "Badges nas sugestões da busca global (search-empty) — label 'Popular' exibido junto aos chips de busca popular para reforçar a indicação de conteúdo relevante",
      },
      {
        type: "improvement",
        description:
          "Traduções dos badges em 4 idiomas — badgeTrending e badgePopular adicionados nos arquivos nav.json de pt-BR, en, es e de",
      },
      {
        type: "refactor",
        description:
          "Navbar refatorada para RSC com prop drilling de badgePaths — Navbar (RSC) busca os dados e injeta via props em NavbarClient → DesktopNav / MobileNav → SubmenuItem / MobileMenuItem, sem fetch client-side",
      },
    ],
  },
  {
    version: "0.12.0",
    date: "2026-02-23",
    title: "Busca Popular, Cache de Queries e Documentação de API",
    summary:
      "Buscas populares em tempo real com rastreamento via Redis, cache client-side de queries no Fuse.js, invalidação automática por troca de idioma, refactor do cálculo de semana ISO em módulo compartilhado e documentação completa dos endpoints /api/reactions e /api/online na página contribua/api.",
    items: [
      {
        type: "feature",
        description:
          "API /api/search — POST rastreia termos buscados em um Redis Sorted Set (stats:searches) com rate limit distribuído; GET retorna os top 8 termos mais pesquisados com cache de 60s",
        href: "/contribua/api",
      },
      {
        type: "feature",
        description:
          "Sugestões de busca popular — a busca global exibe chips clicáveis com os termos mais buscados (carregados do Redis); fallback automático para lista curada se Redis indisponível ou vazio",
      },
      {
        type: "feature",
        description:
          "selectTerm — clique em chip de sugestão popula a query instantaneamente sem debounce nem loading, aproveitando o cache client-side do Fuse",
      },
      {
        type: "improvement",
        description:
          "Cache client-side de queries — resultados do Fuse.js são armazenados em um Map por query normalizada; hits no cache são servidos imediatamente sem nova busca ou estado de loading",
      },
      {
        type: "fix",
        description:
          "Invalidação de cache de busca por troca de idioma — o Map de queries é limpo sempre que o índice Fuse muda (useEffect no fuse), evitando resultados em idioma anterior após mudança de locale",
      },
      {
        type: "refactor",
        description:
          "getIsoWeekKey extraída para src/lib/week-key.ts — função de cálculo de semana ISO 8601 centralizada e compartilhada entre /api/stats/track e get-popular-slugs, eliminando duplicação",
      },
      {
        type: "improvement",
        description:
          "Documentação /contribua/api atualizada — endpoints /api/reactions e /api/online adicionados com método, path, rate limit, parâmetros e resposta em todos os 4 idiomas (pt-BR, en, es, de)",
        href: "/contribua/api",
      },
      {
        type: "improvement",
        description:
          "docs/api/SECURITY.md atualizado — tabela de rate limiting expandida com os novos endpoints e fluxos detalhados de GET/POST para /api/reactions e /api/online",
      },
    ],
  },
  {
    version: "0.11.0",
    date: "2026-02-22",
    title: "Reações, Comentários e Responsividade Mobile",
    summary:
      "Sistema de reações por página (❤️🔥💡) com Redis, integração Giscus para comentários via GitHub Discussions, contador de usuários online em tempo real e correções completas de responsividade mobile no Code Evolution e no Mapa de Arquitetura.",
    items: [
      {
        type: "feature",
        description:
          "Sistema de reações por página — ❤️ Curtir, 🔥 Incrível, 💡 Útil com toggle (adicionar, remover e trocar voto), armazenadas no Redis com deduplicação por IP + TTL de 24h",
      },
      {
        type: "feature",
        description:
          "Integração Giscus — comentários via GitHub Discussions com tema CSS customizado que acompanha o tema escuro do site, carregamento lazy após primeira reação",
      },
      {
        type: "feature",
        description:
          "ContentFooter — componente unificado que combina reações + comentários ao final de cada conteúdo; comentários aparecem automaticamente após o primeiro voto (via sessionStorage)",
      },
      {
        type: "feature",
        description:
          "Online Counter — indicador de usuários online em tempo real no footer, atualizado a cada 30s via polling ao /api/online, usando Redis Sorted Set com TTL por sessão",
      },
      {
        type: "feature",
        description:
          "API /api/reactions — endpoint com validação Zod, rate limiting distribuído via Redis, suporte a GET (leitura de contagens + voto do usuário) e POST (votar/desvota/trocar)",
      },
      {
        type: "feature",
        description:
          "API /api/online — rastreamento de presença com Redis, registrado automaticamente pelo ViewTracker via sendBeacon em toda mudança de rota",
      },
      {
        type: "feature",
        description:
          "Rate limiter distribuído via Upstash Redis — substitui o in-memory por fixed window atômica (INCR + EXPIRE) entre instâncias serverless; fallback silencioso para in-memory se Redis indisponível",
      },
      {
        type: "fix",
        description:
          "Code Evolution mobile — scroll horizontal funcional no código com whitespace-pre + w-max min-w-full; step dots substituídos por contador compacto 'N / total' no mobile para evitar overflow",
      },
      {
        type: "fix",
        description:
          "Code Evolution mobile — min-w-0 nos itens do grid para forçar criação de scroll em vez de expansão do container; padding e fonte reduzidos nas barras de git e commit",
      },
      {
        type: "fix",
        description:
          "Seletores de evolução e projeto — scroll horizontal no mobile (overflow-x-auto) com shrink-0 nos botões, mantendo wrap centralizado no desktop",
      },
      {
        type: "refactor",
        description:
          "ViewTracker — agora dispara beacon duplo (stats/track + online) em cada mudança de rota para registrar visualização e presença simultaneamente",
      },
    ],
  },
  {
    version: "0.10.0",
    date: "2026-02-22",
    title: "Mapa de Arquitetura Interativo",
    summary:
      "Novo guia visual e interativo com 5 arquiteturas reais de referência (E-commerce SaaS, Dashboard Real-time, Social Feed, Video Streaming e Ride Sharing), layout dual responsivo e painel de detalhes animado com traduções estáveis via snapshot.",
    items: [
      {
        type: "feature",
        description:
          "Guia: Mapa de Arquitetura — canvas interativo com nodes clicáveis, linhas de conexão animadas com SVG e painel de detalhes por node com tech stack e descrição técnica",
        href: "/dicas/arch-map",
      },
      {
        type: "feature",
        description:
          "5 arquiteturas de referência: E-commerce SaaS (Next.js + tRPC), Real-time Dashboard (WebSocket + Kafka), Social Feed (GraphQL + Cassandra), Video Streaming (HLS + FFmpeg) e Ride Sharing (Geohash + PostGIS)",
      },
      {
        type: "feature",
        description:
          "3 novos projetos complexos — Social Feed (fan-out on write, Redis Sorted Sets, RabbitMQ), Video Streaming (tus upload, GPU transcoding, TF Recommenders) e Ride Sharing (matching Dijkstra, surge pricing ML, Redis Geo)",
      },
      {
        type: "feature",
        description:
          "Layout dual responsivo — canvas absoluto com connection lines no desktop; grid 2 colunas sem SVG no mobile para garantir usabilidade em telas pequenas",
      },
      {
        type: "refactor",
        description:
          "Estrutura modular projects/ — cada arquitetura em arquivo independente (ecommerce-saas.ts, realtime-dashboard.ts, social-feed.ts, video-streaming.ts, ride-sharing.ts) importados e re-exportados via index.ts; arch-data.ts virou re-export de uma linha",
      },
      {
        type: "fix",
        description:
          "DetailPanel + AnimatePresence — padrão DetailSnapshot captura label, description e details traduzidos no momento do clique, eliminando MISSING_MESSAGE durante transições de projeto",
      },
      {
        type: "fix",
        description:
          "React 19 key prop compliance — removido padrão sharedNodeProps que incluía key no spread; props passados explicitamente com key={node.id} diretamente no JSX em ambos os layouts",
      },
    ],
  },
  {
    version: "0.9.0",
    date: "2026-02-22",
    title: "Novidades, Evolução de Código e Navbar Server Component",
    summary:
      "Página de novidades com timeline animada, novo guia interativo de evolução de código com 4 exemplos e refatoração do Navbar para Server Component com slugs populares via Redis.",
    items: [
      {
        type: "feature",
        description:
          "Página Novidades — timeline animada do histórico de versões com badges por tipo (feature, fix, refactor, improvement)",
        href: "/novidades",
      },
      {
        type: "feature",
        description:
          "Guia: Evolução de Código — player interativo tipo git log animado com steps, métricas de qualidade e autoplay",
        href: "/dicas/code-evolution",
      },
      {
        type: "feature",
        description:
          "4 exemplos de evolução: React Lifecycle (class → SWR), State Management (prop drilling → Zustand), Form Validation (input não controlado → RHF + Zod) e Async Error Handling (fetch → Suspense + ErrorBoundary)",
      },
      {
        type: "refactor",
        description:
          "Navbar refatorado para Server Component: `Navbar` vira async server, `NavbarClient` isola interatividade — slugs populares buscados server-side",
      },
      {
        type: "feature",
        description:
          "`getPopularSlugs` — busca os conteúdos mais acessados no Redis com `unstable_cache` e filtra páginas de seção (depth < 2)",
      },
      {
        type: "refactor",
        description:
          "Evoluções isoladas em arquivos individuais (`evolutions/*.ts`) — estrutura escalável e de fácil manutenção",
      },
      {
        type: "fix",
        description:
          "`AbortError` filtrado no catch do custom hook `useUser` — eliminava falsos estados de erro no unmount",
      },
      {
        type: "fix",
        description:
          "Rate limit corrigido para IPs desconhecidos — `getIp` retorna fallback seguro em vez de lançar exceção",
      },
      {
        type: "improvement",
        description:
          "Novidades e Evolução de Código registradas na busca global, navegação e sitemap",
      },
    ],
  },
  {
    version: "0.8.0",
    date: "2026-02-22",
    title: "Refatoração Estrutural",
    summary:
      "Consolidação de código duplicado, unificação de utilitários e refatoração de componentes para maior reutilização e manutenibilidade.",
    items: [
      {
        type: "refactor",
        description:
          "Mapeamento categoria → rota centralizado em `content-paths.ts` (removido de 4 arquivos)",
      },
      {
        type: "refactor",
        description:
          "Utilitários `fillCodeComments` e `fillCodePlaceholders` unificados em `fill-code-placeholders.ts`",
      },
      {
        type: "refactor",
        description:
          "CodeBlock consolidado: componente local de ts-patterns absorvido pelo global (suporte a `highlight` e animação linha a linha)",
      },
      {
        type: "refactor",
        description:
          "Arquivos de exemplos de código padronizados para `code-examples.ts` em todos os features",
      },
      {
        type: "refactor",
        description:
          "React Query Tips refatorado de arquivo único (217 linhas) para pasta com 5 seções independentes",
      },
    ],
  },
  {
    version: "0.7.0",
    date: "2026-02-20",
    title: "5 Novos Lançamentos",
    summary:
      "Semana de lançamentos: guias, implementações e ferramentas novas, além de i18n nos comentários de código.",
    items: [
      {
        type: "feature",
        description:
          "Guia: Next.js App Router — layouts, Server/Client Components, data fetching",
        href: "/dicas/nextjs-app-router",
      },
      {
        type: "feature",
        description:
          "Implementação: Contact Showcase — API, Zod, rate limit, reCAPTCHA, Resend e comparativo de libs",
        href: "/implementacoes/contact-form",
      },
      {
        type: "feature",
        description:
          "Ferramenta: JSON Formatter & Validator — pretty print, minify e validação",
        href: "/ferramentas/json",
      },
      {
        type: "feature",
        description:
          "Guia: Estado no React — useState, Context, Zustand com exemplos replicáveis",
        href: "/dicas/state-management",
      },
      {
        type: "feature",
        description:
          "Implementação: Testing Showcase — Vitest, Testing Library, mocks e checklist",
        href: "/implementacoes/testing",
      },
      {
        type: "improvement",
        description:
          "Comentários de código nos exemplos traduzidos por idioma (pt-BR, en, es, de)",
      },
      {
        type: "fix",
        description: "Placeholders `{{0}}` visíveis na UI em inglês corrigidos",
      },
      {
        type: "improvement",
        description:
          "Layout da hero da home ajustado para evitar quebra de linha nos stats",
      },
    ],
  },
  {
    version: "0.6.0",
    date: "2026-02-18",
    title: "Analytics, Privacidade e Tutorial",
    summary:
      "Métricas ao vivo com Upstash Redis, guia de LGPD/cookies e tutorial interativo de contribuição.",
    items: [
      {
        type: "feature",
        description:
          "Implementação: Analytics com Upstash Redis — page views, visitantes únicos e filtro de bots",
        href: "/implementacoes/analytics",
      },
      {
        type: "feature",
        description:
          "Guia: Privacidade e Cookies — LGPD, consentimento, banner e política de privacidade",
        href: "/dicas/privacy-tips",
      },
      {
        type: "feature",
        description:
          "Tutorial interativo de contribuição com file tree animada",
        href: "/contribua/tutorial",
      },
      {
        type: "improvement",
        description:
          "Configuração de branch protection e CI/CD com GitHub Actions",
      },
      {
        type: "feature",
        description: "Componente BackLink reutilizável adicionado",
      },
    ],
  },
  {
    version: "0.5.0",
    date: "2026-02-18",
    title: "Guias, Ferramentas e Busca",
    summary:
      "Explosão de conteúdo: 4 guias novos, 2 ferramentas interativas e busca global refatorada.",
    items: [
      {
        type: "feature",
        description:
          "Guia: Git Workflow & Cheat Sheet — branching, conventional commits e comandos",
        href: "/dicas/git-workflow",
      },
      {
        type: "feature",
        description:
          "Guia: React Design Patterns — Compound Components, Hooks, Render Props, HOCs",
        href: "/dicas/react-patterns",
      },
      {
        type: "feature",
        description:
          "Guia: TypeScript Patterns — Utility Types, Generics e Type Narrowing",
        href: "/dicas/typescript-patterns",
      },
      {
        type: "feature",
        description:
          "Guia: Segurança Frontend & Backend — Rate Limiting, reCAPTCHA, Honeypot, Zod e Headers",
        href: "/dicas/security-tips",
      },
      {
        type: "feature",
        description:
          "Guia: Recursos para Devs Jr/Pleno/Sênior — snippets e playground por nível",
        href: "/dicas/dev-resources",
      },
      {
        type: "feature",
        description:
          "Ferramenta: Regex Playground — editor interativo com highlight em tempo real",
        href: "/ferramentas/regex",
      },
      {
        type: "feature",
        description:
          "Ferramenta: AI Code Reviewer — análise com GPT-4o Mini e score de qualidade",
        href: "/ferramentas/code-review",
      },
      {
        type: "improvement",
        description:
          "Busca global refatorada: i18n completo, botão limpar e melhorias responsivas",
      },
      {
        type: "improvement",
        description: "Navegação com colunas por categoria e links 'ver todos'",
      },
      {
        type: "feature",
        description: "Mobile action bar flutuante",
      },
    ],
  },
  {
    version: "0.4.0",
    date: "2026-02-17",
    title: "Chatbot IA e Mais Guias",
    summary:
      "Integração com OpenAI, novos guias de React/Tailwind/React Query e melhorias de performance.",
    items: [
      {
        type: "feature",
        description:
          "Implementação: AI Chatbot com OpenAI — streaming, Vercel AI SDK e system prompt",
        href: "/implementacoes/ai-chatbot",
      },
      {
        type: "feature",
        description:
          "Guia: React Query Essencial — cache, mutations, invalidação e optimistic updates",
        href: "/dicas/react-query-tips",
      },
      {
        type: "feature",
        description:
          "Guia: Tailwind CSS + shadcn/ui — setup, componentes e boas práticas",
        href: "/dicas/tailwind-tips",
      },
      {
        type: "feature",
        description:
          "Guia: Dicas de IA — v0, Copilot, prompt engineering e ferramentas",
        href: "/dicas/ai-tips",
      },
      {
        type: "feature",
        description: "Página 404 personalizada",
      },
      {
        type: "improvement",
        description: "Vercel Analytics e Speed Insights integrados",
      },
      {
        type: "improvement",
        description: "Hero component refatorado para slots flexíveis e reuso",
      },
      {
        type: "improvement",
        description: "Imagens de projetos convertidas para WebP",
      },
    ],
  },
  {
    version: "0.3.0",
    date: "2026-02-17",
    title: "SEO Showcase e i18n Completo",
    summary:
      "SEO técnico documentado com exemplos reais e cobertura multilíngue expandida.",
    items: [
      {
        type: "feature",
        description:
          "Implementação: SEO Showcase — Meta tags, Open Graph, JSON-LD, Sitemap e Robots",
        href: "/implementacoes/seo",
      },
      {
        type: "improvement",
        description:
          "Suporte multilíngue completo para todas as seções (pt-BR, en, es, de)",
      },
      {
        type: "improvement",
        description: "Variáveis de ambiente documentadas",
      },
    ],
  },
  {
    version: "0.2.0",
    date: "2026-02-16",
    title: "i18n Showcase e Busca Global",
    summary:
      "Primeira implementação ao vivo com demo de internacionalização e busca global tipada.",
    items: [
      {
        type: "feature",
        description:
          "Implementação: i18n Showcase — demo ao vivo com 4 idiomas usando next-intl e DeepL",
        href: "/implementacoes/i18n",
      },
      {
        type: "feature",
        description: "Busca global com tipagem e type safety",
      },
      {
        type: "feature",
        description: "Sistema de rotas dinâmicas com CONTENT_ITEMS",
      },
      {
        type: "improvement",
        description: "Estrutura reorganizada em feature-based folders",
      },
    ],
  },
  {
    version: "0.1.0",
    date: "2026-02-16",
    title: "Lançamento Inicial",
    summary:
      "Fundação do projeto: stack completa, i18n em 4 idiomas, home page e documentação técnica.",
    items: [
      {
        type: "feature",
        description:
          "Estrutura inicial com Next.js 15, TypeScript, Tailwind CSS e shadcn/ui",
      },
      {
        type: "feature",
        description: "i18n com next-intl em 4 idiomas: pt-BR, en, es, de",
      },
      {
        type: "feature",
        description:
          "Home page com seções: About, Tech Stack, GitHub Stats, Projects, Experience, AI Innovation e Contact",
      },
      {
        type: "feature",
        description:
          "Documentação técnica completa: i18n, content management e design system",
      },
    ],
  },
];
