
# Next.js i18n Starter

Starter Next.js com internacionalização (i18n) tipada, usando [next-intl](https://next-intl.dev/), pensado para ser aplicado em projetos reais e ambientes de produção.

Ideal para times que buscam produtividade, segurança de tipos e automação de traduções desde o início do projeto até o deploy.

## ✨ Por que usar?

- **Internacionalização pronta para produção** com TypeScript e autocomplete.
- **Scripts automáticos** para adicionar idiomas, validar e traduzir chaves.
- **Organização por namespaces** (ex: global, auth, admin) e módulos.
- **Zero textos hardcoded**: tudo via arquivos de tradução.
- **Fácil de escalar** para múltiplos idiomas e times.

## 🚀 Como rodar

```bash
pnpm install
pnpm dev
# Acesse http://localhost:3000
```

## 🌍 Como adicionar traduções

- **Nova chave em arquivo existente:**  
  Edite o JSON em `messages/pt-BR/` e rode:
  ```bash
  pnpm run translate
  ```

- **Novo arquivo global ou módulo:**  
  1. Crie o JSON em `messages/pt-BR/`
  2. Atualize `messages/pt-BR/index.ts` e `src/lib/i18n/types.d.ts`
  3. Adicione no array `NAMESPACES` em `src/lib/i18n/load-messages.ts`
  4. Rode:
     ```bash
     pnpm run translate
     ```

- **Novo idioma:**  
  ```bash
  pnpm run add-locale -- de
  pnpm run translate
  ```

- **Validação:**  
  ```bash
  pnpm run validate:i18n
  pnpm run check:pt-leaks
  ```

## 🧑‍💻 Exemplo de uso

```tsx
import { useTranslations } from "next-intl";
const t = useTranslations("global");
return <button>{t("actions.save")}</button>;
```

## 💡 Ideia do projeto

Este starter nasceu para acelerar projetos Next.js multi-idiomas, garantir qualidade de tradução e evitar bugs de i18n, com máxima produtividade para devs de todos os níveis.

> Para detalhes avançados, veja a pasta `/docs/i18n`.
