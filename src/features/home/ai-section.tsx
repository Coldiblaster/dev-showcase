"use client";

import { motion, useInView } from "framer-motion";
import {
  Code2,
  Lightbulb,
  MessageCircle,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const icons = [Sparkles, Code2, MessageSquare, Lightbulb];

/** Seção sobre uso de IA com chatbot interativo. */
export function AISection() {
  const t = useTranslations("ai");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const openChat = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-chat-widget"));
  }, []);

  return (
    <section id="ai" className="relative px-6 py-16 md:py-32" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.04),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 text-center md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-2 inline-block font-mono text-sm text-primary"
          >
            {"// "}
            {t("subtitle")}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t
            .raw("features")
            .map(
              (feature: { title: string; description: string }, i: number) => {
                const Icon = icons[i];
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    <Card className="group h-full border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                      <CardHeader className="pb-3">
                        <motion.div
                          className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          <Icon className="h-5 w-5" />
                        </motion.div>
                        <h3 className="text-base font-semibold text-foreground md:text-lg">
                          {feature.title}
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              },
            )}
        </div>

        {/* Real-world use case */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 md:mt-16"
        >
          <div className="mb-6 text-center">
            <Badge variant="secondary" className="mb-3 font-mono text-xs">
              {t("example.badge")}
            </Badge>
            <h3 className="text-xl font-semibold text-foreground">
              {t("example.title")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("example.description")}
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-chart-4/60" />
              <div className="h-3 w-3 rounded-full bg-primary/60" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">
                app/api/chat/route.ts
              </span>
            </div>
            <pre className="overflow-x-auto bg-card p-6 font-mono text-sm leading-relaxed">
              <code>
                <span className="text-primary">{"import"}</span>
                <span className="text-foreground">{" { streamText } "}</span>
                <span className="text-primary">{"from"}</span>
                <span className="text-muted-foreground">{' "ai"'}</span>
                <span className="text-foreground">{";"}</span>
                {"\n"}
                <span className="text-primary">{"import"}</span>
                <span className="text-foreground">{" { openai } "}</span>
                <span className="text-primary">{"from"}</span>
                <span className="text-muted-foreground">
                  {' "@ai-sdk/openai"'}
                </span>
                <span className="text-foreground">{";"}</span>
                {"\n\n"}
                <span className="text-muted-foreground">
                  {t("example.codeComment")}
                </span>
                {"\n"}
                <span className="text-primary">{"export async function"}</span>
                <span className="text-foreground">{" POST(req: "}</span>
                <span className="text-chart-4">{"Request"}</span>
                <span className="text-foreground">{")"}</span>
                <span className="text-foreground">{" {"}</span>
                {"\n"}
                <span className="text-foreground">{"  "}</span>
                <span className="text-primary">{"const"}</span>
                <span className="text-foreground">{" { messages } = "}</span>
                <span className="text-primary">{"await"}</span>
                <span className="text-foreground">{" req.json();"}</span>
                {"\n\n"}
                <span className="text-foreground">{"  "}</span>
                <span className="text-primary">{"const"}</span>
                <span className="text-foreground">{" result = "}</span>
                <span className="text-primary">{"await"}</span>
                <span className="text-foreground">{" streamText({"}</span>
                {"\n"}
                <span className="text-foreground">
                  {'    model: openai("gpt-4-turbo"),'}
                </span>
                {"\n"}
                <span className="text-foreground">{"    messages,"}</span>
                {"\n"}
                <span className="text-foreground">{"    system: "}</span>
                <span className="text-muted-foreground">
                  {`"${t("example.codeSystemPrompt")}"`}
                </span>
                <span className="text-foreground">{","}</span>
                {"\n"}
                <span className="text-foreground">{"  });"}</span>
                {"\n\n"}
                <span className="text-foreground">{"  "}</span>
                <span className="text-primary">{"return"}</span>
                <span className="text-foreground">
                  {" result.toDataStreamResponse();"}
                </span>
                {"\n"}
                <span className="text-foreground">{"}"}</span>
              </code>
            </pre>
          </div>

          <div className="mt-6 flex justify-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" className="gap-2" onClick={openChat}>
                <MessageCircle className="h-4 w-4" />
                {t("tryChat")}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
