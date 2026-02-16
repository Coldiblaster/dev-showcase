# 🔧 Scripts - Referência Completa

Documentação detalhada de todos os scripts disponíveis para i18n.

---

## 📋 Lista de Scripts

| Script                | Comando                         | Tempo    | Quando usar                  |
| --------------------- | ------------------------------- | -------- | ---------------------------- |
| Tradução normal       | `pnpm run translate`            | 1-3 min  | Traduzir novas chaves apenas |
| Tradução forçada      | `pnpm run translate:force`      | 5-10 min | Re-traduzir TUDO             |
| Validar sincronização | `pnpm run validate:i18n`        | 5 seg    | Antes de commit/PR           |
| Detectar português    | `pnpm run check:pt-leaks`       | 5 seg    | Validar qualidade            |
| Adicionar idioma      | `pnpm run add-locale -- {code}` | 10 seg   | Novo idioma                  |

---

## 1️⃣ `pnpm run translate`

### O que faz

Traduz automaticamente **apenas as chaves novas** de pt-BR para en/es.

### Como funciona

1. Lê todos os arquivos JSON em `messages/pt-BR/` (recursivamente)
2. Compara com `messages/en/` e `messages/es/`
3. Identifica chaves que existem em pt-BR mas não em en/es
4. Traduz apenas essas chaves via API (DeepL ou Google Cloud)
5. Preserva valores existentes (não re-traduz)

### Quando usar

- ✅ Após adicionar novas chaves em pt-BR
- ✅ Antes de commitar código
- ✅ Quando `validate:i18n` reporta chaves faltando
- ❌ **NÃO use** quando quer corrigir traduções ruins (use `translate:force`)

### Configuração necessária

```bash
# .env.local
DEEPL_API_KEY=seu_token_aqui
# ou
GOOGLE_CLOUD_API_KEY=seu_token_aqui
```

### Exemplo de uso

```bash
# 1. Adicionou nova chave em pt-BR
echo '{"newKey": "Novo texto"}' >> messages/pt-BR/global.json

# 2. Roda o script
pnpm run translate

# 3. Resultado
# ✅ messages/en/global.json criado/atualizado
# ✅ messages/es/global.json criado/atualizado
```

### Output esperado

```
🔍 Descobrindo arquivos JSON...
📁 Encontrados 15 arquivos em messages/pt-BR/

📝 Processando: global.json
  → EN: 1 novas chaves traduzidas
  → ES: 1 novas chaves traduzidas

✅ Tradução concluída!
```

### Comportamento especial

- **PROTECTED_TERMS**: Palavras como "Safer" e "Cockpit" não são traduzidas
- **Placeholders ICU**: `{variavel}` é preservado nas traduções
- **Rate limiting**: 120ms de delay entre chamadas (evita erro 429)
- **Fallback**: Se DeepL falhar, tenta Google Cloud Translation

---

## 2️⃣ `pnpm run translate:force`

### O que faz

Re-traduz **TODAS as chaves** de pt-BR para en/es, mesmo as que já existem.

### Como funciona

Igual ao `translate`, mas ignora valores existentes e re-traduz tudo do zero.

### Quando usar

- ✅ Quando encontrou traduções ruins em en/es
- ✅ Quando `check:pt-leaks` reporta palavras em português
- ✅ Quando mudou texto em pt-BR e quer propagar para outros idiomas
- ✅ Após atualizar PROTECTED_TERMS no script
- ❌ **NÃO use** frequentemente (demora e gasta quota da API)

### Exemplo de uso

```bash
# Situação: Encontrou "Voltar" em messages/en/global.json
pnpm run check:pt-leaks
# ❌ actions.back: "Voltar" (contém: "voltar")

# Opção 1: Force re-tradução (recomendado)
pnpm run translate:force

# Opção 2: Correção manual (se souber a tradução correta)
# Edite messages/pt-BR/global.json para melhorar o contexto
# "back": "Voltar" → "back": "Voltar para a página anterior"
# Depois rode: pnpm run translate

# Valida se corrigiu
pnpm run check:pt-leaks
# ✅ Nenhum problema encontrado
```

### Configuração

Mesma do `translate` (precisa de DEEPL_API_KEY ou GOOGLE_CLOUD_API_KEY).

### Diferença visual

```bash
# translate (normal)
📝 Processando: global.json
  → EN: 3 novas chaves traduzidas (15 preservadas)

# translate:force
📝 Processando: global.json (FORCE MODE)
  → EN: 18 chaves RE-TRADUZIDAS
```

### ⚠️ Avisos

- **Demora mais**: Traduz tudo, não só o novo
- **Gasta quota**: Cada chave conta na API
- **Pode sobrescrever**: Se você fez ajustes manuais em en/es, serão perdidos

---

