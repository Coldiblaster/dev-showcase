<div align="center">

# VB — Dev Showcase

**Portfolio profissional + plataforma de conteudo para desenvolvedores**

[Acessar ao vivo](https://viniciusbastazin.vercel.app) · [Documentacao](./docs/README.md) · [Reportar Bug](https://github.com/Coldiblaster/dev-showcase/issues)

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-black?style=flat-square&logo=vercel)

</div>

---

## Sobre

Mais do que um portfolio, o **Dev Showcase** e uma plataforma open source que combina:

- **Portfolio profissional** — experiencia, projetos e contato
- **Implementacoes reais** — showcases tecnicos rodando em producao (i18n, SEO)
- **Guias para devs** — dicas praticas de IA, Tailwind, React Query e recursos do dia a dia
- **Internacionalizacao completa** — 4 idiomas com traducao automatizada
- **SEO de producao** — OG images dinamicas, JSON-LD, sitemap, robots

O objetivo e alcancar desenvolvedores, recrutadores e empresas, servindo tanto como vitrine profissional quanto como referencia tecnica para a comunidade.

> **Documentacao completa** — arquitetura, convencoes, guias de contribuicao e fluxos internos estao centralizados em [`docs/`](./docs/README.md).

---

## Tech Stack

| Camada | Tecnologias |
|--------|------------|
| **Framework** | Next.js 16 (App Router) |
| **UI** | React 19, Tailwind CSS 4, shadcn/ui (Radix UI) |
| **Animacoes** | Framer Motion |
| **i18n** | next-intl (pt-BR, en, es, de) |
| **SEO** | Metadata API, Open Graph, JSON-LD, Sitemap dinamico |
| **Formularios** | React Hook Form + Zod |
| **Busca** | Fuse.js (busca global fuzzy) |
| **Testes** | Vitest + Testing Library |
| **Traducao automatica** | DeepL / Google Translate (scripts) |
| **Deploy** | Vercel + Speed Insights |

---

## Estrutura do Projeto

```
src/
├── app/                        # Rotas (App Router)
│   ├── dicas/[slug]/           # Guias dinamicos
│   ├── implementacoes/[slug]/  # Implementacoes dinamicas
│   ├── icon.tsx                # Favicon dinamico (VB)
│   ├── opengraph-image.tsx     # OG image 1200x630
│   ├── sitemap.ts              # Sitemap automatico
│   └── robots.ts               # Regras de crawling
├── components/
│   ├── navbar/                 # Navbar modular (9 componentes)
│   ├── ui/                     # Primitivos shadcn/ui
│   └── ...                     # Componentes reutilizaveis
├── features/
│   ├── home/                   # Hero, About, Projects, Experience, Contact
│   ├── implementations/        # i18n Showcase, SEO Showcase
│   └── guides/                 # AI Tips, Tailwind, React Query, Dev Resources
├── data/                       # Registro de conteudo e dados estaticos
├── hooks/                      # Hooks customizados
└── lib/
    ├── i18n/                   # Configuracao de internacionalizacao
    ├── global-search/          # Motor de busca global
    ├── seo.ts                  # Helpers de SEO
    └── animation-variants.ts   # Variantes Framer Motion

messages/                       # Traducoes por idioma
├── pt-BR/                      # Portugues (padrao)
├── en/                         # English
├── es/                         # Espanol
└── de/                         # Deutsch

scripts/                        # Automacao de i18n
docs/                           # Documentacao tecnica
```

> Veja a [documentacao completa](./docs/README.md) para detalhes da arquitetura, convencoes e diagramas.

---

## Conteudo

### Portfolio
Hero | Sobre | Projetos | Experiencia | Contato

### Implementacoes
| Rota | Descricao |
|------|-----------|
| `/implementacoes/i18n` | Showcase de internacionalizacao com next-intl |
| `/implementacoes/seo` | SEO completo — Next.js vs React + Vite |

### Guias & Dicas
| Rota | Descricao |
|------|-----------|
| `/dicas/ai-tips` | Prompts e workflows com IA para devs |
| `/dicas/tailwind-tips` | Dicas de Tailwind CSS + shadcn/ui |
| `/dicas/react-query-tips` | Patterns essenciais de React Query |
| `/dicas/dev-resources` | Snippets e recursos por nivel (Jr/Pleno/Sr) |

---

## Comecando

```bash
git clone https://github.com/Coldiblaster/dev-showcase.git
cd dev-showcase
pnpm install
pnpm dev
```

### Build

```bash
pnpm build
pnpm start
```

### Testes

```bash
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
3. Configure variaveis de ambiente (se usar traducao automatica):
   - `DEEPL_API_KEY` — para traducao via DeepL

---

## Contribuindo

Contribuicoes sao bem-vindas! Veja a [documentacao](./docs/README.md) para entender a arquitetura antes de comecar.

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
