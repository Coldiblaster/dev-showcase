export const FILE_STRUCTURE_TREE = `messages/
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

/**
 * Returns the .env.local example with the translated "get key" message.
 * The getKey param should be the result of t("getKey") for i18n support.
 */
export const ENV_EXAMPLE = (
  getKey: string,
): string => `# ${getKey} https://www.deepl.com/pt-BR/pro-api
DEEPL_API_KEY=sua_chave_aqui

# Alternativa: Google Cloud Translation
# GOOGLE_CLOUD_API_KEY=sua_chave_aqui`;
