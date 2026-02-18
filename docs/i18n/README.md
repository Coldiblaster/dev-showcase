# Internacionalizacao (i18n) — Visao Geral

> **Comece aqui:** [INDEX.md](./INDEX.md) — Hub de navegacao rapida

Sistema de traducao usando **next-intl v4+** com 4 idiomas ativos.

| Locale | Idioma         | Flag | Padrao |
| ------ | -------------- | ---- | ------ |
| pt-BR  | Portugues (BR) | 🇧🇷   | Sim    |
| en     | English (US)   | 🇺🇸   | -      |
| es     | Espanol (ES)   | 🇪🇸   | -      |
| de     | Deutsch (DE)   | 🇩🇪   | -      |

---

## Documentacao

| Documento                                              | Descricao                              | Tempo  |
| ------------------------------------------------------ | -------------------------------------- | ------ |
| **[INDEX.md](./INDEX.md)**                             | Hub central — comece aqui              | 1 min  |
| **README.md** (este)                                   | Visao geral do sistema                 | 5 min  |
| **[QUICK_START.md](./QUICK_START.md)**                 | Guia pratico de uso                    | 5 min  |
| **[ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md)** | Como adicionar traducoes (com tipagem) | 10 min |
| **[SCRIPTS.md](./SCRIPTS.md)**                         | Referencia dos scripts                 | 10 min |
| **[BEST_PRACTICES.md](./BEST_PRACTICES.md)**           | Convencoes e padroes                   | 15 min |
| **[TESTING.md](./TESTING.md)**                         | Testes com i18n                        | 5 min  |

---

## Estrutura de arquivos

```
messages/
├── pt-BR/                      # Fonte de verdade (edite aqui!)
│   ├── index.ts                # Barrel export de todos os namespaces
│   ├── global.json             # Textos compartilhados
│   ├── nav.json                # Navbar e menu
│   ├── hero.json               # Hero section da home
│   ├── about.json              # Secao sobre
│   ├── contact.json            # Formulario de contato
│   ├── projects.json           # Projetos
│   ├── experience.json         # Experiencia
│   ├── footer.json             # Rodape
│   ├── search.json             # Global search
│   ├── notFound.json           # Pagina 404
│   ├── chat.json               # Widget de chat IA
│   ├── terminal.json           # Terminal easter egg
│   ├── viewSource.json         # Componente ViewSource
│   ├── tipsPage.json           # Pagina AI Tips
│   ├── tailwindTipsPage.json   # Pagina Tailwind Tips
│   ├── reactQueryTipsPage.json # Pagina React Query Tips
│   ├── securityPage.json       # Pagina Security Tips
│   ├── devResourcesPage.json   # Pagina Dev Resources
│   ├── i18nPage.json           # Pagina i18n Showcase
│   ├── seoPage.json            # Pagina SEO Showcase
│   ├── aiChatbotPage.json      # Pagina AI Chatbot Showcase
│   ├── codeReviewPage.json     # Pagina Code Review
│   ├── regexPage.json          # Pagina Regex Playground
│   ├── githubStats.json        # GitHub stats da home
│   ├── reactPatterns.json      # React Patterns
│   ├── tsPatterns.json         # TypeScript Patterns
│   ├── gitWorkflow.json        # Git Workflow
│   └── ...                     # Outros namespaces
├── en/                         # Ingles (gerado automaticamente)
├── es/                         # Espanhol (gerado automaticamente)
└── de/                         # Alemao (gerado automaticamente)

src/lib/i18n/
├── request.ts                  # Resolver locale (cookie)
├── load-messages.ts            # Carregar mensagens
└── types.d.ts                  # TypeScript (autocomplete completo)
```

Cada locale tem os mesmos 37 arquivos JSON e um `index.ts` barrel.

---

## Uso basico

### Client Components

```tsx
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations("contact");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
```

### Server Components

```tsx
import { getTranslations } from "next-intl/server";

export default async function MyPage() {
  const t = await getTranslations("nav");

  return <h1>{t("implementations")}</h1>;
}
```

### Variaveis

```tsx
// JSON: "greeting": "Ola {name}!"
t("greeting", { name: "Vinicius" });
```

### Arrays (t.raw)

Quando o JSON tem arrays, use `t.raw()` para obter o array tipado:

