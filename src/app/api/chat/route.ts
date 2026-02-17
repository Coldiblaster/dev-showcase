import OpenAI from "openai";
import { z } from "zod";

import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

const MAX_MESSAGES = 10;

const userMessageSchema = z.object({
  role: z.literal("user"),
  content: z.string().max(500),
});

const assistantMessageSchema = z.object({
  role: z.literal("assistant"),
  content: z.string().max(2000),
});

const messageSchema = z.union([userMessageSchema, assistantMessageSchema]);

const bodySchema = z.object({
  messages: z.array(messageSchema).max(MAX_MESSAGES),
});

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rl = rateLimit(ip, { prefix: "chat", limit: 30, windowSeconds: 60 });
    if (!rl.success) return rateLimitResponse(rl);

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Chat não configurado" }),
        { status: 503, headers: { "Content-Type": "application/json" } },
      );
    }

    const body = await request.json();
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Dados inválidos" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const recentMessages = parsed.data.messages.slice(-6);

    const openai = new OpenAI({ apiKey });

    const stream = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      max_tokens: 300,
      temperature: 0.9,
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...recentMessages,
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (streamErr) {
          console.error("[Chat API] Stream error:", streamErr);
          controller.enqueue(
            encoder.encode("\n\n[Erro na resposta. Tente novamente.]"),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Erro desconhecido";
    console.error("[Chat API] Error:", errorMessage, err);

    const isQuota =
      err instanceof Error &&
      (errorMessage.includes("quota") ||
        errorMessage.includes("rate_limit") ||
        errorMessage.includes("insufficient"));

    return new Response(
      JSON.stringify({
        error: isQuota
          ? "Limite de uso atingido. Tente mais tarde."
          : "Erro interno",
      }),
      { status: isQuota ? 429 : 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
