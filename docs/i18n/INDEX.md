# Internacionalizacao (i18n) — Comece Aqui

**3 perguntas. 3 segundos. 1 resposta.**

---

## Qual e o seu nivel?

### Junior — Primeira vez aqui

→ Leia [QUICK_START.md](./QUICK_START.md) (5 min)
→ Copie um exemplo e adapte

### Pleno — Ja usou antes

→ Precisa adicionar traducao? [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md) (5 min)
→ Esqueceu a sintaxe? [QUICK_START.md](./QUICK_START.md#-cheat-sheet) (1 min)

### Senior — Conhece o sistema

→ Quer ver scripts? [SCRIPTS.md](./SCRIPTS.md) (10 min)
→ Boas praticas? [BEST_PRACTICES.md](./BEST_PRACTICES.md) (15 min)
→ Visao geral? [README.md](./README.md) (5 min)

---

## O que voce precisa fazer?

| Tarefa                               | Documento                                                                                           | Tempo |
| ------------------------------------ | --------------------------------------------------------------------------------------------------- | ----- |
| Usar traducao existente              | [QUICK_START.md](./QUICK_START.md#-uso-basico)                                                      | 2 min |
| Adicionar novas chaves (sem tipagem) | [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md#-cenario-1-adicionar-chaves-em-arquivo-existente) | 2 min |
| Criar novo namespace                 | [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md#-cenario-2-criar-novo-namespace)                  | 5 min |
| Adicionar novo idioma                | [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md#-cenario-4-adicionar-novo-idioma)                 | 5 min |
| Rodar scripts de traducao            | [SCRIPTS.md](./SCRIPTS.md)                                                                          | 3 min |
| Testar componentes com i18n          | [TESTING.md](./TESTING.md)                                                                          | 5 min |
| Resolver erro de traducao            | [Problemas Comuns](#-problemas-comuns-solucao-rapida)                                               | 2 min |

---

## Problemas Comuns (Solucao Rapida)

```tsx
// ERRO: Traducao nao aparece
const t = useTranslations("contact");
t("titlle"); // typo: "titlle" em vez de "title"

// CORRETO: Autocomplete ajuda a evitar typos
const t = useTranslations("contact");
t("title"); // TypeScript avisa se errar
```

```tsx
// ERRO: Namespace errado
const t = useTranslations("hero");
t("sectionTitle"); // Essa chave esta em "about", nao em "hero"

// CORRETO: Use o namespace certo
const tAbout = useTranslations("about");
tAbout("sectionTitle");
```

```bash
# ERRO: Portugues aparecendo em ingles
# messages/en/hero.json: "badge": "Portfolio"  ← OK
# messages/en/hero.json: "descricao": "..."    ← Portugues vazou!

# SOLUCAO: Re-traduza e valide
pnpm translate:force
pnpm check:pt-leaks
```

```tsx
// ERRO: Autocomplete nao funciona
// Causa: TypeScript nao atualizou

// SOLUCAO: Reinicie TS Server
// Ctrl+Shift+P -> "TypeScript: Restart TS Server"
// Se nao resolver: Ctrl+Shift+P -> "Developer: Reload Window"
```

```bash
# ERRO: Cannot find module '../../messages/pt-BR/...'
# Causa: Namespace novo nao registrado

# SOLUCAO:
# 1. Registre em messages/pt-BR/index.ts
# 2. Registre em src/lib/i18n/types.d.ts
# 3. Reinicie TS Server
```

---

## Documentacao Completa

1. **[README.md](./README.md)** — Visao geral do sistema e estrutura
2. **[QUICK_START.md](./QUICK_START.md)** — Guia pratico de uso (5 min)
3. **[ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md)** — Como adicionar traducoes (com tipagem)
4. **[SCRIPTS.md](./SCRIPTS.md)** — Referencia dos scripts (translate, validate, etc.)
5. **[BEST_PRACTICES.md](./BEST_PRACTICES.md)** — Convencoes e padroes do projeto
6. **[TESTING.md](./TESTING.md)** — Testes com i18n

---

## Regras de Ouro

1. **pt-BR e fonte de verdade** → SEMPRE edite pt-BR primeiro
2. **en/es/de sao gerados** → NUNCA edite manualmente
3. **Rode `translate` antes de commitar** → Sincroniza tudo
4. **Textos em codigo = proibido** → Use sempre `t()`
5. **Namespaces descritivos** → `securityPage`, `contact`, nao `page1`

---

## Quick Start (30 segundos)

```tsx
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations("hero");
  const tNav = useTranslations("nav");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <a>{tNav("sectionTips")}</a>
    </div>
  );
}
// TypeScript autocompleta tudo!
```

---

## Idiomas Suportados

| Locale | Nome           | Status | Padrao |
| ------ | -------------- | ------ | ------ |
| pt-BR  | Portugues (BR) | Ativo  | Sim    |
| en     | English (US)   | Ativo  | -      |
| es     | Espanol (ES)   | Ativo  | -      |
| de     | Deutsch (DE)   | Ativo  | -      |

Como adicionar mais idiomas? → [ADDING_TRANSLATIONS.md - Cenario 4](./ADDING_TRANSLATIONS.md#-cenario-4-adicionar-novo-idioma)

---

## Scripts Principais

```bash
pnpm translate          # Traduz novas chaves para en/es/de
pnpm translate:force    # Re-traduz TUDO
pnpm validate:i18n      # Valida sincronizacao
pnpm check:pt-leaks     # Detecta portugues nos outros idiomas
pnpm add-locale -- fr   # Cria estrutura para novo idioma
```

Detalhes completos → [SCRIPTS.md](./SCRIPTS.md)

---

## Estrutura

```
messages/
├── pt-BR/              # Fonte de verdade (edite aqui!)
│   ├── index.ts        # Barrel export
│   ├── hero.json       # Hero section
│   ├── nav.json        # Navbar
│   ├── contact.json    # Formulario de contato
│   ├── securityPage.json # Pagina de Security Tips
│   └── ...             # 37 namespaces no total
├── en/                 # Gerado automaticamente
├── es/                 # Gerado automaticamente
└── de/                 # Gerado automaticamente

src/lib/i18n/
├── config.ts           # Locales suportados
├── request.ts          # Resolver locale (cookie)
├── load-messages.ts    # Carregar mensagens
├── routing.ts          # Configuracao de rotas
└── types.d.ts          # TypeScript autocomplete
```

---

## Links Uteis

- **next-intl docs:** [next-intl.dev](https://next-intl.dev)
- **TypeScript:** Autocomplete completo habilitado
- **API Keys:** Configure DeepL ou Google Cloud em `.env.local`
