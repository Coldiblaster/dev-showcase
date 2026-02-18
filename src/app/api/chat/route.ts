/**
 * API Route — Chat IA do Portfolio (GPT-4.1 Nano, streaming).
 *
 * Responde perguntas sobre o Vinicius e a plataforma com humor.
 * Segurança compartilhada via @/lib/api-security.
 */

import OpenAI from "openai";
import { z } from "zod";

import {
  checkApiKey,
  checkBodySize,
  getApiKey,
  jsonError,
  safeParseBody,
  sanitizeStreamChunk,
  sanitizeUserInput,
  secureStreamHeaders,
} from "@/lib/api-security";
import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

// ---------------------------------------------------------------------------
// Constantes
// ---------------------------------------------------------------------------

const MAX_MESSAGES = 10;
const MAX_USER_MSG_LENGTH = 500;
const MAX_ASSISTANT_MSG_LENGTH = 2_000;
const MAX_BODY_SIZE = 16_000;

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

/** Schema de uma mensagem do usuário. */
const userMessageSchema = z.object({
  role: z.literal("user"),
  content: z.string().min(1).max(MAX_USER_MSG_LENGTH),
});

/** Schema de uma mensagem do assistente (histórico). */
const assistantMessageSchema = z.object({
  role: z.literal("assistant"),
  content: z.string().max(MAX_ASSISTANT_MSG_LENGTH),
});

const messageSchema = z.union([userMessageSchema, assistantMessageSchema]);

/** Schema do body da requisição. */
const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(MAX_MESSAGES),
});

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

/** Processa mensagem de chat, aplica segurança e retorna stream da IA. */
export async function POST(request: Request) {
  try {
    // 1. Body size
    const sizeError = checkBodySize(request, MAX_BODY_SIZE);
    if (sizeError) return sizeError;

    // 2. Rate limit
    const ip = getClientIp(request);
    const rl = rateLimit(ip, { prefix: "chat", limit: 30, windowSeconds: 60 });
    if (!rl.success) return rateLimitResponse(rl);

    // 3. API key
    const keyError = checkApiKey();
    if (keyError) return keyError;

    // 4. Parse body
    const bodyResult = await safeParseBody(request);
    if ("error" in bodyResult) return bodyResult.error;

    // 5. Validar schema
    const parsed = bodySchema.safeParse(bodyResult.data);
    if (!parsed.success) return jsonError("Dados inválidos", 400);

    // 6. Sanitizar inputs do usuário (apenas mensagens do user)
    const sanitizedMessages = parsed.data.messages.slice(-6).map((msg) => {
      if (msg.role === "user") {
        return { ...msg, content: sanitizeUserInput(msg.content) };
      }
      return msg;
    });

    // 7. Chamar OpenAI com streaming
    const openai = new OpenAI({ apiKey: getApiKey() });

    const stream = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      max_tokens: 400,
      temperature: 0.8,
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...sanitizedMessages,
      ],
    });

    // 8. Stream com sanitização de cada chunk
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) {
              controller.enqueue(encoder.encode(sanitizeStreamChunk(text)));
            }
          }
        } catch (streamErr) {
          console.error("[Chat API] Stream error:", streamErr);
          controller.enqueue(
            encoder.encode("\n\n⚠️"),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, { headers: secureStreamHeaders() });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Erro desconhecido";
    console.error("[Chat API] Error:", errorMessage, err);

    const isQuota =
      err instanceof Error &&
      (errorMessage.includes("quota") ||
        errorMessage.includes("rate_limit") ||
        errorMessage.includes("insufficient"));

    return jsonError(
      isQuota ? "Limite de uso atingido. Tente mais tarde." : "Erro interno",
      isQuota ? 429 : 500,
    );
  }
}
