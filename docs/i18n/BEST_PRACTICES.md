# Boas Praticas — Internacionalizacao

Convencoes e padroes para manter a qualidade e consistencia das traducoes.

---

## Principios Fundamentais

### 1. pt-BR e a Fonte de Verdade

SEMPRE edite pt-BR primeiro. NUNCA edite en/es/de manualmente.

```bash
# Correto
# Edite messages/pt-BR/hero.json
pnpm translate

# Errado - sera sobrescrito pelo script!
# Editar messages/en/hero.json diretamente
```

**Por que?**

- Scripts geram en/es/de a partir de pt-BR
- Edicoes manuais nos outros locales serao perdidas
- Mantem unico ponto de verdade

---

### 2. Execute Scripts Antes de Commitar

```bash
pnpm translate        # Gera traducoes
pnpm check:pt-leaks   # Valida qualidade
pnpm validate:i18n    # Valida sincronizacao
git add messages/
git commit -m "feat: adiciona traducoes"
```

---

### 3. Use Namespaces Descritivos

Bom: `hero`, `contact`, `securityPage`, `reactQueryTipsPage`
Ruim: `page1`, `tela2`, `form`

```tsx
// Bom - fica claro o que e
const t = useTranslations("securityPage");
const tNav = useTranslations("nav");

// Ruim - confuso
const t = useTranslations("form1");
```

---

## Organizacao de Arquivos

### Neste Projeto

Cada pagina/feature tem seu proprio JSON na raiz de `messages/pt-BR/`:

```
messages/pt-BR/
├── hero.json               # Hero section da home
├── nav.json                # Navbar
├── contact.json            # Formulario de contato
├── about.json              # Secao sobre
├── projects.json           # Projetos
├── experience.json         # Experiencia
├── footer.json             # Rodape
├── global.json             # Textos compartilhados (acoes, status)
├── search.json             # Global search
├── chat.json               # Widget de chat IA
├── terminal.json           # Terminal easter egg
├── securityPage.json       # Pagina Security Tips
├── reactQueryTipsPage.json # Pagina React Query Tips
├── aiChatbotPage.json      # Pagina AI Chatbot Showcase
├── codeReviewPage.json     # Pagina Code Review
├── regexPage.json          # Pagina Regex Playground
├── seoPage.json            # Pagina SEO Showcase
├── i18nPage.json           # Pagina i18n Showcase
├── reactPatterns.json      # React Design Patterns
├── tsPatterns.json         # TypeScript Patterns
├── gitWorkflow.json        # Git Workflow
├── viewSource.json         # Componente ViewSource
├── ...                     # Outros namespaces
└── index.ts                # Barrel export
```

### Convencao de Nomes

- Paginas de guia: `{nome}Page.json` (ex: `securityPage.json`, `tipsPage.json`)
- Secoes da home: nome curto (ex: `hero.json`, `about.json`, `contact.json`)
- Componentes globais: nome do componente (ex: `search.json`, `terminal.json`)
- Textos compartilhados: `global.json`

---

## Convencoes de Nomenclatura

### Chaves JSON

Use **camelCase**:

```json
{
  "heroTitle": "Dev Showcase",
  "sectionDescription": "Portfolio de desenvolvimento",
  "scrollDown": "Rolar para baixo"
}
```

Evite:

- `hero_title` (snake_case)
- `hero-title` (kebab-case)
- `HeroTitle` (PascalCase)

### Estrutura Hierarquica

Use objetos aninhados para organizacao:

```json
{
  "hero": {
    "badge": "Portfolio",
    "title": "Dev Showcase",
    "description": "Descricao do portfolio"
  },
  "form": {
    "name": "Nome",
    "email": "E-mail",
    "submit": "Enviar"
  }
}
```

```tsx
const t = useTranslations("contact");
<input placeholder={t("form.name")} />;
```

### Evite Duplicacao

Se um texto e usado em varios lugares, coloque no `global.json`:

```tsx
// Ruim - duplicando "Voltar" em cada pagina
// securityPage.json: "backButton": "Voltar"
// reactQueryTipsPage.json: "backButton": "Voltar"

// Bom - centralizado
// global.json: "actions": { "back": "Voltar" }
const tGlobal = useTranslations("global");
<button>{tGlobal("actions.back")}</button>
```

---

## Qualidade das Traducoes

### Placeholders (Variaveis)

Use `{nomeDaVariavel}` (sem espacos, sem chaves duplas):

