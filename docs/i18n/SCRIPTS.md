# Scripts — Referencia Completa

Documentacao de todos os scripts disponiveis para i18n.

---

## Lista de Scripts

| Script           | Comando                         | Tempo    | Quando usar                  |
| ---------------- | ------------------------------- | -------- | ---------------------------- |
| Traducao normal  | `pnpm translate`                | 1-3 min  | Traduzir novas chaves apenas |
| Traducao forcada | `pnpm translate:force`          | 5-10 min | Re-traduzir TUDO             |
| Validar sync     | `pnpm validate:i18n`            | 5 seg    | Antes de commit/PR           |
| Detectar PT      | `pnpm check:pt-leaks`           | 5 seg    | Validar qualidade            |
| Adicionar idioma | `pnpm add-locale -- {code}`     | 10 seg   | Novo idioma                  |

---

## 1. `pnpm translate`

### O que faz

Traduz automaticamente **apenas as chaves novas** de pt-BR para en, es e de.

### Como funciona

1. Le todos os JSONs em `messages/pt-BR/`
2. Compara com `messages/en/`, `messages/es/` e `messages/de/`
3. Identifica chaves que existem em pt-BR mas nao nos outros locales
4. Traduz apenas essas chaves via API (DeepL ou Google Cloud)
5. Preserva valores existentes (nao re-traduz)

### Quando usar

- Apos adicionar novas chaves em pt-BR
- Antes de commitar codigo
- Quando `validate:i18n` reporta chaves faltando
- **NAO use** quando quer corrigir traducoes ruins (use `translate:force`)

### Configuracao necessaria

```bash
# .env.local
DEEPL_API_KEY=seu_token_aqui
# ou
GOOGLE_CLOUD_API_KEY=seu_token_aqui
```

### Exemplo

```bash
# 1. Adicionou nova chave em messages/pt-BR/hero.json
# 2. Rode o script
pnpm translate

# 3. Resultado
# messages/en/hero.json atualizado
# messages/es/hero.json atualizado
# messages/de/hero.json atualizado
```

### Output esperado

```
Descobrindo arquivos JSON...
Encontrados 37 arquivos em messages/pt-BR/

Processando: hero.json
  → EN: 1 novas chaves traduzidas
  → ES: 1 novas chaves traduzidas
  → DE: 1 novas chaves traduzidas

Traducao concluida!
```

### Comportamento especial

- **PROTECTED_TERMS**: Palavras como nomes proprios nao sao traduzidas
- **Placeholders ICU**: `{variavel}` e preservado nas traducoes
- **Rate limiting**: 120ms de delay entre chamadas (evita erro 429)
- **Fallback**: Se DeepL falhar, tenta Google Cloud Translation

---

## 2. `pnpm translate:force`

### O que faz

Re-traduz **TODAS as chaves** de pt-BR para en, es e de, mesmo as que ja existem.

### Quando usar

- Quando encontrou traducoes ruins nos outros locales
- Quando `check:pt-leaks` reporta palavras em portugues
- Quando mudou texto em pt-BR e quer propagar para todos os idiomas
- **NAO use** frequentemente (demora e gasta quota da API)

### Exemplo

```bash
# Situacao: Encontrou "Voltar" em messages/en/global.json
pnpm check:pt-leaks
# actions.back: "Voltar" (contem: "voltar")

# Corrigir: re-traduz tudo
pnpm translate:force

# Validar
pnpm check:pt-leaks
# Nenhum problema encontrado
```

### Avisos

- **Demora mais**: Traduz tudo, nao so o novo
- **Gasta quota**: Cada chave conta na API
- **Sobrescreve**: Ajustes manuais em en/es/de serao perdidos

---

## 3. `pnpm validate:i18n`

### O que faz

Valida se **todos os locales tem as mesmas chaves**.

### Como funciona

1. Le `messages/pt-BR/` como referencia
2. Compara estrutura de chaves com `messages/en/`, `messages/es/` e `messages/de/`
3. Reporta chaves faltando ou extras

### Quando usar

- Antes de abrir PR
- Antes de fazer commit
- Apos adicionar traducoes manualmente
- Em pipeline de CI/CD

### Output com sucesso

```
Validacao concluida com sucesso!
Todos os locales estao sincronizados.
```

### Output com erro

```
Erros encontrados:

Locale: en
  Faltando em hero.json:
    - newBadge
    - newFeature

Locale: de
  Extra em nav.json:
    - oldKey (nao existe em pt-BR)
```

### Acao corretiva

```bash
# Se chaves faltando
pnpm translate

# Se chaves extras
pnpm translate:force
```

### Exit code

- `0` = Sucesso (use em CI/CD)
- `1` = Erro encontrado

---

## 4. `pnpm check:pt-leaks`

### O que faz

