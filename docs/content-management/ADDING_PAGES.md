# 📄 Como Adicionar Novas Páginas

Guia prático para adicionar páginas de **Dicas** ou **Implementações** no projeto.

---

## 🎯 O que você vai fazer

Criar uma nova página acessível via URL, tipo:
- `/dicas/sua-nova-pagina`
- `/implementacoes/sua-implementacao`

**Tempo estimado:** 15-20 minutos

---

## 📋 Passo a Passo

### **1️⃣ Adicionar no arquivo de conteúdo**

**Arquivo:** `src/data/content.ts`

**O que fazer:** Adicione um novo objeto no array `CONTENT_ITEMS`

```ts
{
  slug: "react-query-tips",              // ← URL: /dicas/react-query-tips
  title: "React Query Essencial",        // ← Título da página (SEO)
  description: "Cache, mutations...",    // ← Descrição (SEO)
  component: "ReactQueryPage",           // ← Nome do componente React
  category: "guide",                     // ← "guide" ou "implementation"
}
```

**Por quê?** Este arquivo é o "índice" de todas as páginas. O sistema lê daqui para saber quais páginas existem.

---

### **2️⃣ Criar o componente da página**

**Arquivo:** `src/components/react-query-page.tsx` (use o nome que quiser)

**O que fazer:** Crie um componente React com o conteúdo da página

```tsx
"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ReactQueryPage() {
  return (
    <div className="min-h-screen pt-20 px-6">
      {/* Botão voltar */}
      <Link href="/" className="inline-flex items-center gap-2 mb-8">
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>

      {/* Seu conteúdo aqui */}
      <h1 className="text-4xl font-bold mb-4">
        React Query Essencial
      </h1>
      <p className="text-muted-foreground">
        Seu conteúdo vai aqui...
      </p>
    </div>
  );
}
```

**Por quê?** Este é o conteúdo real que o usuário vai ver. Você pode copiar a estrutura de páginas existentes (ai-tips-page.tsx, tailwind-tips-page.tsx) como base.

**Dica:** Use componentes do shadcn/ui que já estão instalados: `Card`, `Badge`, `Button`, etc.

---

### **3️⃣ Registrar no helper**

**Arquivo:** `src/lib/dynamic-page-helper.tsx`

**O que fazer:** Importe e adicione seu componente no `COMPONENT_MAP`

```tsx
// No topo do arquivo
import { ReactQueryPage } from "@/components/react-query-page";

// Dentro do COMPONENT_MAP
const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  I18nShowcase,
  AITipsPage,
  TailwindTipsPage,
  ReactQueryPage,  // ← Adicione aqui
};
```

**Por quê?** O helper precisa saber qual componente renderizar quando o usuário acessar a URL. É como um "mapa" que conecta o slug (URL) ao componente React.

---

### **4️⃣ Adicionar no menu (opcional)**

**Arquivo:** `messages/pt-BR/nav.json`

**O que fazer:** Adicione as traduções do menu

```json
{
  "reactQueryTips": "React Query",
  "reactQueryTipsDesc": "Cache, mutations e otimização"
}
```
## Como adicionar uma nova página (feature)

1. Crie uma pasta em `src/features/<nome-da-feature>`
2. Separe os componentes, dados e testes:
  - `dev-resources-page.tsx` (container)
  - `live-components-section.tsx`, `code-snippets-section.tsx`, etc.
  - `data/` (dados mocks ou reais)
  - `__tests__/` (testes unitários)
3. Crie a rota em `src/app/<nome-da-feature>/page.tsx` importando o container
4. Prepare textos para i18n em `messages/`
5. Documente e teste

Exemplo:
- `src/app/dev-resources/page.tsx`
- `src/features/dev-resources/`
- `src/features/dev-resources/data/`
- `src/features/dev-resources/__tests__/`

**Arquivo:** `src/components/navbar.tsx`

**O que fazer:** Adicione o item no submenu

```tsx
// Importe o ícone
import { Database } from "lucide-react";

// Adicione no submenu "Tips & Guides"
<SubmenuItem
  icon={Database}
  label={t("reactQueryTips")}
  sublabel={t("reactQueryTipsDesc")}
  href="/dicas/react-query-tips"
  isActive={pathname === "/dicas/react-query-tips"}
/>
```

**Por quê?** Para o usuário conseguir acessar sua página pelo menu de navegação.

---

## ✅ Pronto! Teste sua página

1. Rode o projeto: `pnpm dev`
2. Acesse: `http://localhost:3000/dicas/react-query-tips`
3. Ou clique no menu: **Dicas & Guias** → **React Query**

---

## 🎨 Dicas de Estilo

### Use os componentes existentes:

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
```

### Copie estruturas prontas:

- **Hero section:** Veja `ai-tips-page.tsx` linha 90-150
- **Cards com animação:** Veja `tailwind-tips-page.tsx` linha 200-250
- **Code blocks:** Veja qualquer página de dicas

---

## 🐛 Problemas Comuns

### ❌ Erro: "Component not found"
**Solução:** Verifique se o nome do componente em `content.ts` é EXATAMENTE igual ao nome no `COMPONENT_MAP`

### ❌ Página não aparece no menu
**Solução:** Você esqueceu o passo 4. Adicione as traduções e o item no navbar.

### ❌ Erro 404
**Solução:** Verifique se o `slug` em `content.ts` está correto e se a `category` é "guide" ou "implementation"

---

## 📚 Estrutura de Arquivos

```
src/
├── data/
│   └── content.ts              ← 1. Adicione aqui
├── components/
│   └── sua-pagina.tsx          ← 2. Crie aqui
├── lib/
│   └── dynamic-page-helper.tsx ← 3. Registre aqui
└── app/
    ├── dicas/
    │   ├── page.tsx            ← Lista (não mexe)
    │   └── [slug]/
    │       └── page.tsx        ← Rota dinâmica (não mexe)
    └── implementacoes/
        ├── page.tsx            ← Lista (não mexe)
        └── [slug]/
            └── page.tsx        ← Rota dinâmica (não mexe)
```

**Você só mexe nos arquivos marcados com números!**

---

## 🚀 Próximos Passos

- Adicione traduções para outros idiomas (en, es, de)
- Rode `pnpm run translate` para gerar traduções automáticas
- Adicione mais conteúdo e seções na sua página
- Use animações com `framer-motion` (veja exemplos nas outras páginas)

---

## 💡 Exemplo Completo

Veja a página de React Query como referência:
- `src/data/content.ts` (linha 24-29)
- `src/components/react-query-page.tsx`
- `src/lib/dynamic-page-helper.tsx` (linha 18)
- `src/components/navbar.tsx` (linha 270-276)

---

**Dúvidas?** Consulte as páginas existentes ou pergunte no time! 🤝
