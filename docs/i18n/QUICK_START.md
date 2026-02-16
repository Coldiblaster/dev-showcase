# 🚀 Quick Start - Internacionalização

Guia prático de 5 minutos para usar o sistema de i18n.

---

## 📦 Conceitos Básicos

### O que é um Namespace?

Um **namespace** é um grupo de traduções relacionadas:

- `auth` → Login, logout, validações
- `global` → Ações comuns (salvar, cancelar), status
- `admin.userManagement` → Gestão de usuários do módulo admin
- `cockpit.dashboard` → Dashboard do módulo cockpit

### Estrutura de Chaves

```json
{
  "login": {
    "title": "Entrar no sistema",
    "version": "Versão {version}"
  },
  "actions": {
    "save": "Salvar",
    "cancel": "Cancelar"
  }
}
```

Acesso: `t("login.title")` ou `t("actions.save")`

---

## 🎯 Uso Básico

### 1. Importar o Hook

```tsx
import { useTranslations } from "next-intl";
```

### 2. Usar no Componente

```tsx
export function LoginPage() {
  const t = useTranslations("auth"); // namespace "auth"

  return (
    <div>
      <h1>{t("login.title")}</h1>
      <input placeholder={t("login.emailPlaceholder")} />
      <button>{t("login.submit")}</button>
    </div>
  );
}
```

### 3. Com Variáveis

```tsx
export function WelcomeMessage({ userName }: { userName: string }) {
  const t = useTranslations("global");

  return <p>{t("welcome", { name: userName })}</p>;
  // JSON: "welcome": "Bem-vindo, {name}!"
}
```

### 4. Múltiplos Namespaces

```tsx
export function UserForm() {
  const tForm = useTranslations("admin.userManagement");
  const tActions = useTranslations("global");

  return (
    <form>
      <h1>{tForm("title")}</h1>
      <input placeholder={tForm("form.namePlaceholder")} />
      <button>{tActions("actions.save")}</button>
      <button>{tActions("actions.cancel")}</button>
    </form>
  );
}
```

---

## 🔤 Cheat Sheet

### Sintaxe Básica

```tsx
// Texto simples
t("login.title");

// Com variável
t("greeting", { name: "João" });

// Aninhado
t("form.fields.email.label");

// Múltiplos namespaces
const tGlobal = useTranslations("global");
const tAuth = useTranslations("auth");
```

### Namespaces Comuns

| Namespace              | Quando usar                   | Exemplo                        |
| ---------------------- | ----------------------------- | ------------------------------ |
| `global`               | Ações, status, navegação      | `t("actions.save")`            |
| `auth`                 | Login, logout, validações     | `t("login.title")`             |
| `components`           | Componentes UI compartilhados | `t("header.notifications")`    |
| `errors`               | Mensagens de erro             | `t("notFound.title")`          |
| `admin.userManagement` | Gestão de usuários            | `t("form.emailLabel")`         |
| `cockpit.dashboard`    | Dashboard do cockpit          | `t("metrics.currentMaturity")` |

### Placeholders

```json
{
  "greeting": "Olá, {name}!",
  "itemCount": "Você tem {count} itens",
  "multipleVars": "{user} criou {count} plantas"
}
```

```tsx
t("greeting", { name: "João" });
t("itemCount", { count: 5 });
t("multipleVars", { user: "Maria", count: 3 });
```

---

## 🌐 Trocar Idioma

O usuário troca o idioma via `<LanguageSwitcher />` no header:

```tsx
// Componente já existe em:
// src/shared/components/language-switcher.tsx

// Mostra bandeira do idioma atual: 🇧🇷 🇺🇸 🇪🇸
// Salva preferência em cookie
```

**Você não precisa fazer nada!** O sistema detecta automaticamente.

---

## ✅ TypeScript Autocomplete

O projeto tem **autocomplete completo**! Ao digitar `t("`, você verá:

1. Todos os namespaces disponíveis
2. Todas as chaves válidas dentro do namespace
3. Parâmetros obrigatórios (ex: `{name}`)

**Se não funcionar:**

