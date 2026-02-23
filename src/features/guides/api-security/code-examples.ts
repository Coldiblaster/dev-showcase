/** Snippets reais do projeto para o guia de segurança de APIs. */

export const RATE_LIMIT_INMEMORY = `// src/lib/rate-limit.ts
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = rateLimit(ip, {
    prefix: "contact",
    limit: 3,
    windowSeconds: 600, // 10 min
  });
  if (!rl.success) return rateLimitResponse(rl);
  // ...
}`;

export const RATE_LIMIT_REDIS = `// src/lib/redis-rate-limit.ts
import { getClientIp, rateLimitResponse } from "@/lib/rate-limit";
import { rateLimitAsync } from "@/lib/redis-rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = await rateLimitAsync(ip, {
    prefix: "reactions",
    limit: 15,
    windowSeconds: 60,
  });
  if (!rl.success) return rateLimitResponse(rl);
  // ...
}`;

export const ZOD_INPUT = `import { z } from "zod";

const bodySchema = z.object({
  code: z.string().min(10).max(5000),
  language: z
    .string()
    .max(30)
    .regex(/^[a-zA-Z0-9+#. -]*$/)
    .optional(),
});

const parsed = bodySchema.safeParse(await request.json());
if (!parsed.success) {
  return jsonError("Invalid input", 400);
}`;

export const ZOD_OUTPUT = `// Validação do output da IA antes de retornar ao cliente
const reviewSchema = z.object({
  score: z.number().min(0).max(100),
  summary: z.string().max(500),
  issues: z.array(
    z.object({
      severity: z.enum(["critical", "warning", "info"]),
      message: z.string().max(300),
    })
  ).max(20),
});

const validated = reviewSchema.safeParse(aiResponse);
if (!validated.success) return jsonError("Invalid AI response", 500);`;

export const SANITIZE_INPUT = `import { sanitizeUserInput } from "@/lib/api-security";

// Detecta e filtra padrões de prompt injection:
// "ignore previous instructions", "act as", "you are now",
// "system:", "reveal system prompt" etc.
const safeCode = sanitizeUserInput(parsed.data.code);`;

export const SANITIZE_OUTPUT = `import { sanitizeOutput, sanitizeStreamChunk } from "@/lib/api-security";

// Para respostas JSON — percorre o objeto recursivamente
const safe = sanitizeOutput(aiResponse);
return Response.json(safe, { headers: secureJsonHeaders() });

// Para streaming
sanitizeStreamChunk(chunk); // remove <script>, javascript:, event handlers`;

export const SECURE_HEADERS = `import { secureJsonHeaders } from "@/lib/api-security";

// Headers aplicados em todas as respostas:
// X-Content-Type-Options: nosniff
// Cache-Control: no-store, no-cache
// Content-Type: application/json
return Response.json(data, { headers: secureJsonHeaders() });`;

export const FULL_ROUTE_PATTERN = `export async function POST(request: Request) {
  try {
    // 1. Body size
    const sizeError = checkBodySize(request, 12_000);
    if (sizeError) return sizeError;

    // 2. Rate limit
    const ip = getClientIp(request);
    const rl = await rateLimitAsync(ip, {
      prefix: "my-route",
      limit: 10,
      windowSeconds: 60,
    });
    if (!rl.success) return rateLimitResponse(rl);

    // 3. API Key (se usar IA)
    const keyError = checkApiKey();
    if (keyError) return keyError;

    // 4. Parse + Validação
    const bodyResult = await safeParseBody(request);
    if ("error" in bodyResult) return bodyResult.error;
    const parsed = mySchema.safeParse(bodyResult.data);
    if (!parsed.success) return jsonError("Invalid input", 400);

    // 5. Sanitizar input
    const safeText = sanitizeUserInput(parsed.data.text);

    // 6. Lógica de negócio + retorno seguro
    const result = await doSomething(safeText);
    return Response.json(
      sanitizeOutput(result),
      { headers: secureJsonHeaders() },
    );
  } catch {
    return jsonError("Internal server error", 500);
  }
}`;
