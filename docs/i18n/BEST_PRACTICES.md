# ✨ Boas Práticas - Internacionalização

Convenções e padrões para manter a qualidade e consistência das traduções.

---

## 🎯 Princípios Fundamentais

### 1. pt-BR é a Fonte de Verdade

✅ **SEMPRE** edite pt-BR primeiro
❌ **NUNCA** edite en/es manualmente

```bash
# ✅ Correto
vim messages/pt-BR/global.json
pnpm run translate

# ❌ Errado
vim messages/en/global.json  # Será sobrescrito!
```

**Por quê?**

- Scripts geram en/es a partir de pt-BR
- Edições manuais em en/es serão perdidas
- Mantém único ponto de verdade

---

### 2. Execute Scripts Antes de Commitar

```bash
# Workflow recomendado
pnpm run translate        # Gera traduções
pnpm run check:pt-leaks  # Valida qualidade
pnpm run validate:i18n   # Valida sincronização
git add messages/
git commit -m "feat: adiciona traduções"
```

**Configure pre-commit hook:**

```bash
# .husky/pre-commit
pnpm run validate:i18n
pnpm run check:pt-leaks
```

---

### 3. Use Namespaces Descritivos

✅ **Bom**: `auth`, `global`, `admin.userManagement`
❌ **Ruim**: `page1`, `tela2`, `form`

```tsx
// ✅ Fica claro o que é
const t = useTranslations("admin.userManagement");
const tActions = useTranslations("global.actions");

// ❌ Confuso
const t = useTranslations("form1");
```

---

## 📁 Organização de Arquivos

### Quando Criar Arquivo Global vs Módulo

**Arquivo Global** (raiz de messages/pt-BR/):

- Usado em múltiplos módulos
- Componentes UI compartilhados
- Ações e status comuns
- Erros e validações genéricas

```
messages/pt-BR/
├── auth.json         # ✅ Login usado em todos os módulos
├── global.json       # ✅ Ações comuns (salvar, cancelar)
├── components.json   # ✅ Header, table, modal
└── errors.json       # ✅ 404, 500, unauthorized
```

**Módulo** (pasta):

- Específico de um perfil/funcionalidade
- Tem lógica de negócio própria
- Páginas e fluxos independentes

```
messages/pt-BR/
├── admin/            # ✅ Gestão de usuários
│   └── user-management.json
├── consultor/        # ✅ Unidades de negócio
│   └── business-unit.json
└── cockpit/          # ✅ Dashboards
    └── dashboard.json
```

### Exemplo Prático

```tsx
// ❌ Ruim - duplicação
// messages/pt-BR/admin/user-management.json
"form": { "save": "Salvar" }

// messages/pt-BR/consultor/business-unit.json
"form": { "save": "Salvar" }

// ✅ Bom - reutilização
// messages/pt-BR/global.json
"actions": { "save": "Salvar" }

// Uso no código
const tActions = useTranslations("global.actions");
<button>{tActions("save")}</button>
```

---

## 🔤 Convenções de Nomenclatura

### Chaves JSON

Use **camelCase** para chaves:

```json
{
  "userManagement": "Gestão de Usuários",
  "businessUnit": "Unidade de Negócio",
  "currentMaturity": "Maturidade Atual"
}
```

❌ **Evite**:

- `user_management` (snake_case)
- `user-management` (kebab-case)
- `UserManagement` (PascalCase)

### Estrutura Hierárquica

Use objetos aninhados para organização:

```json
{
  "form": {
    "fields": {
      "name": {
        "label": "Nome",
        "placeholder": "Digite o nome",
        "validation": {
          "required": "Nome é obrigatório",
          "minLength": "Mínimo de {min} caracteres"
        }
      }
    }
  }
}
```

```tsx
// Uso no código
const t = useTranslations("admin.userManagement");
<input placeholder={t("form.fields.name.placeholder")} />;
```

### Evite Duplicação

```tsx
// ❌ Ruim - criando nova ação
"admin.userManagement.form.save": "Salvar"
"consultor.plants.form.save": "Salvar"

// ✅ Bom - reutilizando global
"global.actions.save": "Salvar"
```

---

## 💬 Qualidade das Traduções

### Placeholders (Variáveis)

Use **{nomeDaVariavel}** (sem espaços):

```json
{
  "greeting": "Olá, {name}!",
  "itemCount": "Você tem {count} itens",
  "userCreated": "{userName} criou {plantCount} plantas"
}
```

