# Branch Protection — Configuracao no GitHub

Passo a passo para proteger a branch `main` no GitHub.

Essas regras garantem que nenhum codigo entre na main sem passar por PR, review e CI.

---

## Passo a Passo

### 1. Acesse as configuracoes

```
GitHub → Repo → Settings → Branches → Add branch protection rule
```

### 2. Configure a regra

**Branch name pattern:**

```
main
```

### 3. Marque as opcoes

| Opcao                                                              | Marcar?  | Por que                                                    |
| ------------------------------------------------------------------ | :------: | ---------------------------------------------------------- |
| **Require a pull request before merging**                          |   SIM    | Ninguem faz push direto na main                            |
| → Require approvals (1)                                            |   SIM    | Pelo menos 1 review antes do merge                         |
| → Dismiss stale pull request approvals when new commits are pushed |   SIM    | Novo push invalida approvals antigos                       |
| **Require status checks to pass before merging**                   |   SIM    | CI deve passar antes do merge                              |
| → Require branches to be up to date before merging                 |   SIM    | Branch precisa estar atualizada com main                   |
| **Status checks obrigatorios**                                     |    —     | Adicione estes (aparecem apos o primeiro push):            |
| → `Lint`                                                           |   SIM    | ESLint                                                     |
| → `Type Check`                                                     |   SIM    | TypeScript                                                 |
| → `Tests`                                                          |   SIM    | Vitest                                                     |
| → `Build`                                                          |   SIM    | Next.js build                                              |
| **Require conversation resolution before merging**                 |   SIM    | Comentarios de review devem ser resolvidos                 |
| **Do not allow bypassing the above settings**                      | OPCIONAL | Se marcar, nem admins podem pular (recomendado para times) |
| **Allow force pushes**                                             |   NAO    | Nunca force push na main                                   |
| **Allow deletions**                                                |   NAO    | Nao permitir deletar main                                  |

### 4. Salve

Clique em **Create** (ou **Save changes** se editando).

---

## Status Checks disponiveis

Apos o primeiro PR com CI rodando, os checks aparecem para selecionar:

| Check                   | Workflow   | O que valida                                            |
| ----------------------- | ---------- | ------------------------------------------------------- |
| `Lint`                  | `ci.yml`   | ESLint — erros de codigo                                |
| `Type Check`            | `ci.yml`   | TypeScript — erros de tipo                              |
| `Tests`                 | `ci.yml`   | Vitest — testes unitarios                               |
| `Build`                 | `ci.yml`   | Next.js build — build de producao                       |
| `Validate Translations` | `i18n.yml` | Sincronizacao de traducoes (so roda se messages/ mudar) |

**Importante:** Os checks so aparecem na lista depois que a CI roda pela primeira vez. Faca o primeiro PR, espere a CI rodar, e ai configure os status checks.

---

## Fluxo resultante

```
1. Cria branch (feature/minha-feature)
        ↓
2. Desenvolve e commita (Husky valida formato)
        ↓
3. Push e abre PR para main
        ↓
4. CI roda automaticamente (lint, typecheck, test, build)
        ↓
5. Alguem faz code review e aprova
        ↓
6. Todos os checks verdes + approved → merge liberado
        ↓
7. Merge na main → Vercel faz deploy automatico
```

---

## Para projetos solo

Se voce e o unico contribuidor, pode ajustar:

- **Require approvals:** pode desmarcar ou manter 0 approvals (ainda exige PR, so nao exige review de outra pessoa)
- **Do not allow bypassing:** pode desmarcar para poder fazer merge dos seus proprios PRs

O importante e manter a CI obrigatoria — isso garante que nada quebrado entra na main.

---

## Resumo

| Camada | Ferramenta         | Quando roda                                              |
| ------ | ------------------ | -------------------------------------------------------- |
| Local  | Husky + commitlint | A cada commit (formato da mensagem)                      |
| Local  | lint-staged        | A cada commit (ESLint + Prettier nos arquivos alterados) |
| CI     | GitHub Actions     | A cada push/PR (lint, typecheck, test, build)            |
| GitHub | Branch Protection  | Bloqueia merge sem PR + checks + review                  |
| Deploy | Vercel             | Deploy automatico apos merge na main                     |