## 3️⃣ `pnpm run validate:i18n`

### O que faz

Valida se **todos os locales têm as mesmas chaves**.

### Como funciona

1. Lê `messages/pt-BR/` como referência
2. Compara estrutura de chaves com `messages/en/` e `messages/es/`
3. Reporta chaves faltando ou extras

### Quando usar

- ✅ Antes de abrir PR
- ✅ Antes de fazer commit
- ✅ Após adicionar traduções manualmente
- ✅ Em pipeline de CI/CD
- ✅ Quando suspeita de dessincronia

### Exemplo de uso

```bash
pnpm run validate:i18n
```

### Output com sucesso

```
✅ Validação concluída com sucesso!
Todos os locales estão sincronizados.
```

### Output com erro

```
❌ Erros encontrados:

Locale: en
  Faltando em global.json:
    - actions.export
    - actions.print

Locale: es
  Extra em auth.json:
    - login.oldKey (não existe em pt-BR)
```

### Ação corretiva

```bash
# Se chaves faltando
pnpm run translate

# Se chaves extras (remova manualmente ou re-traduza)
pnpm run translate:force
```

### Exit code

- `0` = Sucesso (use em CI/CD)
- `1` = Erro encontrado

---

## 4️⃣ `pnpm run check:pt-leaks`

### O que faz

Detecta **palavras em português** em arquivos de tradução EN/ES.

### Como funciona

1. Define lista de palavras portuguesas comuns (voltar, adicionar, carregando, etc.)
2. Percorre todos os arquivos em `messages/en/` e `messages/es/`
3. Procura por essas palavras nos valores das chaves
4. Ignora palavras idênticas em PT/ES (editar, cancelar, confirmar)
5. Reporta problemas encontrados

### Quando usar

- ✅ Após `pnpm run translate` (validar qualidade)
- ✅ Quando API de tradução falha silenciosamente
- ✅ Antes de fazer commit/PR
- ✅ Em pipeline de CI/CD
- ✅ Quando usuários reportam textos em português no sistema em inglês

### Exemplo de uso

```bash
pnpm run check:pt-leaks
```

### Output com problemas

```
🔍 Verificando vazamento de português nas traduções...

📁 Verificando locale: en
  📄 global.json
    ❌ actions.back: "Voltar" (contém: "voltar")
    ❌ actions.remove: "Remover" (contém: "remover")
  📄 cockpit/dashboard.json
    ❌ categories.malwareControl: "Controle de malware" (contém: "controle")

📁 Verificando locale: es
  📄 global.json
    ❌ status.loading: "Carregando" (contém: "carregando")

⚠️  Total: 4 problemas encontrados
```

### Output sem problemas

```
🔍 Verificando vazamento de português nas traduções...

📁 Verificando locale: en
  ✅ Nenhum problema encontrado

📁 Verificando locale: es
  ✅ Nenhum problema encontrado

✅ Nenhum vazamento de português detectado!
```

### Ação corretiva

```bash
# Re-traduza tudo para corrigir
pnpm run translate:force

# Valide novamente
pnpm run check:pt-leaks
```

### Palavras detectadas

```typescript
const PT_WORDS = [
  "voltar",
  "adicionar",
  "editar",
  "remover",
  "deletar",
  "salvar",
  "cancelar",
  "confirmar",
  "fechar",
  "abrir",
  "buscar",
  "pesquisar",
  "filtrar",
  "exportar",
  "importar",
  "carregando",
  "processando",
  "aguarde",
  "erro",
  "sucesso",
  "atenção",
  "aviso",
  "informação",
  "detalhes",
  "visualizar",
];
```

### Exceções PT/ES

Palavras idênticas em PT e ES não são reportadas para ES:

```typescript
const PT_ES_IDENTICAL = [
  "editar",
  "cancelar",
  "confirmar",
  "filtrar",
  "importar",
  "exportar",
  "versão",
  "estado",
  "perfil",
];
```

### Exit code

- `0` = Nenhum problema
- `1` = Problemas encontrados (bloqueia CI/CD)

---

## 5️⃣ `pnpm run add-locale -- {code}`

### O que faz

Cria estrutura completa para um **novo idioma**.

### Como funciona

1. Cria pasta `messages/{code}/`
2. Copia todos os arquivos JSON de `messages/pt-BR/`
3. Deixa valores vazios (tradução será feita depois)
4. Copia todos os `index.ts` mantendo estrutura

### Quando usar

- ✅ Adicionar suporte a alemão, francês, italiano, etc.
- ✅ Criar locale customizado (ex: pt-PT para Portugal)
- ❌ **NÃO use** para idiomas já existentes (en, es, pt-BR)

### Exemplo de uso

