export const API_ROUTE_CODE = `import OpenAI from "openai";
import { z } from "zod";
import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";

const bodySchema = z.object({
  messages: z.array(z.union([
    z.object({ role: z.literal("user"), content: z.string().max(500) }),
    z.object({ role: z.literal("assistant"), content: z.string().max(2000) }),
  ])),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Invalid" }, { status: 400 });

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const stream = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    max_tokens: 300,
    stream: true,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...parsed.data.messages.slice(-6),
    ],
  });

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content;
        if (text) controller.enqueue(new TextEncoder().encode(text));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}`;

export const SYSTEM_PROMPT_EXAMPLE = `export const SYSTEM_PROMPT = \`
Você é o assistente virtual do portfolio de [Seu Nome].

REGRAS:
- Fale sempre em TERCEIRA PESSOA sobre o desenvolvedor
- Seja profissional mas descontraído
- Use analogias de código quando fizer sentido
- Redirecione perguntas fora do escopo educadamente
- Respostas curtas e objetivas (max 3 parágrafos)

DADOS DO DESENVOLVEDOR:
- Nome: [Seu Nome]
- Cargo: Desenvolvedor Frontend Senior
- Experiência: +8 anos com React, Next.js, TypeScript
- Skills: React, Next.js, React Native, Tailwind, Node.js
- Projetos: [Liste seus projetos principais]

ESCOPO:
- Responde sobre: habilidades, projetos, experiência, stack
- NÃO responde sobre: vida pessoal, política, assuntos genéricos
\`;`;
