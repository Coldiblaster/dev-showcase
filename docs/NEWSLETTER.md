# Newsletter — Fluxo Completo

> Inscritos salvos no Redis. Disparo manual via curl com conteúdo gerado do changelog.

---

## Fluxo

1. **Inscrição** — Usuário preenche email no footer → salvo em Redis (`newsletter:subscribers`) + você recebe notificação
2. **Disparo** — Você executa o curl quando tiver novidade → envia para todos os inscritos com o último changelog

---

## Configuração

### 1. Variáveis de ambiente (.env.local)

```bash
# Já existentes (contato + newsletter)
RESEND_API_KEY=re_xxxx
RESEND_TO_EMAIL=seu@email.com

# Opcional: domínio verificado no Resend (sem isso = 100 emails/dia com onboarding@resend.dev)
RESEND_FROM_EMAIL=Portfolio VB <newsletter@seudominio.com>

# Obrigatório para broadcast: token secreto
NEWSLETTER_BROADCAST_TOKEN=seu_token_secreto_aqui
```

### 2. Gerar o token

```bash
openssl rand -hex 32
```

Copie o resultado e coloque em `NEWSLETTER_BROADCAST_TOKEN`.

### 3. Resend (resend.com)

- **Domínio:** Se quiser enviar de `@seudominio.com`, verifique o domínio no Resend (DNS)
- **Sem domínio:** Funciona com `onboarding@resend.dev` (limite 100 emails/dia no free tier)
- **Redis:** Inscritos ficam em Upstash Redis (já configurado para contador, reações, etc.)

---

## Disparar newsletter

Quando tiver atualizado o changelog e quiser avisar os inscritos:

**Opção 1 — Script interativo (recomendado):**

```bash
npm run newsletter:broadcast
```

O script pergunta: local ou web? Depois pede o token e dispara.

**Opção 2 — curl manual:**

```bash
curl -X POST https://viniciusbastazin.vercel.app/api/newsletter/broadcast \
  -H "Authorization: Bearer SEU_TOKEN"
```

Ou em localhost (teste):

```bash
curl -X POST http://localhost:3000/api/newsletter/broadcast \
  -H "Authorization: Bearer SEU_TOKEN"
```

**Resposta de sucesso:**

```json
{
  "success": true,
  "sent": 12,
  "total": 12
}
```

---

## Conteúdo do email

O email é gerado automaticamente a partir do **primeiro item do changelog** (`CHANGELOG[0]`):

- Título
- Versão e data
- Resumo
- Até 5 itens da lista
- Botão "Ver todas as novidades" → `/novidades`

---

## Segurança

- O endpoint `/api/newsletter/broadcast` **só aceita** requisições com `Authorization: Bearer TOKEN` correto
- Sem token ou token errado → 401 Unauthorized
- Nunca exponha `NEWSLETTER_BROADCAST_TOKEN` no cliente (não use `NEXT_PUBLIC_`)
