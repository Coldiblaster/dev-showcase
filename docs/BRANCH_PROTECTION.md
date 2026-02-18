# Branch Protection — Configuracao no GitHub

Guia para proteger as branches `develop` e `main` no GitHub.

---

## Git Flow do projeto

```
feature/nome ──→ PR ──→ develop ──→ auto-PR ──→ main ──→ Vercel deploy
                         (CI roda)                (CI roda)
```

- **feature → develop:** PR obrigatorio com CI + review
- **develop → main:** PR criado automaticamente pela CI. Voce so revisa e aprova
- **feature → main:** BLOQUEADO (nao permitido)
- **Push direto em develop ou main:** BLOQUEADO

---

## Configuracao: branch `develop`

**Settings → Branches → Add rule** — pattern: `develop`

| Opcao                                                   | Marcar? | Por que                            |
| ------------------------------------------------------- | :-----: | ---------------------------------- |
| **Require a pull request before merging**               |   SIM   | Features entram via PR             |
| → Require approvals (1)                                 |   SIM   | Pelo menos 1 review                |
| → Dismiss stale approvals on new pushes                 |   SIM   | Novo push invalida approval antigo |
| **Require status checks to pass**                       |   SIM   | CI deve passar                     |
| → Require branches to be up to date                     |   SIM   | Branch atualizada com develop      |
| → Status checks: `Lint`, `Type Check`, `Tests`, `Build` |   SIM   | Todos obrigatorios                 |
| **Require conversation resolution**                     |   SIM   | Comentarios resolvidos             |
| **Allow force pushes**                                  |   NAO   | Nunca                              |
| **Allow deletions**                                     |   NAO   | Nunca                              |

---

## Configuracao: branch `main`

**Settings → Branches → Add rule** — pattern: `main`

| Opcao                                                   | Marcar?  | Por que                             |
| ------------------------------------------------------- | :------: | ----------------------------------- |
| **Require a pull request before merging**               |   SIM    | Nada entra direto                   |
| → Require approvals (1)                                 |   SIM    | Review antes de ir pra producao     |
| → Dismiss stale approvals on new pushes                 |   SIM    | Seguranca extra                     |
| **Require status checks to pass**                       |   SIM    | CI roda novamente na PR             |
| → Require branches to be up to date                     |   SIM    | Sem conflitos                       |
| → Status checks: `Lint`, `Type Check`, `Tests`, `Build` |   SIM    | Todos obrigatorios                  |
| **Require conversation resolution**                     |   SIM    | Tudo resolvido                      |
| **Restrict who can push to matching branches**          | OPCIONAL | Se quiser limitar quem pode mergear |
| **Allow force pushes**                                  |   NAO    | Nunca                               |
| **Allow deletions**                                     |   NAO    | Nunca                               |

---

## Status Checks disponiveis

| Check                   | Workflow   | Roda quando                    |
| ----------------------- | ---------- | ------------------------------ |
| `Lint`                  | `ci.yml`   | PR para develop ou main        |
| `Type Check`            | `ci.yml`   | PR para develop ou main        |
| `Tests`                 | `ci.yml`   | PR para develop ou main        |
| `Build`                 | `ci.yml`   | PR para develop ou main        |
| `Validate Translations` | `i18n.yml` | PR com mudancas em `messages/` |

**Os checks so aparecem na lista depois que a CI roda pela primeira vez.** Faca o primeiro PR, espere rodar, depois configure.

---

## Release automatica (develop → main)

O workflow `release.yml` cria automaticamente um PR de `develop → main` toda vez que a develop recebe um merge.

**Como funciona:**

1. Voce mergeia um feature PR na `develop`
2. A CI cria (ou atualiza) um PR `develop → main` com a lista de commits
3. A CI roda no PR de release (lint, typecheck, test, build)
4. Voce revisa e aprova quando quiser fazer deploy
5. Merge → Vercel faz deploy automatico

Se ja existir um PR aberto de release, ele e atualizado (nao cria duplicado).

---

## Para projetos solo

Se voce e o unico contribuidor:

- **Approvals:** pode setar 0 (ainda exige PR, so nao exige review de outra pessoa)
- **Bypassing:** pode permitir para voce mesmo nos PRs de release (develop → main)

O importante e manter CI obrigatoria e fluxo via PR.

---

## Resumo das camadas

| Camada | Ferramenta         | Quando                                            |
| ------ | ------------------ | ------------------------------------------------- |
| Local  | Husky + commitlint | Commit — valida formato (feat, fix, etc.)         |
| Local  | lint-staged        | Commit — ESLint + Prettier nos arquivos alterados |
| CI     | GitHub Actions     | PR — lint, typecheck, test, build                 |
| CI     | GitHub Actions     | PR — validacao i18n (se messages/ mudar)          |
| CI     | GitHub Actions     | Push na develop — cria PR automatico para main    |
| GitHub | Branch Protection  | Bloqueia merge sem PR + checks + review           |
| Deploy | Vercel             | Deploy automatico apos merge na main              |