```bash
# Adicionar alemão
pnpm run add-locale -- de

# Adicionar francês
pnpm run add-locale -- fr

# Adicionar italiano
pnpm run add-locale -- it
```

### O que é criado

```
messages/
└── de/                    # Novo idioma
    ├── auth.json          # Estrutura copiada, valores vazios
    ├── global.json
    ├── index.ts           # Exports mantidos
    ├── admin/
    │   ├── index.ts
    │   └── user-management.json
    └── cockpit/
        ├── index.ts
        └── dashboard.json
```

### Próximos passos

Após criar o locale, você precisa:

1. **Configurar o sistema**

```typescript
// src/i18n/config.ts
export const SUPPORTED_LOCALES = [
  "pt-BR",
  "en",
  "es",
  "de", // ← ADICIONAR
] as const;
```

2. **Adicionar no LanguageSwitcher**

```typescript
// src/shared/components/language-switcher.tsx
const LOCALES_CONFIG = {
  "pt-BR": { label: "Português (BR)", flag: "🇧🇷" },
  en: { label: "English (US)", flag: "🇺🇸" },
  es: { label: "Español (ES)", flag: "🇪🇸" },
  de: { label: "Deutsch (DE)", flag: "🇩🇪" }, // ← ADICIONAR
} as const;
```

3. **Gerar traduções**

```bash
pnpm run translate
```

4. **Validar**

```bash
pnpm run validate:i18n
```

### ⚠️ Limitações

O script **NÃO atualiza automaticamente**:

- `src/i18n/config.ts`
- `src/shared/components/language-switcher.tsx`

Você precisa fazer isso manualmente (veja [ADDING_TRANSLATIONS.md - Cenário 4](./ADDING_TRANSLATIONS.md#-cenário-4-adicionar-novo-idioma)).

---

## 🔄 Workflow Recomendado

### Desenvolvimento Normal

```bash
# 1. Adicionar traduções em pt-BR
vim messages/pt-BR/global.json

# 2. Gerar traduções
pnpm run translate

# 3. Validar qualidade
pnpm run check:pt-leaks

# 4. Validar sincronização
pnpm run validate:i18n

# 5. Commit
git add messages/
git commit -m "feat: adiciona tradução X"
```

### Corrigir Traduções Ruins

```bash
# 1. Detectar problemas
pnpm run check:pt-leaks

# 2. Re-traduzir tudo
pnpm run translate:force

# 3. Validar correção
pnpm run check:pt-leaks

# 4. Commit
git add messages/
git commit -m "fix: corrige traduções com português"
```

### Adicionar Novo Idioma

```bash
# 1. Criar estrutura
pnpm run add-locale -- de

# 2. Configurar sistema (manual)
vim src/i18n/config.ts
vim src/shared/components/language-switcher.tsx

# 3. Gerar traduções
pnpm run translate

# 4. Validar
pnpm run validate:i18n

# 5. Commit
git add messages/ src/i18n/ src/shared/components/
git commit -m "feat: adiciona suporte a alemão"
```

---

## 🛠️ Configuração das APIs

### DeepL (Recomendado)

```bash
# .env.local
DEEPL_API_KEY=your-api-key-here
```

- **Vantagens**: Melhor qualidade, mais contexto
- **Limitações**: 500k caracteres/mês (plano free)
- **Rate limit**: 5 requisições/segundo (script já controla)

### Google Cloud Translation

```bash
# .env.local
GOOGLE_CLOUD_API_KEY=your-api-key-here
```

- **Vantagens**: Mais quota, suporte a mais idiomas
- **Limitações**: Qualidade inferior ao DeepL
- **Rate limit**: Script usa 120ms de delay

### Fallback

Se DeepL não estiver configurado ou falhar:

1. Script tenta Google Cloud Translation
2. Se ambos falharem, mostra erro e para

---

## 📊 Performance

| Script          | Arquivos    | Chaves          | Tempo Estimado |
| --------------- | ----------- | --------------- | -------------- |
| translate       | 15 arquivos | 50 novas chaves | ~2 min         |
| translate:force | 15 arquivos | 500 chaves      | ~8 min         |
| validate:i18n   | 45 arquivos | -               | ~3 seg         |
| check:pt-leaks  | 30 arquivos | -               | ~2 seg         |
| add-locale      | 15 arquivos | -               | ~1 seg         |

**Nota**: Tempo de `translate` varia com:

- Número de chaves novas
- API usada (DeepL é mais rápida)
- Rate limiting (120ms entre cada chave)

---

## 🔗 Próximos Passos

- **Como adicionar traduções?** → [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md)
- **Boas práticas?** → [BEST_PRACTICES.md](./BEST_PRACTICES.md)
- **Voltar ao início?** → [INDEX.md](./INDEX.md)

---

**Dica:** Adicione esses scripts no seu pre-commit hook! 🚀
