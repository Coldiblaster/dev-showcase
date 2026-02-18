# Analytics — Metricas ao Vivo

Sistema proprio de analytics leve e privacy-friendly usando Upstash Redis.

Coleta page views, visitantes unicos e ranking de paginas mais acessadas, exibindo os dados em tempo real na home e na pagina de contribuicao.

---

## Visao geral

```
Navegador do usuario
       │
       │  useEffect (1x por pagina/sessao)
       ▼
┌─────────────────────┐
│   ViewTracker        │  ← sendBeacon / fetch keepalive
│   (client component) │     Deduplicacao via sessionStorage
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  POST /api/stats/   │
│       track         │
│                     │
│  1. Bot filter (UA) │
│  2. Rate limiting   │
│  3. Zod validation  │
│  4. IP hash (SHA256)│
│  5. Redis pipeline: │
│     INCR  views     │
│     PFADD visitors  │
│     ZINCRBY pages   │
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│    Upstash Redis     │  ← REST API (serverless/edge)
│                     │
│  stats:views   (STR)│  Total de page views
│  stats:visitors(HLL)│  Visitantes unicos (HyperLogLog)
│  stats:pages   (ZS) │  Ranking de paginas (Sorted Set)
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  GET /api/stats      │
│                     │
│  1. Rate limiting   │
│  2. Cache in-memory │
│     (60s TTL)       │
│  3. Redis pipeline  │
│  4. Cache-Control   │
│     CDN headers     │
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│   useSiteStats()     │  ← Hook React
│                     │
│  fetch /api/stats   │
│  loading / error    │
│  retry              │
└──────────┬──────────┘
           ▼
┌─────────────────────────────────┐
│   UI                             │
│                                 │
│  HomeHeroSection                │
│    → badges: X visitantes,      │
│      Y visualizacoes            │
│                                 │
│  PlatformStatsSection           │
│    → cards + top 5 pages        │
│      (pagina /contribua)        │
└─────────────────────────────────┘
```

---

## Modelo de dados (Redis)

| Chave            | Tipo        | Descricao                                          |
| ---------------- | ----------- | -------------------------------------------------- |
| `stats:views`    | String      | Contador incremental (`INCR`) de total de views    |
| `stats:visitors` | HyperLogLog | Estimativa probabilistica de visitantes unicos     |
| `stats:pages`    | Sorted Set  | Ranking de paginas por numero de views (`ZINCRBY`) |

### Por que HyperLogLog?

HyperLogLog usa ~12 KB fixos para contar milhoes de unicos com margem de erro < 1%. Muito mais eficiente que guardar cada IP.

### Por que Sorted Set?

Permite buscar o top N de paginas com um unico `ZRANGE ... REV`, sem precisar iterar sobre todos os dados.

---

## Arquivos do sistema

| Arquivo                                              | Tipo             | Responsabilidade                             |
| ---------------------------------------------------- | ---------------- | -------------------------------------------- |
| `src/lib/redis.ts`                                   | Infra            | Cliente Upstash Redis (graceful degradation) |
| `src/app/api/stats/track/route.ts`                   | API Route (POST) | Registra page view no Redis                  |
| `src/app/api/stats/route.ts`                         | API Route (GET)  | Retorna metricas agregadas                   |
| `src/components/view-tracker.tsx`                    | Client Component | Dispara tracking via sendBeacon              |
| `src/hooks/use-site-stats.ts`                        | Hook             | Busca stats da API com loading/error/retry   |
| `src/features/home/hero-section.tsx`                 | Feature          | Exibe badges de visitantes e views no hero   |
| `src/features/contribute/platform-stats-section.tsx` | Feature          | Seção completa com cards e top pages         |

---

## Tracking — `POST /api/stats/track`

### Fluxo

```
1. Redis disponivel?  → Nao: retorna { ok: true } (graceful degradation)
2. isBot(request)?    → Sim: retorna { ok: true } (silencioso)
3. rateLimit(ip)      → 60 req/min por IP
4. Zod validation     → path: string, min 1, max 200
5. IP hash            → SHA256(ip + REDIS_TOKEN).slice(0,16)
6. Redis pipeline:
   - INCR stats:views
   - PFADD stats:visitors <ipHash>
   - ZINCRBY stats:pages 1 <path>
7. Retorna { ok: true }
```

### Filtro de bots

O endpoint ignora requests de bots conhecidos via regex no User-Agent:

