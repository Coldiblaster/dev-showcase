"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { CodeBlock } from "@/components/code-block";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

const apiCode = `import OpenAI from "openai";
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

export function ApiRouteSection() {
  const t = useTranslations("aiChatbotPage");
  const { ref, isInView } = useSectionInView();
  const highlights = t.raw("apiRoute.highlights") as string[];

  return (
    <section ref={ref} className="px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 max-w-2xl md:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-4xl">
              {t("apiRoute.title")}
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              {t("apiRoute.description")}
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <motion.div variants={fadeUp}>
              <CodeBlock
                title={t("apiRoute.codeTitle")}
                code={apiCode}
              />
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              {highlights.map((text, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-3 md:p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {text}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