```tsx
// Uso no código
t("greeting", { name: "João" });
t("itemCount", { count: 5 });
t("userCreated", { userName: "Maria", plantCount: 3 });
```

❌ **Evite**:

- `{{name}}` (dupla chave)
- `{ name }` (com espaços)
- `$name` (sintaxe incorreta)

### Contexto nos Textos

Seja específico para ajudar tradução automática:

```json
{
  // ❌ Vago
  "name": "Nome",

  // ✅ Específico
  "form": {
    "userName": "Nome do usuário",
    "companyName": "Nome da empresa"
  }
}
```

### Pluralização (ICU Message Format)

```json
{
  "items": "{count, plural, =0 {nenhum item} one {1 item} other {# itens}}"
}
```

```tsx
t("items", { count: 0 }); // "nenhum item"
t("items", { count: 1 }); // "1 item"
t("items", { count: 5 }); // "5 itens"
```

---

## 🚫 Anti-Patterns (O Que NÃO Fazer)

### 1. Hardcoded Texts

```tsx
// ❌ Texto direto no código
<button>Salvar</button>
<h1>Gestão de Usuários</h1>

// ✅ Sempre use i18n
const t = useTranslations("global");
<button>{t("actions.save")}</button>
```

### 2. Editar en/es Manualmente

```bash
# ❌ NUNCA faça isso
vim messages/en/global.json  # Será sobrescrito!

# ✅ Edite pt-BR e rode script
vim messages/pt-BR/global.json
pnpm run translate
```

### 3. Namespaces Genéricos

```tsx
// ❌ Dificulta manutenção
const t = useTranslations("page");
const t2 = useTranslations("form");

// ✅ Descritivo
const t = useTranslations("admin.userManagement");
const tActions = useTranslations("global.actions");
```

### 4. Duplicação de Textos

```json
// ❌ Cada módulo cria suas próprias ações
// admin/user-management.json
"actions": { "save": "Salvar", "cancel": "Cancelar" }

// consultor/business-unit.json
"actions": { "save": "Salvar", "cancel": "Cancelar" }

// ✅ Centralize em global
// global.json
"actions": { "save": "Salvar", "cancel": "Cancelar" }
```

### 5. Chaves Muito Longas

```json
{
  // ❌ Caminho excessivamente longo
  "administration.user.management.form.fields.personal.info.name.label": "Nome"

  // ✅ Equilibrado
  "form.name": "Nome"
}
```

### 6. Concatenação de Strings

```tsx
// ❌ Quebra estrutura gramatical de outros idiomas
const message = t("user") + " " + t("created");

// ✅ Use chave completa com placeholder
// JSON: "userCreated": "{userName} criado com sucesso"
const message = t("userCreated", { userName: "João" });
```

---

## 🎨 Padrões por Tipo de Conteúdo

### Ações (Botões)

```json
{
  "actions": {
    "add": "Adicionar",
    "edit": "Editar",
    "delete": "Deletar",
    "save": "Salvar",
    "cancel": "Cancelar",
    "confirm": "Confirmar",
    "close": "Fechar",
    "open": "Abrir",
    "export": "Exportar",
    "import": "Importar"
  }
}
```

**Local:** `global.json` (usado em todo o sistema)

### Status

```json
{
  "status": {
    "loading": "Carregando...",
    "processing": "Processando...",
    "success": "Sucesso!",
    "error": "Erro",
    "warning": "Atenção",
    "info": "Informação"
  }
}
```

**Local:** `global.json`

### Validações

```json
{
  "validation": {
    "required": "Este campo é obrigatório",
    "email": "E-mail inválido",
    "minLength": "Mínimo de {min} caracteres",
    "maxLength": "Máximo de {max} caracteres",
    "numeric": "Apenas números"
  }
}
```

**Local:** `global.json`

### Mensagens de Erro

```json
{
  "errors": {
    "notFound": {
      "title": "Página não encontrada",
      "description": "A página que você procura não existe"
    },
    "unauthorized": {
      "title": "Acesso negado",
      "description": "Você não tem permissão"
    }
  }
}
```

**Local:** `errors.json`

### Formulários

```json
{
  "form": {
    "title": "Criar Usuário",
    "fields": {
      "name": {
        "label": "Nome",
        "placeholder": "Digite o nome"
      },
      "email": {
        "label": "E-mail",
        "placeholder": "exemplo@email.com"
      }
    }
  }
}
```

**Local:** Módulo específico (ex: `admin/user-management.json`)

---

## 🔄 Reutilização Inteligente

### Combine Namespaces

