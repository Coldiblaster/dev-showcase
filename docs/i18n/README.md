# 📖 Internacionalização (i18n) - Visão Geral

> **🚀 Comece aqui:** [INDEX.md](./INDEX.md) - Hub de navegação rápida

Sistema de tradução usando **next-intl v4+** com suporte a múltiplos idiomas.

> **✅ Idiomas ativos:** Português (pt-BR), Inglês (en), Espanhol (es)

---

## 📚 Documentação

| Documento                                              | Descrição                               | Para quem    | Tempo  |
| ------------------------------------------------------ | --------------------------------------- | ------------ | ------ |
| **[INDEX.md](./INDEX.md)**                             | 🎯 Hub central - **COMECE AQUI**        | Todos        | 1 min  |
| **README.md**                                          | Visão geral do sistema (você está aqui) | Todos        | 10 min |
| **[QUICK_START.md](./QUICK_START.md)**                 | Guia prático de uso                     | Júnior/Pleno | 5 min  |
| **[ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md)** | Como adicionar traduções (com tipagem)  | Pleno/Sênior | 10 min |
| **[SCRIPTS.md](./SCRIPTS.md)**                         | Referência completa dos scripts         | Sênior       | 10 min |
| **[BEST_PRACTICES.md](./BEST_PRACTICES.md)**           | Convenções e padrões                    | Todos        | 15 min |

---

## 🎯 Quick Links

- **Primeira vez?** → [QUICK_START.md](./QUICK_START.md)
- **Adicionar tradução?** → [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md)
- **Problema com script?** → [SCRIPTS.md](./SCRIPTS.md)
- **Dúvida de padrão?** → [BEST_PRACTICES.md](./BEST_PRACTICES.md)

---

## 📁 Estrutura

```
messages/
├── pt-BR/          # Português (fonte de verdade)
│   ├── index.ts    # Export de todos os namespaces
│   ├── auth.json   # Autenticação (login, logout, validações)
│   ├── global.json # Ações, status, navegação global
│   ├── components.json # Componentes UI (header, sidebar, table, modal)
│   ├── errors.json # Páginas de erro (404, 500, unauthorized)
│   ├── welcome.json # Página bem-vindo
│   ├── admin/      # Módulo Admin
│   │   ├── index.ts
│   │   └── user-management.json
│   ├── consultor/  # Módulo Consultor
│   │   ├── index.ts
│   │   └── business-unit.json
│   └── cockpit/    # Módulo Cockpit
│       ├── index.ts
│       └── dashboard.json
├── en/             # Inglês (gerado automaticamente)
└── es/             # Espanhol (gerado automaticamente)

src/i18n/
├── config.ts       # Locales suportados
├── routing.ts      # Config do next-intl
├── request.ts      # Resolver locale (cookie)
├── load-messages.ts # Carregar JSONs dinamicamente
└── types.d.ts      # TypeScript (autocomplete completo)
```

### 🎯 Organização dos Namespaces

**Arquivos globais** (raiz de messages/pt-BR/):

- `auth.json` - Login, logout, validações de autenticação
- `global.json` - Ações comuns (salvar, cancelar), status, navegação
- `components.json` - Componentes UI compartilhados (header, table, modal)
- `errors.json` - Mensagens de erro e páginas especiais (404, 500)
- `welcome.json` - Página de boas-vindas

**Módulos** (pastas organizadas por perfil/funcionalidade):

- `admin/` - Gestão de usuários, permissões, configurações
- `consultor/` - Unidades de negócio, plantas, análises
- `cockpit/` - Dashboards, visualizações, métricas
- `auditor/` - Funcionalidades de auditoria
- `governance/` - Governança corporativa
- etc.

## 🚀 Uso Básico

### Em Componentes

```tsx
import { useTranslations } from "next-intl";

export function LoginPage() {
  const t = useTranslations("auth");

  return (
    <div>
      <h1>{t("login.title")}</h1>
      <p>{t("login.version", { version: "1.0" })}</p>
    </div>
  );
}
```

### Usando Namespaces Modulares

