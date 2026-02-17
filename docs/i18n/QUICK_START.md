# Quick Start — Internacionalizacao

Guia pratico de 5 minutos para usar o sistema de i18n.

---

## Conceitos Basicos

### O que e um Namespace?

Um **namespace** e um grupo de traducoes relacionadas. Neste projeto, cada pagina/feature tem seu proprio JSON:

- `hero` → Hero section da home
- `nav` → Navbar e menus
- `contact` → Formulario de contato
- `securityPage` → Pagina de Security Tips
- `reactQueryTipsPage` → Pagina de React Query Tips
- `global` → Textos compartilhados

### Estrutura de Chaves

```json
{
  "title": "Dev Showcase",
  "description": "Portfolio de desenvolvimento",
  "features": [
    { "title": "Feature 1", "description": "Desc 1" }
  ],
  "nested": {
    "badge": "Novo",
    "subtitle": "Subtitulo"
  }
}
```

Acesso: `t("title")`, `t("nested.badge")`, ou `t.raw("features")` para arrays.

---

## Uso Basico

### 1. Importar o Hook

```tsx
import { useTranslations } from "next-intl";
```

### 2. Usar no Componente

```tsx
export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <span>{t("badge")}</span>
    </div>
  );
}
```

### 3. Com Variaveis

```tsx
export function Greeting({ name }: { name: string }) {
  const t = useTranslations("global");

  return <p>{t("welcome", { name })}</p>;
  // JSON: "welcome": "Bem-vindo, {name}!"
}
```

### 4. Multiplos Namespaces

```tsx
export function PageHeader() {
  const tHero = useTranslations("hero");
  const tNav = useTranslations("nav");

  return (
    <header>
      <h1>{tHero("title")}</h1>
      <nav>
        <a>{tNav("sectionTips")}</a>
        <a>{tNav("sectionImplementations")}</a>
      </nav>
    </header>
  );
}
```

### 5. Arrays com t.raw()

Quando o JSON tem arrays de objetos, use `t.raw()`:

```tsx
import type securityPage from "@/../messages/pt-BR/securityPage.json";

type Item = (typeof securityPage)["overview"]["items"][number];

export function OverviewSection() {
  const t = useTranslations("securityPage");

  return (
    <div>
      {(t.raw("overview.items") as Item[]).map((item) => (
        <div key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### 6. Server Components

```tsx
import { getTranslations } from "next-intl/server";

export default async function TipsPage() {
  const t = await getTranslations("tipsPage");

  return <h1>{t("title")}</h1>;
}
```

---

## Cheat Sheet

### Sintaxe

```tsx
// Texto simples
t("title");

// Com variavel
t("greeting", { name: "Vinicius" });

// Chave aninhada
t("hero.badge");

// Array de objetos
t.raw("features") as Feature[];