Detecta **palavras em portugues** em arquivos de traducao en/es/de.

### Como funciona

1. Define lista de palavras portuguesas comuns (voltar, adicionar, carregando, etc.)
2. Percorre todos os JSONs em `messages/en/`, `messages/es/` e `messages/de/`
3. Procura por essas palavras nos valores das chaves
4. Ignora palavras identicas em PT/ES (editar, cancelar, confirmar)
5. Reporta problemas encontrados

### Quando usar

- Apos `pnpm translate` (validar qualidade)
- Quando API de traducao falha silenciosamente
- Antes de fazer commit/PR
- Em pipeline de CI/CD

### Output com problemas

```
Verificando vazamento de portugues nas traducoes...

Verificando locale: en
  hero.json
    actions.back: "Voltar" (contem: "voltar")

Verificando locale: de
  contact.json
    form.submit: "Enviar" (contem: "enviar")

Total: 2 problemas encontrados
```

### Output limpo

```
Verificando vazamento de portugues nas traducoes...

Verificando locale: en
  Nenhum problema encontrado

Verificando locale: es
  Nenhum problema encontrado

Verificando locale: de
  Nenhum problema encontrado

Nenhum vazamento de portugues detectado!
```

### Acao corretiva

```bash
pnpm translate:force
pnpm check:pt-leaks
```

### Exit code

- `0` = Nenhum problema
- `1` = Problemas encontrados (bloqueia CI/CD)

---

## 5. `pnpm add-locale -- {code}`

### O que faz

Cria estrutura completa para um **novo idioma**.

### Como funciona

1. Cria pasta `messages/{code}/`
2. Copia todos os JSONs de `messages/pt-BR/`
3. Deixa valores vazios (traducao sera feita depois)
4. Copia `index.ts` mantendo estrutura

### Exemplo

```bash
# Adicionar frances
pnpm add-locale -- fr

# Adicionar italiano
pnpm add-locale -- it
```

### Proximos passos apos criar

1. Atualize `src/lib/i18n/config.ts` (adicione no `LOCALES_CONFIG`)
2. Rode `pnpm translate` para gerar traducoes
3. Rode `pnpm validate:i18n` para validar

Detalhes completos: [ADDING_TRANSLATIONS.md - Cenario 3](./ADDING_TRANSLATIONS.md#cenario-3-adicionar-novo-idioma)

---

## Workflow Recomendado

### Desenvolvimento Normal

```bash
# 1. Adicionar traducoes em pt-BR
# Edite messages/pt-BR/hero.json

# 2. Gerar traducoes
pnpm translate

# 3. Validar qualidade
pnpm check:pt-leaks

# 4. Validar sincronizacao
pnpm validate:i18n

# 5. Commit
git add messages/
git commit -m "feat: adiciona traducao X"
```

### Corrigir Traducoes Ruins

```bash
pnpm check:pt-leaks        # 1. Detectar problemas
pnpm translate:force        # 2. Re-traduzir tudo
pnpm check:pt-leaks        # 3. Validar correcao
```

### Adicionar Novo Idioma

```bash
pnpm add-locale -- fr       # 1. Criar estrutura
# Edite src/lib/i18n/config.ts  # 2. Configurar
pnpm translate              # 3. Gerar traducoes
pnpm validate:i18n          # 4. Validar
```

---

## Configuracao das APIs

### DeepL (Recomendado)

```bash
# .env.local
DEEPL_API_KEY=your-api-key-here
```

- Melhor qualidade, mais contexto
- 500k caracteres/mes (plano free)
- Rate limit: 5 req/seg (script ja controla)

### Google Cloud Translation

```bash
# .env.local
GOOGLE_CLOUD_API_KEY=your-api-key-here
```

- Mais quota, suporte a mais idiomas
- Qualidade inferior ao DeepL
- Rate limit: script usa 120ms de delay

### Fallback

Se DeepL nao estiver configurado ou falhar, o script tenta Google Cloud Translation. Se ambos falharem, mostra erro e para.

---

## Performance

| Script          | Arquivos     | Tempo Estimado |
| --------------- | ------------ | -------------- |
| translate       | 37 arquivos  | ~2 min         |
| translate:force | 37 arquivos  | ~8 min         |
| validate:i18n   | 148 arquivos | ~3 seg         |
| check:pt-leaks  | 111 arquivos | ~2 seg         |
| add-locale      | 37 arquivos  | ~1 seg         |

Tempo de `translate` varia com o numero de chaves novas e a API usada.

---

## Proximos Passos

- **Como adicionar traducoes?** → [ADDING_TRANSLATIONS.md](./ADDING_TRANSLATIONS.md)
- **Boas praticas?** → [BEST_PRACTICES.md](./BEST_PRACTICES.md)
- **Voltar ao inicio?** → [INDEX.md](./INDEX.md)
