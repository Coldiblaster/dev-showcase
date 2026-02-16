# ➕ Adicionar Traduções - Guia Completo

Este guia explica **passo a passo** como adicionar novas traduções, incluindo quando e como atualizar a tipagem TypeScript.

---

## 📋 Índice de Cenários

1. [Adicionar chaves em arquivo existente](#-cenário-1-adicionar-chaves-em-arquivo-existente) (SEM tipagem)
2. [Criar novo arquivo global](#-cenário-2-criar-novo-arquivo-global) (COM tipagem)
3. [Criar novo módulo completo](#-cenário-3-criar-novo-módulo-completo) (COM tipagem)
4. [Adicionar novo idioma](#-cenário-4-adicionar-novo-idioma)

---

## 🎯 Cenário 1: Adicionar Chaves em Arquivo Existente

**Quando:** Você quer adicionar novas chaves em um arquivo JSON que já existe (ex: adicionar `"newAction": "Nova ação"` em `global.json`)

**Precisa mexer em tipagem?** ❌ **NÃO!** TypeScript detecta automaticamente.

### Passo a Passo

#### 1. Edite o arquivo pt-BR

```bash
# Abra o arquivo existente
# Exemplo: messages/pt-BR/global.json
```

```json
{
  "actions": {
    "save": "Salvar",
    "cancel": "Cancelar",
    "export": "Exportar" // ← NOVA CHAVE ADICIONADA
  }
}
```

#### 2. Execute o script de tradução

```bash
pnpm run translate
```

**O que acontece:**

- Script detecta a nova chave `export`
- Traduz para EN: `"export": "Export"`
- Traduz para ES: `"export": "Exportar"`

#### 3. Use no código

```tsx
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations("global");

  return <button>{t("actions.export")}</button>;
  // TypeScript autocompleta "actions.export" automaticamente! ✅
}
```

#### 4. Valide

```bash
pnpm run validate:i18n  # Verifica sincronização
pnpm run check:pt-leaks # Verifica qualidade das traduções
```

**Pronto!** ✅ Nenhuma configuração de tipo necessária.

---

## 🗂️ Cenário 2: Criar Novo Arquivo Global

**Quando:** Você quer criar um novo arquivo JSON na raiz (ex: `notifications.json` para notificações do sistema)

**Precisa mexer em tipagem?** ✅ **SIM!** (3 arquivos)

### Passo a Passo

#### 1. Crie o arquivo pt-BR

```bash
# Crie o novo arquivo
touch messages/pt-BR/notifications.json
```

```json
{
  "title": "Notificações",
  "markAllAsRead": "Marcar todas como lidas",
  "empty": "Nenhuma notificação",
  "types": {
    "info": "Informação",
    "warning": "Aviso",
    "error": "Erro"
  }
}
```

#### 2. Atualize o barrel export (index.ts)

```bash
# Abra messages/pt-BR/index.ts
```

```typescript
// Arquivos globais
import auth from "./auth.json";
import components from "./components.json";
import errors from "./errors.json";
import global from "./global.json";
import welcome from "./welcome.json";
import notifications from "./notifications.json"; // ← ADICIONAR

// Módulos
import admin from "./admin";
import cockpit from "./cockpit";
import consultor from "./consultor";

export default {
  // Arquivos globais
  auth,
  components,
  errors,
  global,
  welcome,
  notifications, // ← ADICIONAR
  // Módulos
  admin,
  cockpit,
  consultor,
};
```

#### 3. Atualize os tipos TypeScript

```bash
# Abra src/i18n/types.d.ts
```

```typescript
// Importar os tipos dos arquivos JSON (pt-BR como referência)
import type admin from "../../messages/pt-BR/admin";
import type auth from "../../messages/pt-BR/auth.json";
import type cockpit from "../../messages/pt-BR/cockpit";
import type components from "../../messages/pt-BR/components.json";
import type consultor from "../../messages/pt-BR/consultor";
import type errors from "../../messages/pt-BR/errors.json";
import type global from "../../messages/pt-BR/global.json";
import type welcome from "../../messages/pt-BR/welcome.json";
import type notifications from "../../messages/pt-BR/notifications.json"; // ← ADICIONAR

// Estrutura completa das mensagens
type Messages = {
  auth: typeof auth;
  global: typeof global;
  components: typeof components;
  errors: typeof errors;
  welcome: typeof welcome;
  notifications: typeof notifications; // ← ADICIONAR
  // Módulos
  admin: typeof admin;
  consultor: typeof consultor;
  cockpit: typeof cockpit;
};

// ... resto do arquivo
```

#### 4. Atualize o array de namespaces

```bash
# Abra src/i18n/load-messages.ts
```

```typescript
const NAMESPACES = [
  "auth",
  "global",
  "components",
  "errors",
  "welcome",
  "notifications", // ← ADICIONAR
  "admin",
  "consultor",
  "cockpit",
] as const;
```

#### 5. Execute o script de tradução

```bash
pnpm run translate
```

**O que acontece:**

- Cria `messages/en/notifications.json` com traduções em inglês
- Cria `messages/es/notifications.json` com traduções em espanhol

#### 6. Reinicie o TypeScript Server

```
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

**Nota:** Se o autocomplete ainda não funcionar, recarregue o VS Code (`Ctrl+Shift+P` → "Developer: Reload Window").

#### 7. Use no código

```tsx
import { useTranslations } from "next-intl";

export function NotificationCenter() {
  const t = useTranslations("notifications");

  return (
    <div>
      <h2>{t("title")}</h2>
      <button>{t("markAllAsRead")}</button>
      <p>{t("empty")}</p>
    </div>
  );
}
```

#### 8. Valide

```bash
pnpm run validate:i18n
pnpm run check:pt-leaks
```

**Pronto!** ✅ Novo arquivo global criado com autocomplete completo.

---

## 📦 Cenário 3: Criar Novo Módulo Completo

**Quando:** Você quer criar uma nova pasta de módulo (ex: `auditor/` para funcionalidades de auditoria)

**Precisa mexer em tipagem?** ✅ **SIM!** (3 arquivos)

### Passo a Passo

#### 1. Crie a estrutura de pastas

```bash
mkdir -p messages/pt-BR/auditor
```

#### 2. Crie os arquivos JSON do módulo

```bash
# Exemplo: módulo auditor com relatórios e logs
touch messages/pt-BR/auditor/reports.json
touch messages/pt-BR/auditor/logs.json
```

```json
// messages/pt-BR/auditor/reports.json
{
  "title": "Relatórios de Auditoria",
  "list": {
    "empty": "Nenhum relatório encontrado",
    "total": "Total de {count} relatórios"
  },
  "actions": {
    "generate": "Gerar relatório",
    "download": "Baixar PDF"
  }
}
```

```json
// messages/pt-BR/auditor/logs.json
{
  "title": "Logs de Auditoria",
  "filters": {
    "user": "Filtrar por usuário",
    "date": "Filtrar por data"
  }
}
```

#### 3. Crie o index.ts do módulo

```bash
touch messages/pt-BR/auditor/index.ts
```

```typescript
// messages/pt-BR/auditor/index.ts
import reports from "./reports.json";
import logs from "./logs.json";

export default {
  reports,
  logs,
};
```

#### 4. Atualize o barrel export principal

```bash
# Abra messages/pt-BR/index.ts
```

```typescript
// Arquivos globais
import auth from "./auth.json";
import global from "./global.json";
// ... outros

// Módulos
import admin from "./admin";
import auditor from "./auditor"; // ← ADICIONAR
import cockpit from "./cockpit";
import consultor from "./consultor";

export default {
  // Arquivos globais
  auth,
  global,
  // ...
  // Módulos
  admin,
  auditor, // ← ADICIONAR
  cockpit,
  consultor,
};
```

#### 5. Atualize os tipos TypeScript

```bash
# Abra src/i18n/types.d.ts
```

```typescript
// Importar módulos
import type admin from "../../messages/pt-BR/admin";
import type auditor from "../../messages/pt-BR/auditor"; // ← ADICIONAR
import type cockpit from "../../messages/pt-BR/cockpit";
import type consultor from "../../messages/pt-BR/consultor";
// ... imports de arquivos globais

// Estrutura completa das mensagens
type Messages = {
  // Arquivos globais
  auth: typeof auth;
  global: typeof global;
  // ...
  // Módulos
  admin: typeof admin;
  auditor: typeof auditor; // ← ADICIONAR
  consultor: typeof consultor;
  cockpit: typeof cockpit;
};

// ... resto do arquivo
```

#### 6. Atualize o array de namespaces

```bash
# Abra src/i18n/load-messages.ts
```

```typescript
const NAMESPACES = [
  "auth",
  "global",
  // ... outros
  "admin",
  "auditor", // ← ADICIONAR
  "consultor",
  "cockpit",
] as const;
```

#### 7. Execute o script de tradução

```bash
pnpm run translate
```

**O que acontece:**

- Cria `messages/en/auditor/` com `reports.json` e `logs.json` traduzidos
- Cria `messages/es/auditor/` com traduções em espanhol
- Copia `messages/pt-BR/auditor/index.ts` para en e es

#### 8. Reinicie o TypeScript Server

```
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

#### 9. Use no código

```tsx
import { useTranslations } from "next-intl";

export function AuditorReportsPage() {
  const t = useTranslations("auditor.reports");
  const tGlobal = useTranslations("global");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("list.empty")}</p>
      <button>{t("actions.generate")}</button>
      <button>{tGlobal("actions.cancel")}</button>
    </div>
  );
}
```

#### 10. Valide

```bash
pnpm run validate:i18n
pnpm run check:pt-leaks
```

**Pronto!** ✅ Novo módulo completo criado com autocomplete.

---

## 🌍 Cenário 4: Adicionar Novo Idioma

**Quando:** Você quer adicionar suporte a um novo idioma (ex: alemão, francês)

### Opção A: Usando Script (Recomendado)

#### 1. Execute o script add-locale

```bash
# Adicionar alemão
pnpm run add-locale -- de

# Adicionar francês
pnpm run add-locale -- fr
```

**O que o script faz:**

- Cria pasta `messages/de/` (ou `fr/`)
- Copia estrutura completa de pt-BR
- Cria todos os `index.ts` necessários
- Valores ficam vazios (serão preenchidos no próximo passo)

#### 2. Atualize as configurações do sistema

```bash
# Abra src/i18n/config.ts
```

```typescript
export const SUPPORTED_LOCALES = [
  "pt-BR",
  "en",
  "es",
  "de", // ← ADICIONAR
] as const;
```

#### 3. Adicione no LanguageSwitcher

```bash
# Abra src/shared/components/language-switcher.tsx
```

```typescript
const LOCALES_CONFIG = {
  "pt-BR": { label: "Português (BR)", flag: "🇧🇷" },
  en: { label: "English (US)", flag: "🇺🇸" },
  es: { label: "Español (ES)", flag: "🇪🇸" },
  de: { label: "Deutsch (DE)", flag: "🇩🇪" }, // ← ADICIONAR
} as const;
```

#### 4. Gere as traduções

```bash
pnpm run translate
```

#### 5. Valide

```bash
pnpm run validate:i18n
```

### Opção B: Manual

Se preferir fazer manualmente, siga os passos do [README.md - Adicionar Novo Idioma](./README.md#-adicionar-novo-idioma-passo-a-passo).

---

## 📊 Resumo: Quando Mexer em Tipagem?

| Cenário                                  | Tipagem? | Arquivos Afetados                            |
| ---------------------------------------- | -------- | -------------------------------------------- |
| ➕ Adicionar chaves em arquivo existente | ❌ NÃO   | Nenhum                                       |
| 📄 Criar novo arquivo global (raiz)      | ✅ SIM   | `index.ts`, `types.d.ts`, `load-messages.ts` |
| 📦 Criar novo módulo (pasta)             | ✅ SIM   | `index.ts`, `types.d.ts`, `load-messages.ts` |
| 🌍 Adicionar novo idioma                 | ✅ SIM   | `config.ts`, `language-switcher.tsx`         |

---

## 🎯 Checklist Rápido

### Para Arquivo Existente

- [ ] Editei `messages/pt-BR/{arquivo}.json`
- [ ] Rodei `pnpm run translate`
- [ ] Rodei `pnpm run validate:i18n`
- [ ] Testei no código

### Para Novo Arquivo Global

- [ ] Criei `messages/pt-BR/{novo-arquivo}.json`
- [ ] Adicionei import em `messages/pt-BR/index.ts`
- [ ] Adicionei export em `messages/pt-BR/index.ts`
- [ ] Adicionei import em `src/i18n/types.d.ts`
- [ ] Adicionei no type `Messages` em `src/i18n/types.d.ts`
- [ ] Adicionei em `NAMESPACES` em `src/i18n/load-messages.ts`
- [ ] Rodei `pnpm run translate`
- [ ] Reiniciei TypeScript Server
- [ ] Rodei `pnpm run validate:i18n`
- [ ] Testei autocomplete no código

### Para Novo Módulo

- [ ] Criei pasta `messages/pt-BR/{modulo}/`
- [ ] Criei arquivos `.json` dentro do módulo
- [ ] Criei `messages/pt-BR/{modulo}/index.ts`
- [ ] Adicionei import em `messages/pt-BR/index.ts`
- [ ] Adicionei export em `messages/pt-BR/index.ts`
- [ ] Adicionei import em `src/i18n/types.d.ts`
- [ ] Adicionei no type `Messages` em `src/i18n/types.d.ts`
- [ ] Adicionei em `NAMESPACES` em `src/i18n/load-messages.ts`
- [ ] Rodei `pnpm run translate`
- [ ] Reiniciei TypeScript Server
- [ ] Rodei `pnpm run validate:i18n`
- [ ] Testei autocomplete no código

### Para Novo Idioma

- [ ] Rodei `pnpm run add-locale -- {codigo}`
- [ ] Adicionei em `SUPPORTED_LOCALES` no `config.ts`
- [ ] Adicionei em `LOCALES_CONFIG` no `language-switcher.tsx`
- [ ] Rodei `pnpm run translate`
- [ ] Rodei `pnpm run validate:i18n`
- [ ] Testei troca de idioma no sistema

---

## ❓ Dúvidas Frequentes

**Q: Esqueci de atualizar algum arquivo de tipagem, o que acontece?**
A: Autocomplete não funcionará e você verá erros TypeScript ao tentar usar as traduções.

**Q: Posso adicionar vários arquivos/módulos de uma vez?**
A: Sim! Faça todos os passos 1-4 de uma vez, depois rode `pnpm run translate` uma única vez.

**Q: Preciso reiniciar o servidor Next.js?**
A: Não para arquivos existentes. Sim para novos arquivos/módulos (ou reinicie TS Server).

**Q: O script translate demora muito, é normal?**
A: Sim, há delay de 120ms entre cada chamada para evitar rate limit da API. Use `translate:force` com cautela.

---

## 🔗 Próximos Passos

- **Ver scripts disponíveis?** → [SCRIPTS.md](./SCRIPTS.md)
- **Boas práticas?** → [BEST_PRACTICES.md](./BEST_PRACTICES.md)
- **Voltar ao início?** → [INDEX.md](./INDEX.md)

---

**Dica:** Salve esta página nos favoritos! Você vai consultar bastante. 😉