- **Crawlers**: Google, Bing, Yandex, Baidu, DuckDuckGo
- **SEO tools**: Semrush, Ahrefs, Mj12bot, Dotbot, Petalbot
- **IA**: GPTBot, Claude, ByteSpider
- **Automacao**: Selenium, Puppeteer, Playwright, PhantomJS, Headless
- **Monitoring**: Lighthouse, PageSpeed, Pingdom, UptimeRobot
- **UA invalido**: vazio ou com menos de 10 caracteres

### Privacidade

- **Nenhum dado pessoal armazenado** — o IP e convertido em hash SHA256 truncado
- O hash usa o token Redis como salt, impossibilitando reverter
- Nenhum cookie e utilizado
- O HyperLogLog armazena apenas bits, nao os hashes individuais

---

## Leitura — `GET /api/stats`

### Fluxo

```
1. Redis disponivel?  → Nao: retorna { views: 0, visitors: 0, topPages: [] }
2. rateLimit(ip)      → 30 req/min por IP
3. Cache in-memory    → TTL 60s → se valido: retorna com X-Cache: HIT
4. Redis pipeline:
   - GET stats:views
   - PFCOUNT stats:visitors
   - ZRANGE stats:pages 0 4 REV WITHSCORES
5. Monta resposta, atualiza cache
6. Retorna com Cache-Control e X-Cache: MISS
```

### Cache (duas camadas)

| Camada    | TTL  | Onde                       | Beneficio                              |
| --------- | ---- | -------------------------- | -------------------------------------- |
| In-memory | 60s  | Processo Node.js           | Evita chamadas ao Redis                |
| CDN       | 60s  | Edge (Vercel / CloudFlare) | Evita chamadas ao servidor             |
| Stale     | 300s | `stale-while-revalidate`   | Mostra dados antigos enquanto atualiza |

### Resposta

```json
{
  "views": 1234,
  "visitors": 456,
  "topPages": [
    { "path": "/", "views": 500 },
    { "path": "/implementacoes", "views": 200 },
    { "path": "/dicas", "views": 150 },
    { "path": "/contribua", "views": 100 },
    { "path": "/ferramentas", "views": 80 }
  ]
}
```

### Error handling

```
Redis falha → cache stale existe?
  → Sim: retorna stale + X-Cache: STALE
  → Nao: retorna { views: 0, visitors: 0, topPages: [] } + status 500
```

---

## ViewTracker — client-side

Componente renderizado no `layout.tsx` (raiz da aplicacao).

### Comportamento

1. Extrai o path sem prefixo de locale (`/pt-BR/dicas` → `/dicas`)
2. Verifica `sessionStorage` — se ja trackou esse path nessa sessao, ignora
3. Marca como trackado no `sessionStorage`
4. Envia via `navigator.sendBeacon` (preferido) ou `fetch` com `keepalive: true`

### Por que sendBeacon?

- Nao bloqueia a navegacao do usuario
- Garante entrega mesmo se o usuario fechar a aba
- Sem impacto em performance (fire-and-forget)

### Deduplicacao

Usa `sessionStorage` (por aba/sessao):

- Mesma pagina visitada 2x na sessao = 1 view
- Nova sessao (nova aba ou reabriu o browser) = conta novamente
- Diferente de `localStorage` que persistiria entre sessoes

---

## useSiteStats — hook

```typescript
const { stats, loading, error, retry } = useSiteStats();
```

| Propriedade | Tipo      | Descricao                         |
| ----------- | --------- | --------------------------------- |
| `stats`     | SiteStats | `{ views, visitors, topPages[] }` |
| `loading`   | boolean   | `true` durante o fetch            |
| `error`     | boolean   | `true` se a API falhou            |
| `retry`     | function  | Re-executa o fetch manualmente    |

Usado em `HomeHeroSection` e `PlatformStatsSection`.

---

## UI — onde os dados aparecem

### Home (hero-section)

Badges inline no hero, entre os destaques:

```
👤 X visitantes • 👁 Y visualizacoes • ✓ 8+ anos ... • ✓ Projetos reais ...
```

- So aparece quando `hasStats = !loading && (visitors > 0 || views > 0)`
- Icones decorativos com `aria-hidden="true"`
- Separadores `•` com `aria-hidden="true"`

### Contribua (platform-stats-section)

Secao dedicada com:

- **2 cards** — visitantes unicos e total de visualizacoes (com `aria-label`)
- **Top 5 pages** — lista com links, nomes traduzidos e contagem
- **Estados**: loading (spinner), error (botao retry), sem dados (mensagem)

---

## i18n

Todas as strings sao traduzidas nos 4 locales (pt-BR, en, es, de):

### Hero (`hero.json`)

