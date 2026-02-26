# SEO e Lighthouse — Checklist e debug

O score de SEO do Lighthouse (ex.: no widget de performance ou na página `/performance`) pode variar por **URL analisada**, **cache (24h)** e **atualizações dos critérios do Google**. Este doc resume o que a plataforma já faz e como descobrir o que está derrubando o score.

## O que a plataforma já faz

- **Layout (root):** `generateMetadata` com title (default + template), description, authors, robots (index, follow), canonical, openGraph, twitter, keywords, verification Google.
- **Páginas:** `buildPageMetadata()` em todas as páginas principais (dicas, implementacoes, ferramentas, performance, stats, contribua, novidades, privacidade, etc.) com title, description, robots, canonical, OG e Twitter.
- **Viewport:** `viewport` no layout (width, initialScale, themeColor).
- **Idioma:** `<html lang={locale}>` no layout.
- **robots.txt:** allow `/`, sitemap em `/sitemap.xml`.
- **Sitemap:** páginas estáticas e dinâmicas (conteúdo) em `src/app/sitemap.ts`.
- **JSON-LD:** Person, WebSite, ProfilePage, BreadcrumbList em `src/components/json-ld.tsx`.
- **Conteúdo dinâmico:** `generateMetadataForSlug` em `lib/content/dynamic-page.tsx` para todas as páginas de dicas/implementacoes/ferramentas.

## Por que o score pode cair (ex.: de 100% para ~58%)

1. **URL analisada** — O widget usa a URL da página atual (`pathname`). Se você estava em uma rota que não tem metadata própria ou que retorna erro, o Lighthouse pode dar nota baixa para essa URL.
2. **Cache do Lighthouse** — A API usa cache de 24h. Use `?refresh=1` na chamada (ou “Recarregar” no widget) para forçar nova análise.
3. **Audits que costumam derrubar SEO:**
   - **document-title** / **meta-description** — ausentes ou vazios na URL analisada.
   - **canonical** — URL canônica incorreta ou conflitante.
   - **hreflang** — inválido ou ausente em sites multilíngue (nosso locale é por cookie; não usamos paths por idioma, então hreflang não é aplicado).
   - **tap-targets** — alvos de toque pequenos (Lighthouse pode reclamar em mobile). Reduzir botões demais pode impactar.
   - **image-alt** — imagens sem `alt`.
   - **link-text** — links com texto não descritivo (“clique aqui”, etc.).
   - **Structured data** — JSON-LD com campo obrigatório faltando ou inválido.

## Como debugar

1. **Ver a URL exata analisada**  
   O widget chama `/api/lighthouse?path=<pathname>&strategy=desktop|mobile`. A URL final é `PERSONAL.siteUrl + path`. Confira em `lib/constants` (ou `.env`) o `siteUrl` e qual `path` foi enviado (ex.: `/`, `/dicas`, `/performance`).

2. **Rodar o Lighthouse na mesma URL**
   - Abra o site em produção (ou preview) na **mesma URL** que o widget usou.
   - DevTools → Aba **Lighthouse** → categoria **SEO** → Analyze.
   - Veja quais audits falharam (vermelho) e ajuste a página ou o metadata conforme a sugestão.

3. **Forçar nova análise**  
   Na página de performance ou no widget, use “Recarregar métricas” (ou `?refresh=1` na API) para invalidar o cache e rodar de novo.

4. **Conferir páginas novas**  
   Toda página acessível que pode ser a “página atual” ao abrir o widget deve ter `generateMetadata` com `buildPageMetadata` (title, description, path, locale). Se criou rota nova, confira em `src/app/**/page.tsx`.

## Checklist rápido (novas páginas)

- [ ] `generateMetadata` exportado em `page.tsx`.
- [ ] Uso de `buildPageMetadata({ title, description, path, locale })` (ou equivalente com title/description/canonical).
- [ ] Descrição com tamanho razoável (ex.: 50–160 caracteres).
- [ ] Imagens com `alt` descritivo.
- [ ] Links com texto descritivo (evitar “clique aqui”).
- [ ] Página listada no sitemap se for indexável (`src/app/sitemap.ts`).

## Referências

- [Lighthouse SEO audits (Chrome)](https://developer.chrome.com/docs/lighthouse/seo/)
- [Next.js Metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- `src/lib/seo.ts` — `buildPageMetadata`
- `src/app/api/lighthouse/route.ts` — como a URL é montada e cacheada
