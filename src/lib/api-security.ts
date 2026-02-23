/**
 * Utilitários de segurança compartilhados para API routes.
 *
 * Centraliza sanitização de input/output, validação de body,
 * headers seguros e proteção contra prompt injection.
 * Usado por /api/code-review e /api/chat.
 */

// ---------------------------------------------------------------------------
// Constantes
// ---------------------------------------------------------------------------

/** Locales válidos — qualquer outro valor cai no fallback ("en"). */
export const ALLOWED_LOCALES = new Set(["pt-BR", "en", "es", "de"]);

/** Tamanho máximo padrão de body em bytes. */
export const DEFAULT_MAX_BODY_SIZE = 12_000;

// ---------------------------------------------------------------------------
// Headers seguros
// ---------------------------------------------------------------------------

/** Headers de segurança para respostas JSON. */
export function secureJsonHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "no-store, no-cache, must-revalidate",
  };
}

/** Headers de segurança para respostas de streaming (text/plain). */
export function secureStreamHeaders(): HeadersInit {
  return {
    "Content-Type": "text/plain; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "no-cache",
  };
}

// ---------------------------------------------------------------------------
// Respostas padronizadas
// ---------------------------------------------------------------------------

/** Retorna Response JSON com status e headers seguros. */
export function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: secureJsonHeaders(),
  });
}

// ---------------------------------------------------------------------------
// Validação de body size
// ---------------------------------------------------------------------------

/** Verifica se o Content-Length excede o limite. Retorna Response 413 ou null se OK. */
export function checkBodySize(
  request: Request,
  maxSize = DEFAULT_MAX_BODY_SIZE,
): Response | null {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > maxSize) {
    return jsonError("Payload too large", 413);
  }
  return null;
}

// ---------------------------------------------------------------------------
// Parse seguro de JSON body
// ---------------------------------------------------------------------------

/** Faz parse seguro do body JSON. Retorna o objeto ou uma Response de erro. */
export async function safeParseBody(
  request: Request,
): Promise<{ data: unknown } | { error: Response }> {
  try {
    const data: unknown = await request.json();
    return { data };
  } catch {
    return { error: jsonError("Invalid JSON body", 400) };
  }
}

// ---------------------------------------------------------------------------
// Sanitização de input (prompt injection)
// ---------------------------------------------------------------------------

/**
 * Remove padrões de prompt injection / jailbreak do texto do usuário.
 * Aplica múltiplas camadas de defesa sem alterar a semântica legítima do conteúdo.
 *
 * Cobre: instruction override, role switching, DAN-style, leak de system prompt,
 * markdown role fences, Unicode lookalikes e caracteres de controle.
 */
export function sanitizeUserInput(text: string): string {
  // 1. Normaliza Unicode para evitar variantes visuais (ÏGnore → Ignore)
  const normalized = text.normalize("NFKC");

  return (
    normalized
      // 2. Strip caracteres de controle (exceto \n, \r, \t) para evitar hidden payloads
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")

      // 3. Instruction override clássico
      .replace(
        /\b(ignore|disregard|forget|override|bypass|circumvent)\b[\s\S]{0,40}\b(previous|above|all|prior|system|the|any)\b[\s\S]{0,40}\b(instructions?|rules?|prompt|constraints?|guidelines?)\b/gi,
        "[filtered]",
      )

      // 4. Role switching / identity injection
      .replace(
        /\b(you are now|from now on|starting now|henceforth|act as|pretend (to be|you are)|roleplay as|your new (role|identity|task|instructions?))\b/gi,
        "[filtered]",
      )

      // 5. DAN / jailbreak patterns
      .replace(
        /\b(do anything now|DAN mode|jailbreak|developer mode|god mode|unrestricted mode|no\s*filter mode)\b/gi,
        "[filtered]",
      )

      // 6. System/Assistant/User role markers (markdown-style fences or raw)
      .replace(/```\s*(system|assistant|user)\b/gi, "``` [filtered]")
      .replace(/\[\s*(system|assistant|user)\s*\]/gi, "[filtered]")
      .replace(/\bsystem\s*:\s*/gi, "[filtered]")
      .replace(/\bassistant\s*:\s*/gi, "[filtered]")

      // 7. Tentativa de extrair system prompt
      .replace(
        /\b(reveal|show|print|output|repeat|display|tell me|what (is|are)|expose)\b[\s\S]{0,40}\b(system\s*prompt|instructions?|configuration|context|rules?|guidelines?)\b/gi,
        "[filtered]",
      )

      // 8. "New task/instruction" injection
      .replace(
        /\b(new (task|instruction|objective|goal|command)|stop (being|acting)|wait[,.]? actually|actually[,.]? (you|your))\b/gi,
        "[filtered]",
      )

      // 9. Conversão de contexto (tentar mudar o escopo da IA)
      .replace(
        /\b(instead[,.]? (of|now)|forget (the|that|your|all)|from this (point|moment))\b/gi,
        "[filtered]",
      )

      // 10. XML/HTML tag injection que poderia ser confundido com delimitadores do prompt
      .replace(
        /<\s*(system|assistant|user|prompt|instruction)\b[^>]*>/gi,
        "[filtered]",
      )
      .replace(
        /<\/\s*(system|assistant|user|prompt|instruction)\s*>/gi,
        "[filtered]",
      )
  );
}

// ---------------------------------------------------------------------------
// Sanitização de output (XSS)
// ---------------------------------------------------------------------------

/** Remove tags HTML, javascript: URIs e event handlers inline de uma string. */
export function sanitizeText(text: string): string {
  return text
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/javascript:/gi, "")
    .replace(/data:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
}

/** Sanitiza recursivamente todas as strings de um objeto/array. */
export function sanitizeOutput<T>(obj: T): T {
  if (typeof obj === "string") return sanitizeText(obj) as T;
  if (Array.isArray(obj)) return obj.map(sanitizeOutput) as T;
  if (obj && typeof obj === "object") {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeOutput(value);
    }
    return sanitized as T;
  }
  return obj;
}

// ---------------------------------------------------------------------------
// Sanitização de streaming output
// ---------------------------------------------------------------------------

/** Sanitiza um chunk de texto streamed antes de enviar ao client. */
export function sanitizeStreamChunk(text: string): string {
  return text
    .replace(/<script\b[^>]*>/gi, "")
    .replace(/<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "");
}

// ---------------------------------------------------------------------------
// Validação de locale
// ---------------------------------------------------------------------------

/** Retorna o locale se válido, senão fallback para "en". */
export function safeLocale(locale: string | undefined): string {
  return ALLOWED_LOCALES.has(locale ?? "") ? locale! : "en";
}

// ---------------------------------------------------------------------------
// Verificação de API key
// ---------------------------------------------------------------------------

/** Verifica se a OPENAI_API_KEY está configurada. Retorna Response 503 ou null se OK. */
export function checkApiKey(): Response | null {
  if (!process.env.OPENAI_API_KEY) {
    return jsonError("API not configured", 503);
  }
  return null;
}

/** Retorna a API key do ambiente (chamar após checkApiKey). */
export function getApiKey(): string {
  return process.env.OPENAI_API_KEY!;
}