| Chave             | pt-BR                   | en                   | es                        | de                      |
| ----------------- | ----------------------- | -------------------- | ------------------------- | ----------------------- |
| `stats.visitors`  | `{count} visitantes`    | `{count} visitors`   | `{count} visitantes`      | `{count} Besucher`      |
| `stats.pageViews` | `{count} visualizacoes` | `{count} page views` | `{count} visualizaciones` | `{count} Seitenaufrufe` |

### Contribua (`contributePage.json` → `platformStats`)

| Chave       | pt-BR                                      | en                 | es                    | de                   |
| ----------- | ------------------------------------------ | ------------------ | --------------------- | -------------------- |
| `badge`     | Metricas ao Vivo                           | Live Metrics       | Metricas en Vivo      | Live-Metriken        |
| `visitors`  | Visitantes unicos                          | Unique visitors    | Visitantes unicos     | Eindeutige Besucher  |
| `pageViews` | Visualizacoes                              | Page views         | Vistas de pagina      | Seitenaufrufe        |
| `viewCount` | `{count} visualizacoes`                    | `{count} views`    | `{count} vistas`      | `{count} Aufrufe`    |
| `topPages`  | Paginas mais acessadas                     | Most visited pages | Paginas mas visitadas | Meistbesuchte Seiten |
| `pageNames` | (mapa de 24 paginas traduzidas por locale) |

---

## Seguranca

| Protecao                  | Descricao                                                    |
| ------------------------- | ------------------------------------------------------------ |
| **Rate limiting (track)** | 60 req/min por IP — evita abuso de contagem                  |
| **Rate limiting (stats)** | 30 req/min por IP — evita scraping                           |
| **Bot filter**            | Regex em User-Agent — ignora crawlers e automacao            |
| **IP hashing**            | SHA256 com salt (Redis token) — nao armazena IP real         |
| **Zod validation**        | Path validado (min 1, max 200 chars)                         |
| **Graceful degradation**  | Se Redis indisponivel, retorna OK/vazio sem erros            |
| **Nao rastreia cookies**  | Zero cookies — deduplicacao via sessionStorage (client-only) |

---

## Performance

| Otimizacao          | Impacto                                            |
| ------------------- | -------------------------------------------------- |
| **Redis pipeline**  | 3 operacoes em 1 chamada de rede (~1-5ms)          |
| **sendBeacon**      | Fire-and-forget, nao bloqueia UI                   |
| **Cache in-memory** | Stats servidos sem Redis por 60s                   |
| **Cache CDN**       | `s-maxage=60, stale-while-revalidate=300`          |
| **sessionStorage**  | Evita requests duplicados na mesma sessao          |
| **HyperLogLog**     | ~12 KB fixos para milhoes de unicos                |
| **Componente nulo** | `ViewTracker` retorna `null` — zero impacto no DOM |

---

## Variaveis de ambiente

| Variavel                   | Obrigatoria    | Descricao                              |
| -------------------------- | -------------- | -------------------------------------- |
| `UPSTASH_REDIS_REST_URL`   | Para analytics | URL REST do banco Upstash Redis        |
| `UPSTASH_REDIS_REST_TOKEN` | Para analytics | Token de autenticacao do Upstash Redis |

> Sem essas variaveis, o sistema funciona normalmente — os endpoints retornam `{ ok: true }` ou zeros, e a UI simplesmente nao exibe os badges/secao de metricas.

### Configurando o Upstash Redis

1. Crie uma conta gratuita em [upstash.com](https://upstash.com)
2. Crie um banco Redis (regiao mais proxima do deploy)
3. Copie a REST URL e o REST Token
4. Adicione no `.env.local`:

```env
UPSTASH_REDIS_REST_URL="https://seu-banco.upstash.io"
UPSTASH_REDIS_REST_TOKEN="seu-token-aqui"
```

---

## Adicionando novas paginas ao mapa de nomes

Quando criar uma nova pagina na plataforma, adicione o path e nome traduzido em:

```
messages/pt-BR/contributePage.json → platformStats.pageNames
messages/en/contributePage.json    → platformStats.pageNames
messages/es/contributePage.json    → platformStats.pageNames
messages/de/contributePage.json    → platformStats.pageNames
```

Formato:

```json
{
  "pageNames": {
    "/nova-pagina": "Nome da Pagina"
  }
}
```

Se o path nao tiver traducao, o componente exibe o path como fallback.

---

## Links uteis

- [Upstash Redis Docs](https://upstash.com/docs/redis/overall/getstarted)
- [HyperLogLog explicado](https://redis.io/docs/data-types/hyperloglogs/)
- [Sorted Sets](https://redis.io/docs/data-types/sorted-sets/)
- [navigator.sendBeacon](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon)
- [@upstash/redis SDK](https://github.com/upstash/redis-js)