```json
{
  "greeting": "Ola, {name}!",
  "itemCount": "Voce tem {count} itens"
}
```

```tsx
t("greeting", { name: "Vinicius" });
t("itemCount", { count: 5 });
```

Evite:

- `{{name}}` (chave dupla)
- `{ name }` (com espacos)
- `$name` (sintaxe incorreta)

### Pluralizacao (ICU Message Format)

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

### Arrays de Objetos

Use `t.raw()` com type assertion para arrays:

```json
{
  "features": [
    { "title": "Feature 1", "description": "Descricao 1" },
    { "title": "Feature 2", "description": "Descricao 2" }
  ]
}
```

```tsx
import type myPage from "@/../messages/pt-BR/myPage.json";
type Feature = (typeof myPage)["features"][number];

const features = t.raw("features") as Feature[];
```

---

## Anti-Patterns (O Que NAO Fazer)

### 1. Hardcoded Texts

```tsx
// Errado - texto direto no codigo
<button>Salvar</button>
<h1>Security Tips</h1>

// Correto - sempre use i18n
const t = useTranslations("securityPage");
<h1>{t("hero.title")}</h1>
```

### 2. Editar en/es/de Manualmente

```bash
# Errado - sera sobrescrito!
# Editar messages/en/hero.json

# Correto - edite pt-BR e rode script
# Editar messages/pt-BR/hero.json
pnpm translate
```

### 3. Concatenacao de Strings

```tsx
// Errado - quebra estrutura gramatical de outros idiomas
const message = t("user") + " " + t("created");

// Correto - use chave completa com placeholder
// JSON: "userCreated": "{name} criado com sucesso"
const message = t("userCreated", { name: "Vinicius" });
```

### 4. Chaves Muito Longas

```json
{
  // Errado - caminho excessivo
  "page.hero.section.main.title.heading.text": "Titulo"

  // Correto - equilibrado
  "hero.title": "Titulo"
}
```

---

## Reutilizacao Inteligente

### Combine Namespaces

```tsx
export function SecurityPage() {
  const t = useTranslations("securityPage");    // Textos da pagina
  const tGlobal = useTranslations("global");    // Textos compartilhados
  const tNav = useTranslations("nav");          // Textos de navegacao

  return (
    <div>
      <h1>{t("hero.title")}</h1>
      <button>{tGlobal("actions.back")}</button>
      <a>{tNav("sectionTips")}</a>
    </div>
  );
}
```

---

## Checklist de Code Review

### Para Adicionar Traducao

- [ ] Editou apenas pt-BR (nao en/es/de)
- [ ] Rodou `pnpm translate`
- [ ] Rodou `pnpm validate:i18n`
- [ ] Rodou `pnpm check:pt-leaks`
- [ ] Namespace faz sentido
- [ ] Nao duplicou texto que ja existe em global
- [ ] Placeholders usam `{variavel}` correto

### Para Usar Traducao

- [ ] Nao tem texto hardcoded
- [ ] Usa `useTranslations()` correto
- [ ] Namespace especifico + global quando apropriado
- [ ] Placeholders passados corretamente

---

## Consideracoes Culturais

### Formato de Data/Hora

Use `Intl.DateTimeFormat` com o locale atual:

```tsx
import { useLocale } from "next-intl";

export function DateDisplay({ date }: { date: Date }) {
  const locale = useLocale();

  const formatted = new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
  }).format(date);

  return <time>{formatted}</time>;
  // pt-BR: "17 de fevereiro de 2026"
  // en: "February 17, 2026"
  // es: "17 de febrero de 2026"
  // de: "17. Februar 2026"
}
```

### Formato de Numeros

```tsx
import { useLocale } from "next-intl";

export function Score({ value }: { value: number }) {
  const locale = useLocale();

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
  }).format(value);

  return <span>{formatted}%</span>;
  // pt-BR: "87,45%"
  // en: "87.45%"
}
```

---

## Recursos

- **next-intl docs**: [next-intl.dev](https://next-intl.dev)
- **ICU Message Format**: [unicode.org/icu](https://unicode-org.github.io/icu/userguide/format_parse/messages/)
- **DeepL API**: [deepl.com/docs-api](https://www.deepl.com/docs-api)

---

## Proximos Passos

- **Ver scripts disponiveis?** → [SCRIPTS.md](./SCRIPTS.md)
- **Como adicionar traducoes?** → [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md)
- **Voltar ao inicio?** → [INDEX.md](./INDEX.md)

---

Consistencia e mais importante que perfeicao.