```tsx
export function UserForm() {
  // Textos específicos do formulário
  const tForm = useTranslations("admin.userManagement.form");

  // Ações globais
  const tActions = useTranslations("global.actions");

  // Validações globais
  const tValidation = useTranslations("global.validation");

  return (
    <form>
      <h1>{tForm("title")}</h1>

      <input placeholder={tForm("fields.name.placeholder")} required />
      {error && <span>{tValidation("required")}</span>}

      <button type="submit">{tActions("save")}</button>
      <button type="button">{tActions("cancel")}</button>
    </form>
  );
}
```

### Componentes Reutilizáveis

```tsx
// src/shared/components/confirm-dialog.tsx
export function ConfirmDialog({ onConfirm, onCancel }: ConfirmDialogProps) {
  const t = useTranslations("components.confirmDialog");
  const tActions = useTranslations("global.actions");

  return (
    <dialog>
      <h2>{t("title")}</h2>
      <p>{t("message")}</p>
      <button onClick={onConfirm}>{tActions("confirm")}</button>
      <button onClick={onCancel}>{tActions("cancel")}</button>
    </dialog>
  );
}
```

---

## 📊 Checklist de Code Review

### Para Adicionar Tradução

- [ ] Editou apenas pt-BR (não en/es)
- [ ] Rodou `pnpm run translate`
- [ ] Rodou `pnpm run validate:i18n`
- [ ] Rodou `pnpm run check:pt-leaks`
- [ ] Namespace faz sentido
- [ ] Não duplicou texto que já existe em global
- [ ] Placeholders usam `{variavel}` correto
- [ ] TypeScript autocomplete funciona

### Para Usar Tradução

- [ ] Não tem texto hardcoded
- [ ] Usa `useTranslations()` correto
- [ ] Namespace específico + global quando apropriado
- [ ] Placeholders passados corretamente
- [ ] Testes verificam tradução (se aplicável)

---

## 🛠️ Ferramentas Úteis

### VS Code Snippets

```json
// .vscode/i18n.code-snippets
{
  "Use Translations": {
    "prefix": "usetrans",
    "body": ["const t = useTranslations(\"${1:namespace}\");", "$0"]
  },
  "Translation Key": {
    "prefix": "tkey",
    "body": ["{t(\"${1:key}\")}$0"]
  }
}
```

### ESLint Rule (Custom)

Detecta texto hardcoded em JSX:

```javascript
// .eslintrc.js (exemplo conceitual)
rules: {
  "no-hardcoded-strings": "warn"
}
```

---

## 🌍 Considerações Culturais

### Evite Expressões Locais

```json
{
  // ❌ Gíria brasileira
  "error": "Deu ruim"

  // ✅ Neutro
  "error": "Ocorreu um erro"
}
```

### Formato de Data/Hora

Use `Intl.DateTimeFormat`:

```tsx
import { useLocale } from "next-intl";

export function PlantCreatedDate({ date }: { date: Date }) {
  const locale = useLocale(); // "pt-BR", "en", "es"
  const t = useTranslations("global");

  const formatted = new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);

  return (
    <p>
      {t("createdAt")}: {formatted}
      {/* pt-BR: "Criado em: 6 de janeiro de 2026 às 14:30" */}
      {/* en: "Created at: January 6, 2026 at 2:30 PM" */}
      {/* es: "Creado el: 6 de enero de 2026 a las 14:30" */}
    </p>
  );
}
```

### Formato de Números

```tsx
import { useLocale } from "next-intl";

export function SecurityScore({ score }: { score: number }) {
  const locale = useLocale();
  const t = useTranslations("cockpit.dashboard");

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(score);

  return (
    <span>
      {t("score")}: {formatted}%
    </span>
  );
  // pt-BR: "Pontuação: 87,45%"
  // en: "Score: 87.45%"
  // es: "Puntuación: 87,45%"
}
```

---

## 🔗 Recursos Adicionais

- **next-intl docs**: [next-intl.dev](https://next-intl.dev)
- **ICU Message Format**: [unicode.org/icu](https://unicode-org.github.io/icu/userguide/format_parse/messages/)
- **DeepL API**: [deepl.com/docs-api](https://www.deepl.com/docs-api)

---

## 📚 Próximos Passos

- **Ver scripts disponíveis?** → [SCRIPTS.md](./SCRIPTS.md)
- **Como adicionar traduções?** → [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md)
- **Voltar ao início?** → [INDEX.md](./INDEX.md)

---

**Lembre-se:** Consistência é mais importante que perfeição! 🎯