```tsx
import type securityPage from "@/../messages/pt-BR/securityPage.json";

type Item = (typeof securityPage)["overview"]["items"][number];

const items = t.raw("overview.items") as Item[];
```

### Multiplos namespaces

```tsx
const tNav = useTranslations("nav");
const tGlobal = useTranslations("global");

<h1>{tNav("implementations")}</h1>
<button>{tGlobal("actions.back")}</button>
```

---

## Adicionar traducoes

### Em arquivo existente (sem tipagem)

1. Edite `messages/pt-BR/{arquivo}.json`
2. Rode `pnpm translate`
3. Use no codigo com `t("novaChave")`

### Criar novo namespace (com tipagem)

1. Crie `messages/pt-BR/meuNamespace.json`
2. Registre em `messages/pt-BR/index.ts` (import + export)
3. Registre em `src/lib/i18n/types.d.ts` (import type + Messages)
4. Repita o import/export em `messages/{en,es,de}/index.ts`
5. Rode `pnpm translate`

> Guia completo: [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md)

---

## Scripts

```bash
pnpm translate          # Traduz novas chaves para en/es/de
pnpm translate:force    # Re-traduz TUDO (sobrescreve)
pnpm validate:i18n      # Valida se todos os locales estao sincronizados
pnpm check:pt-leaks     # Detecta portugues nos outros idiomas
pnpm add-locale -- fr   # Cria estrutura para novo idioma
```

> Referencia completa: [SCRIPTS.md](./SCRIPTS.md)

---

## Type Safety

O projeto tem autocomplete completo via TypeScript. Ao digitar `t("`, voce ve:

- Namespaces disponiveis
- Chaves validas dentro do namespace
- Parametros obrigatorios (ex: `{name}`)

Se o autocomplete nao funcionar:

1. `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
2. Se persistir: `Ctrl+Shift+P` → "Developer: Reload Window"

---

## Formato das mensagens

```json
{
  "simples": "Texto direto",
  "comVariavel": "Ola {name}!",
  "aninhado": {
    "titulo": "Meu titulo",
    "descricao": "Minha descricao"
  },
  "plural": "{count, plural, =0 {nenhum item} =1 {1 item} other {# itens}}",
  "array": [
    { "title": "Item 1", "description": "Desc 1" },
    { "title": "Item 2", "description": "Desc 2" }
  ]
}
```

---

## Troubleshooting

### Traducao nao aparece

1. Verifique se o namespace esta correto: `useTranslations("nav")`
2. Confirme se a chave existe em `messages/pt-BR/`
3. Rode `pnpm validate:i18n`

### Autocomplete nao funciona

1. Reinicie TypeScript Server: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
2. Verifique se `src/lib/i18n/types.d.ts` esta atualizado
3. Se persistir, recarregue o VS Code

### Traducao automatica falhou

1. Verifique as variaveis de ambiente (DEEPL_API_KEY ou GOOGLE_CLOUD_API_KEY) no `.env.local`
2. Verifique se nao excedeu a quota da API
3. Use `pnpm translate:force` para forcar re-traducao

### Portugues vazando para en/es/de

1. Rode `pnpm check:pt-leaks` para detectar
2. Rode `pnpm translate:force` para corrigir
3. Valide novamente com `pnpm check:pt-leaks`

### Erro: Cannot find module '../../messages/pt-BR/...'

1. Verifique se salvou todos os arquivos
2. Confirme se registrou o namespace no `index.ts` e `types.d.ts`
3. Reinicie o TypeScript Server

---

## Regras de ouro

1. **pt-BR e fonte de verdade** — sempre edite pt-BR primeiro
2. **en/es/de sao gerados** — nunca edite manualmente
3. **Rode `translate` antes de commitar** — sincroniza tudo
4. **Textos em codigo = proibido** — use sempre `t()`
5. **Namespaces descritivos** — `securityPage`, nao `page1`

---

## Recursos

- **Tipos com autocomplete:** `src/lib/i18n/types.d.ts`
- **Scripts:** `scripts/translate.ts`, `scripts/validate-i18n.ts`, `scripts/check-pt-leaks.ts`
- **next-intl docs:** [next-intl.dev](https://next-intl.dev)
- **ICU Message Format:** [unicode.org/icu](https://unicode-org.github.io/icu/userguide/format_parse/messages/)
