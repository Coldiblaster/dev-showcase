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
 * Remove padrões comuns de prompt injection do texto do usuário.
 * Não altera a semântica do conteúdo, apenas neutraliza tentativas de escape.
 */
export function sanitizeUserInput(text: string): string {
  return text
    .replace(
      /\b(ignore|disregard|forget)\b.*\b(previous|above|system|instructions?|prompt)\b/gi,
      "[filtered]",
    )
    .replace(
      /\b(you are now|act as|pretend|roleplay|new instruction|override|bypass)\b/gi,
      "[filtered]",
    )
    .replace(/\bsystem\s*:\s*/gi, "[filtered]")
    .replace(/```\s*(system|assistant|user)\b/gi, "``` [filtered]")
    .replace(
      /\b(reveal|show|print|output|repeat)\b.*\b(system\s*prompt|instructions?|configuration)\b/gi,
      "[filtered]",
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
