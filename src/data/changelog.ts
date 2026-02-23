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
