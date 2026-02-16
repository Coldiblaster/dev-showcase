"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { useSectionInView } from "@/hooks/use-section-in-view";

/**
 * Seção de estrutura de arquivos.
 * 
 * Exibe a árvore de diretórios do projeto i18n.
 */
export function FileStructure() {
  const t = useTranslations("i18nPage");
  const { ref, isInView } = useSectionInView();

  const tree = `messages/
├── pt-BR/              # Fonte de verdade
│   ├── index.ts        # Barrel export
│   ├── auth.json       # Autenticacao
│   ├── global.json     # Acoes, status, navegacao
│   ├── components.json # UI compartilhados
│   ├── errors.json     # Mensagens de erro
│   ├── admin/
│   │   ├── index.ts
│   │   └── user-management.json
│   ├── consultor/
│   │   ├── index.ts
│   │   └── business-unit.json
│   └── cockpit/
│       ├── index.ts
│       └── dashboard.json
├── en/                 # Gerado automaticamente
└── es/                 # Gerado automaticamente

src/i18n/
├── config.ts           # Locales suportados
├── routing.ts          # Config next-intl
├── request.ts          # Resolver locale (cookie)
├── load-messages.ts    # Carregar JSONs
└── types.d.ts          # TypeScript autocomplete`;

  return (
    <section ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
            {t("structure.title")}
          </h2>
          <p className="text-muted-foreground">{t("structure.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <p className="mb-6 text-center leading-relaxed text-muted-foreground">
            {t("structure.description")}
          </p>
          <CodeBlock code={tree} title="Estrutura do projeto" />
        </motion.div>
      </div>
    </section>
  );
}