// Multiplos namespaces
const tNav = useTranslations("nav");
const tHero = useTranslations("hero");
```

### Namespaces deste Projeto

| Namespace            | Quando usar                  | Exemplo                    |
| -------------------- | ---------------------------- | -------------------------- |
| `hero`               | Hero section da home         | `t("title")`               |
| `nav`                | Navbar e menus               | `t("sectionTips")`         |
| `contact`            | Formulario de contato        | `t("form.name")`           |
| `about`              | Secao sobre                  | `t("sectionTitle")`        |
| `projects`           | Projetos                     | `t("title")`               |
| `experience`         | Experiencia                  | `t("title")`               |
| `securityPage`       | Pagina Security Tips         | `t("hero.title")`          |
| `reactQueryTipsPage` | Pagina React Query Tips      | `t("hero.badge")`          |
| `aiChatbotPage`      | Pagina AI Chatbot            | `t("hero.title")`          |
| `codeReviewPage`     | Pagina Code Review           | `t("hero.title")`          |
| `seoPage`            | Pagina SEO Showcase          | `t("hero.title")`          |
| `i18nPage`           | Pagina i18n Showcase         | `t("hero.title")`          |
| `global`             | Textos compartilhados        | `t("actions.back")`        |
| `search`             | Global search                | `t("placeholder")`         |
| `chat`               | Widget de chat IA            | `t("placeholder")`         |
| `terminal`           | Terminal easter egg           | `t("welcome")`             |
| `footer`             | Rodape                       | `t("copyright")`           |

### Placeholders

```json
{
  "greeting": "Ola, {name}!",
  "itemCount": "Voce tem {count} itens",
  "plural": "{count, plural, =0 {nenhum item} =1 {1 item} other {# itens}}"
}
```

```tsx
t("greeting", { name: "Vinicius" });
t("itemCount", { count: 5 });
t("plural", { count: 0 }); // "nenhum item"
```

---

## Trocar Idioma

O usuario troca o idioma via `<LanguageSwitcher />` na navbar:

```
src/components/language-switcher.tsx
```

Configuracao central em:

```
src/lib/i18n/config.ts
```

Voce nao precisa fazer nada especial — o sistema detecta automaticamente o idioma do cookie.

---

## TypeScript Autocomplete

O projeto tem autocomplete completo. Ao digitar `t("`, voce ve:

1. Todas as chaves validas dentro do namespace
2. Parametros obrigatorios (ex: `{name}`)
3. Erros de compilacao se a chave nao existir

Se nao funcionar:

1. `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
2. Se persistir: `Ctrl+Shift+P` → "Developer: Reload Window"

---

## Onde estao as traducoes?

```
messages/
├── pt-BR/              # Edite aqui (fonte de verdade)
│   ├── index.ts        # Barrel export
│   ├── hero.json
│   ├── nav.json
│   ├── contact.json
│   ├── securityPage.json
│   └── ...             # 32 namespaces
├── en/                 # Gerado automaticamente
├── es/                 # Gerado automaticamente
└── de/                 # Gerado automaticamente
```

**Regra de ouro:** SEMPRE edite `pt-BR` primeiro, depois rode `pnpm translate`.

---

## Exemplos Praticos

### Botao com Acao

```tsx
import { useTranslations } from "next-intl";

export function BackButton() {
  const t = useTranslations("global");

  return <button>{t("actions.back")}</button>;
}
```

### Pagina com Hero

```tsx
import { useTranslations } from "next-intl";

export function SecurityTips() {
  const t = useTranslations("securityPage");

  return (
    <section>
      <span>{t("hero.badge")}</span>
      <h1>{t("hero.title")}</h1>
      <p>{t("hero.description")}</p>
    </section>
  );
}
```

### Formulario de Contato

```tsx
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contact");

  return (
    <form>
      <input placeholder={t("form.name")} />
      <input placeholder={t("form.email")} />
      <textarea placeholder={t("form.message")} />
      <button>{t("form.submit")}</button>
    </form>
  );
}
```

---

## Workflow Completo

1. **Adicionar texto em pt-BR**

```bash
# Edite messages/pt-BR/hero.json
"newBadge": "Novo texto"
```

2. **Gerar traducoes**

```bash
pnpm translate
```

3. **Usar no codigo**

```tsx
const t = useTranslations("hero");
return <span>{t("newBadge")}</span>;
```

4. **Validar**

```bash
pnpm validate:i18n
pnpm check:pt-leaks
```

---

## Duvidas Comuns

**Q: Posso usar fora de componentes React?**
A: Sim! Use `getTranslations()` em Server Components ou actions:

```tsx
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("hero");
  return <h1>{t("title")}</h1>;
}
```

**Q: Como pluralizar?**
A: Use ICU Message Format:

```json
{ "items": "{count, plural, =0 {nenhum} =1 {1 item} other {# itens}}" }
```

```tsx
t("items", { count: 0 }); // "nenhum"
t("items", { count: 5 }); // "5 itens"
```

**Q: Como acessar arrays do JSON?**
A: Use `t.raw("chave")` com type assertion. Veja secao "Arrays com t.raw()" acima.

**Q: O que fazer se traducao nao aparecer?**
A: 1) Verifique o namespace 2) Rode `pnpm validate:i18n` 3) Reinicie TS Server

---

## Proximos Passos

- **Adicionar novas traducoes?** → [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md)
- **Ver scripts disponiveis?** → [SCRIPTS.md](./SCRIPTS.md)
- **Boas praticas?** → [BEST_PRACTICES.md](./BEST_PRACTICES.md)

---

Precisa de ajuda? Consulte o [INDEX.md](./INDEX.md) ou [README.md](./README.md)