```tsx
// Componente do módulo Admin
import { useTranslations } from "next-intl";

export function UserManagementPage() {
  const t = useTranslations("admin.userManagement");
  const tGlobal = useTranslations("global");

  return (
    <div>
      <h1>{t("title")}</h1>
      <button>{tGlobal("actions.add")}</button>
    </div>
  );
}
```

### Combinando Múltiplos Namespaces

```tsx
export function MyForm() {
  const tForm = useTranslations("admin.userManagement.form");
  const tActions = useTranslations("global.actions");

  return (
    <form>
      <input placeholder={tForm("namePlaceholder")} />
      <button>{tActions("save")}</button>
    </form>
  );
}
```

---

## ➕ Adicionar Traduções

### Arquivo global (raiz)

**Quando usar:** Textos compartilhados entre módulos (ações, status, validações)

1. Crie `messages/pt-BR/notifications.json`:

````json
{**3 arquivos** (types, load-messages, NAMESPACES)
4. Execute `pnpm run translate` ✅

<details>
<summary>Ver detalhes técnicos (opcional)</summary>

```typescript
// src/i18n/types.d.ts
import type notifications from "../../messages/pt-BR/notifications.json";
type Messages = { notifications: typeof notifications };

// src/i18n/load-messages.ts
const NAMESPACES = ["auth", "global", "notifications"]; // adicionar
````

</details>

---

### Novo módulo (pasta completa)

**Quando usar:** Funcionalidade nova com várias telas (ex: auditor, relatórios)

```typescript
import type notifications from "../../messages/pt-BR/notifications.json";

type Messages = {
  // ... outros
  notifications: typeof notifications;
};
```

4. Atualize `src/i18n/load-messages.ts` no array `NAMESPACES`

5. Execute `pnpm run translate`

```bash
# 1. Crie a pasta e arquivos
mkdir -p messages/pt-BR/auditor
```

```json
// messages/pt-BR/auditor/reports.json
{
  "title": "Relatórios de Auditoria",
  "list": { "empty": "Nenhum relatório" }
}
```

```typescript
// messages/pt-BR/auditor/index.ts
import reports from "./reports.json";
export default { reports };
```

2. **Registre o módulo** em `messages/pt-BR/index.ts`, `types.d.ts` e `NAMESPACES`
3. Execute `pnpm run translate` ✅

**Uso:**

```tsx
const t = useTranslations("auditor.reports");
return <h1>{t("title")}</h1>; // "Relatórios de Auditoria"
```

---

### Arquivo dentro de módulo existente

**Mais simples:** TypeScript detecta automaticamente!

```json
// messages/pt-BR/admin/permissions.json
{ "title": "Permissões" }
```

```typescript
// messages/pt-BR/admin/index.ts
import permissions from "./permissions.json"; // ← adicionar
export default { userManagement, permissions };
```

Execute `pnpm run translate` e pronto! ✅
};

````

4. Execute `pnpm run translate` para gerar traduções.

## 🔧 Scripts Disponíveis

### `pnpm run translate`

Traduz automaticamente novas chaves de pt-BR para en/es.

**Como funciona:**

- Lê todos os arquivos em `messages/pt-BR/`
- Compara com `messages/en/` e `messages/es/`
- Traduz apenas chaves que estão faltando
- Usa DeepL API (preferencial) ou Google Cloud Translation

**Variáveis de ambiente necessárias:**

```bash
# .env.local
DEEPL_API_KEY=seu_token_aqui
# ou
GOOGLE_CLOUD_API_KEY=seu_token_aqui
````

**Uso:**

```bash
# Tradução normal (preserva valores existentes)
pnpm run translate

# Force mode (re-traduz tudo, incluindo valores existentes)
pnpm run translate:force
```

### `pnpm run check:pt-leaks`

🆕 Detecta palavras em português em arquivos de tradução de outros idiomas.

**Como funciona:**

- Busca palavras portuguesas comuns (voltar, adicionar, carregando, etc.)
- Ignora palavras idênticas em PT/ES (editar, cancelar, confirmar)
- Lista todas as traduções com problemas
- Exit code 1 se encontrar problemas (útil para CI/CD)

**Quando usar:**

- Após `pnpm run translate` para validar qualidade
- Quando API de tradução falha silenciosamente
- Antes de fazer commit/PR
- Em pipeline de CI/CD

**Uso:**

```bash
pnpm run check:pt-leaks

# Exemplo de saída com problemas:
# 📁 Verificando locale: en
#   📄 global.json
#   ❌ actions.back: "Voltar" (contém: "voltar")
#   ❌ actions.remove: "Remover" (contém: "remover")
#
# ⚠️  Total: 2 problemas
```

### `pnpm run validate:i18n`

Valida se todos os locales têm as mesmas chaves.

**Quando usar:**

- Antes de abrir PR
- Após adicionar traduções manualmente
- Em pipeline de CI/CD

**Uso:**

```bash
pnpm run validate:i18n
```

### `pnpm run add-locale`

Cria estrutura completa para um novo idioma.

**O que faz:**

1. Cria pasta `messages/{novo-locale}/`
2. Copia estrutura de pt-BR com valores vazios
3. Cria `index.ts` com exports
4. Adiciona configuração em `src/i18n/config.ts`
5. Adiciona opção no `<LanguageSwitcher />`

**Uso:**

```bash
# Adicionar alemão
pnpm run add-locale -- de

# Adicionar francês
pnpm run add-locale -- fr
```

Organize por módulo/funcionalidade** - não por tipo de componente
✅ **Use namespaces hierárquicos** - `admin.userManagement.form.name` em vez de `forms.name`
✅ **Reutilize textos globais** - ações comuns em `global.actions.*`
✅ **Placeholders**: use `{variavel}` não `{{variavel}}`
✅ **Rode `translate` antes de commitar\*\* - garante sincronia

❌ **Nunca edite en/es manualmente** - são gerados automaticamente
❌ **Não deixe textos hardcoded** - sempre use `t()`
❌ **Evite duplicação** - se texto é usado em vários lugares, coloque em `global` ou `components`

### 📂 Quando criar arquivo global vs módulo

**Arquivo global** (raiz):

- Usado em múltiplos módulos
- Componentes UI compartilhados (header, modal, table)
- Ações e status comuns
- Erros e validações genéricas

**Módulo** (pasta):

- Específico de um perfil/funcionalidade
- Tem lógica de negócio própria
- Páginas e fluxos independentes

**Exemplo:**

```tsx
// ❌ Ruim - duplicação
"admin.userManagement.form.save": "Salvar"
"consultor.plants.form.save": "Salvar"

// ✅ Bom - reutilização
"global.actions.save": "Salvar"
``
export const SUPPORTED_LOCALES = ["pt-BR", "en", "es", "de"] as const;
```

2. Atualize `src/shared/components/language-switcher.tsx`:

```typescript
const LOCALES_CONFIG = {
  "pt-BR": { label: "Português (BR)", flag: "🇧🇷" },
  en: { label: "English (US)", flag: "🇺🇸" },
  es: { label: "Español (ES)", flag: "🇪🇸" },
  de: { label: "Deutsch (DE)", flag: "🇩🇪" }, // adicionar
} as const;
```

3. Execute `pnpm run translate` para gerar traduções.

## 🌍 Adicionar Novo Idioma (Passo a Passo)

### Opção 1: Usando o script (recomendado)

```bash
# 1. Execute o script
pnpm run add-locale -- de

# 2. Atualize as configurações (ver seção anterior)

# 3. Gere traduções
pnpm run translate

# 4. Valide
pnpm run validate:i18n
```

### Opção 2: Manual

```bash
# 1. Crie a pasta
mkdir messages/de

# 2. Copie os arquivos
cp messages/pt-BR/*.json messages/de/

# 3. Crie index.ts
echo 'import auth from "./auth.json";
import common from "./common.json";
import dashboard from "./dashboard.json";
import forms from "./forms.json";

export default { auth, common, dashboard, forms };' > messages/de/index.ts

# 4. Atualize config.ts, language-switcher.tsx e load-messages.ts
# 5. Execute translate
```

## 💡 Boas Práticas

✅ **Sempre edite pt-BR primeiro** - é a fonte de verdade
✅ **Use namespaces descritivos** - `auth`, `dashboard`, não `page1`, `tela2`
✅ **Placeholders**: use `{variavel}` não `{{variavel}}`
✅ **Rode `translate` antes de commitar** - garante sincronia

❌ **Nunca edite en/es manualmente** - são gerados automaticamente
❌ **Não deixe textos hardcoded** - sempre use `t()`

## 🎯 Type Safety

O projeto tem autocomplete completo! Ao digitar `t("`, você verá:

- ✅ Namespaces disponíveis
- ✅ Chaves válidas dentro do namespace
- ✅ Parâmetros obrigatórios (ex: `{version}`)

Caso o autocomplete não funcione:

1. `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
2. Recarregue o VS Code

## 🌐 Locales Suportados

| Locale | Nome           | Flag | Padrão |
| ------ | -------------- | ---- | ------ |
| pt-BR  | Português (BR) | 🇧🇷   | ✅     |
| en     | English (US)   | 🇺🇸   | -      |
| es     | Español (ES)   | 🇪🇸   | -      |

## 📝 Formato das Mensagens

```json
{
  "secao": {
    "campo": "Texto simples",
    "comParametro": "Olá {nome}",
    "plural": "Você tem {count, plural, =0 {nenhum item} =1 {1 item} other {# itens}}"
  }
}
```

## 🔍 Troubleshooting

**Mensagem não aparece**

- Verifique se o namespace está correto: `useTranslations("auth")`
- Execute `pnpm run validate:i18n`

**Autocomplete não funciona**

- Reinicie TypeScript Server
- Verifique se `src/i18n/types.d.ts` está atualizado

**Tradução automática falhou**

- Configure variáveis de ambiente (DeepL ou Google Cloud)
- Ou traduza manualmente os arquivos en/es
  **Arquivos `__test_ns__.json` aparecem nos locales**

- Esses arquivos são **temporários** para testes
- Os scripts ignoram automaticamente arquivos que começam com `__`
- Se aparecerem, pode removê-los com: `find messages -name "__test_ns__.json" -delete`

---

## 🔍 Troubleshooting

### Mensagem não aparece

1. Verifique se o namespace está correto: `useTranslations("auth")`
2. Execute `pnpm run validate:i18n` para verificar sincronização
3. Confirme se a chave existe em `messages/pt-BR/`

### Autocomplete não funciona

1. Reinicie TypeScript Server: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
2. Se não resolver, recarregue o VS Code: `Ctrl+Shift+P` → "Developer: Reload Window"
3. Verifique se `src/i18n/types.d.ts` está atualizado

### Tradução automática falhou

1. Configure variáveis de ambiente (DeepL ou Google Cloud) no `.env.local`
2. Verifique se não excedeu quota da API
3. Use `pnpm run translate:force` para forçar re-tradução
4. Como último recurso, traduza manualmente os arquivos en/es

### Arquivos `__test_ns__.json` aparecem nos locales

- Esses arquivos são **temporários** para testes
- Os scripts ignoram automaticamente arquivos que começam com `__`
- Se aparecerem, pode removê-los com: `find messages -name "__test_ns__.json" -delete`

### Português vazando para en/es

1. Execute `pnpm run check:pt-leaks` para detectar
2. Use `pnpm run translate:force` para corrigir
3. Valide novamente com `pnpm run check:pt-leaks`

### Erro: Cannot find module '../../messages/pt-BR/...'

1. Verifique se salvou todos os arquivos (`Ctrl+K S` no VS Code)
2. Confirme se criou o `index.ts` do módulo
3. Reinicie o TypeScript Server

---

## 📚 Recursos

- **Types com autocomplete:** `src/i18n/types.d.ts`
- **Scripts:** `scripts/translate.ts`, `scripts/validate-i18n.ts`
- **Docs oficiais:** [next-intl.dev](https://next-intl.dev)

**Exemplo de plural/variáveis:**

```json
{
  "greeting": "Olá {name}!",
  "items": "Você tem {count, plural, =0 {nenhum item} one {1 item} other {# itens}}"
}
``
```
