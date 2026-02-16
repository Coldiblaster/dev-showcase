# 🌍 Internacionalização (i18n) - Começe Aqui

**3 perguntas. 3 segundos. 1 resposta.**

---

## 👤 Qual é o seu nível?

### 🟢 Júnior - Primeira Vez Aqui

→ Leia [QUICK_START.md](./QUICK_START.md) (5 min)
→ Copie um exemplo e adapte

### 🟡 Pleno - Já Usei Antes

→ Precisa adicionar tradução? [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md) (5 min)
→ Esqueceu a sintaxe? [QUICK_START.md](./QUICK_START.md#-cheat-sheet) (1 min)

### 🔴 Sênior - Conhece o Sistema

→ Quer ver scripts? [SCRIPTS.md](./SCRIPTS.md) (10 min)
→ Boas práticas? [BEST_PRACTICES.md](./BEST_PRACTICES.md) (15 min)
→ Visão geral? [README.md](./README.md) (10 min)

---

## 🎯 O que você precisa fazer?

| Tarefa                               | Documento                                                                                           | Tempo |
| ------------------------------------ | --------------------------------------------------------------------------------------------------- | ----- |
| Usar tradução existente              | [QUICK_START.md](./QUICK_START.md#-uso-básico)                                                      | 2 min |
| Adicionar novas chaves (sem tipagem) | [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md#-cenário-1-adicionar-chaves-em-arquivo-existente) | 2 min |
| Criar novo arquivo global            | [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md#-cenário-2-criar-novo-arquivo-global)             | 5 min |
| Criar novo módulo completo           | [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md#-cenário-3-criar-novo-módulo-completo)            | 8 min |
| Adicionar novo idioma                | [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md#-cenário-4-adicionar-novo-idioma)                 | 5 min |
| Rodar scripts de tradução            | [SCRIPTS.md](./SCRIPTS.md)                                                                          | 3 min |
| Testar componentes com i18n          | [TESTING.md](./TESTING.md)                                                                          | 5 min |
| Resolver erro de tradução            | [Problemas Comuns](#-problemas-comuns-solução-rápida)                                               | 2 min |

---

## 🚨 Problemas Comuns (Solução Rápida)

```tsx
// ❌ ERRO: Tradução não aparece
const t = useTranslations("auth");
t("login.tittle"); // typo: "tittle" em vez de "title"

// ✅ CORRETO: Autocomplete ajuda
const t = useTranslations("auth");
t("login.title"); // TypeScript te avisa se errar
```

```tsx
// ❌ ERRO: Namespace errado
const t = useTranslations("admin");
t("actions.save"); // "actions" está em "global"!

// ✅ CORRETO: Use o namespace certo
const tGlobal = useTranslations("global");
tGlobal("actions.save");
```

```bash
# ❌ ERRO: Português aparecendo em inglês
# messages/en/global.json: "back": "Voltar"

# ✅ SOLUÇÃO: Re-traduza com força
pnpm run translate:force
pnpm run check:pt-leaks  # Valida se corrigiu
```

```tsx
// ❌ ERRO: Autocomplete não funciona
// Possível causa: TypeScript não atualizou

// ✅ SOLUÇÃO: Reinicie TS Server
// Ctrl+Shift+P → "TypeScript: Restart TS Server"
// Se não resolver: Reload Window
```

```bash
# ❌ ERRO: Cannot find module '../../messages/pt-BR/...'
# Possível causa: Arquivo novo não foi salvo

# ✅ SOLUÇÃO: Salve todos os arquivos
# Ctrl+K S (VS Code) e reinicie TS Server
```

---

## 📚 Documentação Completa

1. **[README.md](./README.md)** - Visão geral do sistema e estrutura
2. **[QUICK_START.md](./QUICK_START.md)** - Guia prático de uso (5 min)
3. **[ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md)** - Como adicionar traduções (com tipagem!)
4. **[SCRIPTS.md](./SCRIPTS.md)** - Referência dos scripts (translate, validate, etc.)
5. **[BEST_PRACTICES.md](./BEST_PRACTICES.md)** - Convenções e padrões do projeto

---

## 💡 Regras de Ouro (Decore Isso!)

1. **pt-BR é fonte de verdade** → SEMPRE edite pt-BR primeiro
2. **en/es são gerados** → NUNCA edite manualmente
3. **Rode `translate` antes de commitar** → Sincroniza tudo
4. **Textos em código = ❌** → Use sempre `t()`
5. **Namespaces descritivos** → `auth`, `global`, não `page1`

---

## 🏃 Quick Start (30 segundos)

```tsx
// 1. Importar
import { useTranslations } from "next-intl";

// 2. Usar no componente
export function MyComponent() {
  const t = useTranslations("global");
  const tAuth = useTranslations("auth");

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <p>{tAuth("login.version", { version: "2.0" })}</p>
      <button>{t("actions.save")}</button>
    </div>
  );
}

// 3. TypeScript autocompleta tudo! ✨
```

**Pronto!** ✅ Seu componente está internacionalizado.

---

## 🌐 Idiomas Suportados

| Locale | Nome           | Flag | Status   | Padrão |
| ------ | -------------- | ---- | -------- | ------ |
| pt-BR  | Português (BR) | 🇧🇷   | ✅ Ativo | ✅     |
| en     | English (US)   | 🇺🇸   | ✅ Ativo | -      |
| es     | Español (ES)   | 🇪🇸   | ✅ Ativo | -      |

**Como adicionar mais idiomas?** → [ADDING_TRANSLATIONS.md - Cenário 4](./ADDING_TRANSLATIONS.md#-cenário-4-adicionar-novo-idioma)

---

## 🛠️ Scripts Principais

```bash
# Traduzir novas chaves
pnpm run translate

# Re-traduzir TUDO (força)
pnpm run translate:force

# Validar sincronização
pnpm run validate:i18n

# Detectar português em en/es
pnpm run check:pt-leaks

# Adicionar novo idioma
pnpm run add-locale -- de  # alemão
```

**Detalhes completos?** → [SCRIPTS.md](./SCRIPTS.md)

---

## 📂 Estrutura Rápida

```
messages/
├── pt-BR/              # 🇧🇷 Fonte de verdade (edite aqui!)
│   ├── global.json     # Ações, status, navegação
│   ├── auth.json       # Login, logout
│   ├── admin/          # Módulo admin
│   └── cockpit/        # Módulo cockpit
├── en/                 # 🇺🇸 Gerado automaticamente
└── es/                 # 🇪🇸 Gerado automaticamente
```

---

## 🔗 Links Úteis

- **Biblioteca oficial:** [next-intl.dev](https://next-intl.dev)
- **TypeScript:** Autocomplete completo habilitado ✅
- **API Keys:** Configure DeepL ou Google Cloud em `.env.local`

---

**Última atualização:** Janeiro 2026
**Tecnologia:** next-intl v4+
