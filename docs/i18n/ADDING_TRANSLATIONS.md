# Adicionar Traducoes — Guia Completo

Passo a passo para adicionar novas traducoes, incluindo quando e como atualizar a tipagem TypeScript.

---

## Indice de Cenarios

1. [Adicionar chaves em arquivo existente](#cenario-1-adicionar-chaves-em-arquivo-existente) (SEM tipagem)
2. [Criar novo namespace](#cenario-2-criar-novo-namespace) (COM tipagem)
3. [Adicionar novo idioma](#cenario-3-adicionar-novo-idioma)

---

## Cenario 1: Adicionar Chaves em Arquivo Existente

**Quando:** Voce quer adicionar novas chaves em um JSON que ja existe (ex: novo campo em `contact.json`).

**Precisa mexer em tipagem?** NAO — TypeScript detecta automaticamente.

### Passo a Passo

#### 1. Edite o arquivo pt-BR

```json
// messages/pt-BR/contact.json
{
  "form": {
    "name": "Nome",
    "email": "E-mail",
    "message": "Mensagem",
    "phone": "Telefone" // ← NOVA CHAVE
  }
}
```

#### 2. Execute o script de traducao

```bash
pnpm translate
```

O script detecta a nova chave `phone` e traduz para en, es e de.

#### 3. Use no codigo

```tsx
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contact");

  return <input placeholder={t("form.phone")} />;
  // TypeScript autocompleta "form.phone" automaticamente!
}
```

#### 4. Valide

```bash
pnpm validate:i18n
pnpm check:pt-leaks
```

Pronto! Nenhuma configuracao de tipo necessaria.

---

## Cenario 2: Criar Novo Namespace

**Quando:** Voce quer criar um novo JSON (ex: `faqPage.json` para uma nova pagina).

**Precisa mexer em tipagem?** SIM — 4 arquivos precisam ser atualizados.

### Passo a Passo

#### 1. Crie o arquivo pt-BR

```json
// messages/pt-BR/faqPage.json
{
  "hero": {
    "title": "Perguntas Frequentes",
    "description": "Respostas para as duvidas mais comuns."
  },
  "items": [
    {
      "question": "Como funciona o i18n?",
      "answer": "Usamos next-intl com traducao automatica."
    }
  ]
}
```

#### 2. Registre no barrel export (index.ts)

```typescript
// messages/pt-BR/index.ts
import faqPage from "./faqPage.json"; // ← ADICIONAR

export default {
  // ... outros namespaces existentes
  faqPage, // ← ADICIONAR
};
```

O script `pnpm translate` sincroniza o index.ts para en, es, de automaticamente.

#### 3. Registre em load-messages.ts

```typescript
// src/lib/i18n/load-messages.ts
const NAMESPACES = [
  // ... existentes
  "faqPage", // ← ADICIONAR
] as const;
```

#### 4. Registre nos tipos TypeScript

```typescript
// src/lib/i18n/types.d.ts
import type faqPage from "../../../messages/pt-BR/faqPage.json"; // ← ADICIONAR

export type Messages = {
  // ... outros tipos existentes
  faqPage: typeof faqPage; // ← ADICIONAR
};
```

#### 5. Execute o script de traducao

```bash
pnpm translate
```

Isso cria `messages/en/faqPage.json`, `messages/es/faqPage.json` e `messages/de/faqPage.json`.

#### 6. Reinicie o TypeScript Server

```
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

#### 7. Use no codigo

```tsx
import { useTranslations } from "next-intl";
import type faqPage from "@/../messages/pt-BR/faqPage.json";

type FAQ = (typeof faqPage)["items"][number];

export function FAQPage() {
  const t = useTranslations("faqPage");

  return (
    <div>
      <h1>{t("hero.title")}</h1>
      <p>{t("hero.description")}</p>
      {(t.raw("items") as FAQ[]).map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
```

#### 8. Valide

```bash
pnpm validate:i18n
pnpm check:pt-leaks
```

---

## Cenario 3: Adicionar Novo Idioma

**Quando:** Voce quer suporte a um novo idioma (ex: frances, italiano).

### Opcao A: Usando Script (Recomendado)

```bash
pnpm add-locale -- fr
```

O script cria `messages/fr/` com a estrutura copiada de pt-BR.

### Passos apos o script

#### 1. Atualize a configuracao central

```typescript
// src/lib/i18n/config.ts
export const LOCALES_CONFIG = {
  "pt-BR": { name: "Portugues (Brasil)", code: "br" },
  en: { name: "English", code: "us" },
  de: { name: "Deutsch", code: "de" },
  es: { name: "Espanol", code: "es" },
  fr: { name: "Francais", code: "fr" }, // ← ADICIONAR
} as const;
```

#### 2. Gere as traducoes

```bash
pnpm translate
```

#### 3. Valide

```bash
pnpm validate:i18n
```

### Opcao B: Manual

```bash
# Criar pasta e copiar arquivos
mkdir messages/fr
cp messages/pt-BR/*.json messages/fr/
cp messages/pt-BR/index.ts messages/fr/

# Atualizar config.ts (passo 1 acima)
# Gerar traducoes
pnpm translate
```

---

## Resumo: Quando Mexer em Tipagem?

| Cenario                               | Tipagem? | Arquivos Afetados                              |
| ------------------------------------- | -------- | ---------------------------------------------- |
| Adicionar chaves em arquivo existente | NAO      | Nenhum                                         |
| Criar novo namespace (JSON)           | SIM      | `*/index.ts`, `load-messages.ts`, `types.d.ts` |
| Adicionar novo idioma                 | SIM      | `src/lib/i18n/config.ts`                       |

---

## Checklist Rapido

### Para Arquivo Existente

- [ ] Editei `messages/pt-BR/{arquivo}.json`
- [ ] Rodei `pnpm translate`
- [ ] Rodei `pnpm validate:i18n`
- [ ] Testei no codigo

### Para Novo Namespace

- [ ] Criei `messages/pt-BR/{novo}.json`
- [ ] Adicionei import/export em `messages/pt-BR/index.ts`
- [ ] Adicionei import/export em `messages/en/index.ts`
- [ ] Adicionei import/export em `messages/es/index.ts`
- [ ] Adicionei import/export em `messages/de/index.ts`
- [ ] Adicionei import type em `src/lib/i18n/types.d.ts`
- [ ] Adicionei no type `Messages` em `src/lib/i18n/types.d.ts`
- [ ] Rodei `pnpm translate`
- [ ] Reiniciei TypeScript Server
- [ ] Rodei `pnpm validate:i18n`
- [ ] Testei autocomplete no codigo

### Para Novo Idioma

- [ ] Rodei `pnpm add-locale -- {codigo}` (ou criei manualmente)
- [ ] Adicionei em `LOCALES_CONFIG` no `src/lib/i18n/config.ts`
- [ ] Rodei `pnpm translate`
- [ ] Rodei `pnpm validate:i18n`
- [ ] Testei troca de idioma no sistema

---

## Duvidas Frequentes

**Q: Esqueci de atualizar algum arquivo de tipagem, o que acontece?**
A: Autocomplete nao funcionara para o novo namespace. O codigo compila mas sem type safety.

**Q: Posso adicionar varios namespaces de uma vez?**
A: Sim! Faca todos os passos 1-3, depois rode `pnpm translate` uma unica vez.

**Q: Preciso reiniciar o servidor Next.js?**
A: Nao para arquivos existentes. Para novos namespaces, reinicie o TS Server.

---

## Proximos Passos

- **Ver scripts disponiveis?** → [SCRIPTS.md](./SCRIPTS.md)
- **Boas praticas?** → [BEST_PRACTICES.md](./BEST_PRACTICES.md)
- **Voltar ao inicio?** → [INDEX.md](./INDEX.md)