1. `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
2. Recarregue o VS Code

---

## 📁 Onde Estão as Traduções?

```
messages/
├── pt-BR/              # 🇧🇷 Edite aqui (fonte de verdade)
│   ├── global.json
│   ├── auth.json
│   └── admin/
│       └── user-management.json
├── en/                 # 🇺🇸 Gerado automaticamente
└── es/                 # 🇪🇸 Gerado automaticamente
```

**Regra de ouro:** SEMPRE edite `pt-BR` primeiro, depois rode `pnpm run translate`

---

## 🎨 Exemplos Práticos

### Botão com Ação

```tsx
import { useTranslations } from "next-intl";

export function DeleteButton({ onDelete }: { onDelete: () => void }) {
  const t = useTranslations("global");

  return <button onClick={onDelete}>{t("actions.delete")}</button>;
}
```

### Lista Vazia

```tsx
export function PlantList({ plants }: { plants: Plant[] }) {
  const t = useTranslations("consultor.businessUnit");

  if (plants.length === 0) {
    return <p>{t("list.empty")}</p>;
  }

  return <ul>{/* render plants */}</ul>;
}
```

### Formulário Completo

```tsx
export function CreateUserForm() {
  const tForm = useTranslations("admin.userManagement.form");
  const tActions = useTranslations("global.actions");
  const tValidation = useTranslations("global.validation");

  return (
    <form>
      <label>
        {tForm("nameLabel")}
        <input placeholder={tForm("namePlaceholder")} required />
      </label>

      <label>
        {tForm("emailLabel")}
        <input type="email" placeholder={tForm("emailPlaceholder")} />
      </label>

      <div>
        <button type="submit">{tActions("save")}</button>
        <button type="button">{tActions("cancel")}</button>
      </div>
    </form>
  );
}
```

### Mensagem de Erro

```tsx
export function ErrorMessage({ error }: { error: string | null }) {
  const t = useTranslations("global.validation");

  if (!error) return null;

  return <span className="error">{t(error)}</span>;
  // Exemplo: error = "required" → "Este campo é obrigatório"
}
```

---

## 🔄 Workflow Completo

1. **Adicionar texto em pt-BR**

   ```bash
   # Edite messages/pt-BR/global.json
   "newKey": "Novo texto"
   ```

2. **Gerar traduções**

   ```bash
   pnpm run translate
   ```

3. **Usar no código**

   ```tsx
   const t = useTranslations("global");
   return <p>{t("newKey")}</p>;
   ```

4. **Validar**
   ```bash
   pnpm run validate:i18n
   pnpm run check:pt-leaks
   ```

---

## ❓ Dúvidas Comuns

**Q: Posso usar fora de componentes React?**
A: Sim! Use `getTranslations()` em Server Components ou actions.

```tsx
// Server Component
import { getTranslations } from "next-intl/server";

export default async function ServerPage() {
  const t = await getTranslations("global");

  return <h1>{t("welcome")}</h1>;
}

// Server Action
import { getTranslations } from "next-intl/server";

export async function createUserAction(data: FormData) {
  "use server";
  const t = await getTranslations("admin.userManagement");

  // Usar t() para mensagens de sucesso/erro
  return { message: t("success.userCreated") };
}
```

**Q: Como pluralizar?**
A: Use ICU Message Format:

```json
// messages/pt-BR/global.json
{
  "plantsCount": "{count, plural, =0 {Nenhuma planta} =1 {1 planta} other {# plantas}}"
}
```

```tsx
// Uso no código
t("plantsCount", { count: 0 }); // "Nenhuma planta"
t("plantsCount", { count: 1 }); // "1 planta"
t("plantsCount", { count: 5 }); // "5 plantas"
```

**Q: Posso aninhar namespaces?**
A: Sim! `admin.userManagement.form.nameLabel`

**Q: O que fazer se tradução não aparecer?**
A: 1) Verifique se o namespace está correto 2) Rode `pnpm run validate:i18n` 3) Reinicie o TS Server

---

## 🔗 Próximos Passos

- **Adicionar novas traduções?** → [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md)
- **Ver scripts disponíveis?** → [SCRIPTS.md](./SCRIPTS.md)
- **Boas práticas?** → [BEST_PRACTICES.md](./BEST_PRACTICES.md)

---

**Precisa de ajuda?** Consulte o [INDEX.md](./INDEX.md) ou [README.md](./README.md)
