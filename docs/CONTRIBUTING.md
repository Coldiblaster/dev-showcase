# Guia de Contribuicao

Obrigado pelo interesse em contribuir com o **Dev Showcase**! Este guia explica o fluxo de trabalho, convencoes e boas praticas.

---

## Indice

1. [Configuracao do ambiente](#configuracao-do-ambiente)
2. [Fluxo de trabalho](#fluxo-de-trabalho)
3. [Convencoes de codigo](#convencoes-de-codigo)
4. [Convencoes de commit](#convencoes-de-commit)
5. [Estrutura do projeto](#estrutura-do-projeto)
6. [Checklist antes do PR](#checklist-antes-do-pr)

---

> **Prefere aprender de forma interativa?** Acesse o **Tutorial em `/contribua/tutorial`** — ele cobre todo este fluxo passo a passo com exemplos de codigo, FAQs e duas trilhas: "criar feature nova" e "melhorar existente".

## Configuracao do ambiente

### Pre-requisitos

- Node.js 18+
- pnpm (recomendado)
- Git

### Setup

```bash
# 1. Fork e clone
git clone https://github.com/SEU_USUARIO/dev-showcase.git
cd dev-showcase

# 2. Configure variaveis de ambiente
cp .env.example .env.local
# Preencha as variaveis necessarias (veja .env.example para detalhes)

# 3. Instale dependencias
pnpm install

# 4. Rode o dev server
pnpm dev
```

### Comandos uteis

```bash
pnpm dev              # Dev server
pnpm build            # Build de producao
pnpm lint             # Linting
pnpm test             # Testes
pnpm translate        # Traduz chaves i18n novas
pnpm validate:i18n    # Valida sincronizacao de traducoes
pnpm check:pt-leaks   # Detecta portugues em outros idiomas
```

---

## Fluxo de trabalho

### 1. Crie uma branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/minha-feature
```

**Nomenclatura de branches:**

- `feature/nome` — nova funcionalidade
- `fix/nome` — correcao de bug
- `docs/nome` — documentacao
- `refactor/nome` — refatoracao

### 2. Desenvolva

- Siga as [convencoes de codigo](#convencoes-de-codigo)
- Adicione JSDoc em portugues nos componentes novos
- Use `useTranslations()` para todo texto visivel ao usuario
- Rode `pnpm lint` para validar

### 3. Internacionalizacao

Se adicionou textos novos:

```bash
# Edite pt-BR primeiro (fonte de verdade)
# messages/pt-BR/seu-namespace.json

# Gere traducoes
pnpm translate

# Valide
pnpm validate:i18n
pnpm check:pt-leaks
```

> Guia completo: [docs/i18n/INDEX.md](./i18n/INDEX.md)

### 4. Teste

```bash
pnpm test         # Roda os testes
pnpm build        # Garanta que o build passa
```

### 5. Commit

Siga [Conventional Commits](#convencoes-de-commit):

```bash
git add .
git commit -m "feat: adiciona secao de skills na pagina sobre"
```

### 6. Abra o PR

```bash
git push origin feature/minha-feature
```

Abra o PR **apontando para `develop`** (nunca direto para `main`):

- Titulo descritivo seguindo Conventional Commits (ex: `feat: adiciona secao de skills`)
- Descricao do que foi feito e por que
- Screenshot/GIF se for mudanca visual

O merge requer pelo menos 1 approval. Quando a CI estiver ativa, os checks (lint, typecheck, test, build) tambem rodam automaticamente no PR.

> **Nota:** A CI (GitHub Actions) esta temporariamente desabilitada. A validacao local continua ativa via Husky (lint-staged + commitlint).

### 7. Deploy (develop → main)

Apos o merge na `develop`, um PR de release para `main` e criado automaticamente pela CI. Basta revisar e aprovar quando quiser fazer deploy.

```
feature/* → PR → develop → auto-PR → main → Vercel deploy
```

> Detalhes: [BRANCH_PROTECTION.md](./BRANCH_PROTECTION.md)

---

## Convencoes de codigo

### Qualidade e arquitetura

- **Codigo limpo** — funcoes e componentes concisos, nada extenso demais
- **Nomenclatura clara** — nomes autoexplicativos, facil entendimento
- **JSDoc em tudo** — componentes, funcoes, hooks e tipos; descricao em portugues
- **Padrao profissional** — SOLID, DRY, arquivos pequenos e coesos

### Componentes

| Regra                           | Exemplo                                            |
| ------------------------------- | -------------------------------------------------- |
| Nomes em PascalCase             | `ScoreGauge`, `StepCard`                           |
| Um componente por arquivo       | `score-gauge.tsx`                                  |
| Arquivos e pastas em kebab-case | `meu-componente.tsx`, `meu-guia/` — nao PascalCase |
| JSDoc em portugues              | `/** Medidor circular de pontuacao. */`            |
| Props com interface             | `interface ScoreGaugeProps { ... }`                |

### Estrutura de features

Features complexas ficam em subpastas:

```
src/features/implementations/code-review/
├── index.tsx          # Composicao principal (barrel)
├── code-editor.tsx    # Sub-componente
├── review-results.tsx # Sub-componente
├── how-it-works.tsx   # Sub-componente
├── constants.ts       # Constantes e config
└── types.ts           # Tipos TypeScript
```

### Reutilizacao

- Verifique o [catalogo de componentes](./architecture/COMPONENTS.md) antes de criar algo novo
- Componentes reutilizaveis vao em `src/components/`
- Componentes especificos de feature ficam na pasta da feature
- Constantes, tipos e helpers separados em arquivos proprios

### Estilo

- Tailwind CSS 4 para estilizacao (nunca CSS inline ou arquivos .css)
- Framer Motion para animacoes (variants em `lib/animation-variants.ts`)
- shadcn/ui para primitivos de UI
- Responsividade obrigatoria (mobile-first)

### Seguranca (API Routes)

- Use o modulo `lib/api-security.ts` para todas as novas rotas
- Siga o [checklist de seguranca](./api/SECURITY.md#checklist-de-seguranca-para-novas-rotas)

---

## Convencoes de commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>: <descricao curta>

[corpo opcional]
```

### Tipos

| Tipo       | Quando usar                         | Exemplo                                    |
| ---------- | ----------------------------------- | ------------------------------------------ |
| `feat`     | Nova funcionalidade                 | `feat: adiciona revisor de codigo com IA`  |
| `fix`      | Correcao de bug                     | `fix: corrige tradução do placeholder`     |
| `docs`     | Documentacao                        | `docs: atualiza README com novas features` |
| `refactor` | Refatoracao (sem mudanca funcional) | `refactor: extrai hook useGitHubStats`     |
| `style`    | Formatacao, espacos                 | `style: formata imports com prettier`      |
| `test`     | Testes                              | `test: adiciona testes para rate-limit`    |
| `chore`    | Build, config, deps                 | `chore: atualiza next.js para 16.1`        |
| `perf`     | Performance                         | `perf: memoiza componente de stats`        |

### Regras

- Descricao em portugues ou ingles (consistente no PR)
- Primeira letra minuscula
- Sem ponto final
- Imperativo: "adiciona" nao "adicionado"

---

## Estrutura do projeto

```
src/
├── app/          # Rotas e API routes (App Router)
├── components/   # Componentes reutilizaveis
├── features/     # Features por dominio (home, implementations, guides)
├── data/         # Registro de conteudo e dados
├── hooks/        # Hooks customizados
└── lib/          # Infraestrutura (i18n, seguranca, SEO, email)

messages/         # Traducoes (pt-BR = fonte de verdade)
scripts/          # Automacao (traducao, validacao)
docs/             # Documentacao tecnica
```

> Detalhes: [docs/README.md](./README.md)

---

## Checklist antes do PR

### Geral

- [ ] `pnpm lint` passa sem erros
- [ ] `pnpm build` passa sem erros
- [ ] `pnpm test` passa sem falhas
- [ ] Responsivo (testei em mobile)
- [ ] Acessibilidade: navegacao por Tab funciona, foco visivel, `aria-label` em botoes de icone
- [ ] Dialogs/modals usam `role="dialog"`, `aria-modal` e focus trap

### Se adicionou textos

- [ ] Textos em `messages/pt-BR/` (nunca hardcoded)
- [ ] `pnpm translate` executado
- [ ] `pnpm validate:i18n` sem erros
- [ ] `pnpm check:pt-leaks` sem problemas

### Se criou componentes

- [ ] JSDoc em portugues (componentes, funcoes, hooks, tipos)
- [ ] Props tipadas com interface
- [ ] Codigo limpo, nomenclatura clara, nada extenso demais
- [ ] Verificou [catalogo existente](./architecture/COMPONENTS.md)
- [ ] Componente reutilizavel em `src/components/`, especifico na feature

### Se adicionou API route

- [ ] Usa `lib/api-security.ts`
- [ ] Rate limiting configurado
- [ ] Input validado com Zod
- [ ] [Checklist de seguranca](./api/SECURITY.md#checklist-de-seguranca-para-novas-rotas) completo

### Se adicionou pagina

- [ ] Registrada em `data/content.ts` (category: `"guide"`, `"implementation"` ou `"tool"`)
- [ ] Mapeada em `lib/content/component-map.ts` (COMPONENT_MAP)
- [ ] Icone adicionado em `src/app/<categoria>/page.tsx` (iconMap)
- [ ] Adicionada ao menu em `navbar/nav-data.ts` (+ `nav.json` com traducoes do item)
- [ ] Adicionada a busca em `global-search/search-data.ts` (tagMap) + `messages/pt-BR/search.json` (items.[slug])
- [ ] Adicionada ao chatbot em `lib/chat/system-prompt.ts` (secao PAGINAS)
- [ ] `loading.tsx` criado com `PageSkeleton` (variant: `guide`, `implementation` ou `tool`)
- [ ] Traducoes criadas e `pnpm translate` executado

---

## Duvidas?

- **Tutorial interativo:** `/contribua/tutorial` — fluxo completo com FAQs
- Consulte a [documentacao](./README.md)
- Abra uma [issue](https://github.com/Coldiblaster/dev-showcase/issues)
- Veja as paginas existentes como referencia (ex: `src/features/guides/react-patterns/`)
