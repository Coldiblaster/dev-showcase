"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, BookOpen, Home, Terminal } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const FLOATING_SYMBOLS = [
  "</>",
  "{ }",
  "404",
  "null",
  "undefined",
  "NaN",
  "[]",
  "/**/",
  "=>",
  "...",
  "?.",
  "!!",
  "0x1A4",
  "¯\\_(ツ)_/¯",
  "git stash",
  "rm -rf",
];

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  symbol: FLOATING_SYMBOLS[i % FLOATING_SYMBOLS.length],
  x: ((i * 37 + 13) % 100),
  y: ((i * 53 + 7) % 100),
  duration: 15 + ((i * 7) % 20),
  delay: (i * 3) % 8,
  size: 10 + ((i * 4) % 6),
  opacity: 0.04 + ((i * 5) % 8) / 100,
}));

function FloatingParticles() {
  const particles = PARTICLES;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute select-none font-mono text-primary"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, 30, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        >
          {p.symbol}
        </motion.span>
      ))}
    </div>
  );
}

function GlitchText({ text }: { text: string }) {
  return (
    <span className="relative inline-block">
      <motion.span
        className="absolute left-0 top-0 text-red-500/30"
        animate={{
          x: [-2, 2, -1, 0],
          skewX: [0, -2, 1, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute left-0 top-0 text-cyan-500/30"
        animate={{
          x: [2, -2, 1, 0],
          skewX: [0, 2, -1, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3,
          delay: 0.05,
        }}
      >
        {text}
      </motion.span>
      <span className="relative">{text}</span>
    </span>
  );
}

function TerminalAnimation({ lines }: { lines: string[] }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= lines.length) return;
    const timeout = setTimeout(
      () => setVisibleLines((prev) => prev + 1),
      visibleLines === 0 ? 800 : 400 + Math.random() * 300,
    );
    return () => clearTimeout(timeout);
  }, [visibleLines, lines.length]);

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border/50 bg-[#0d1117] shadow-2xl shadow-primary/5">
      <div className="flex items-center gap-2 border-b border-border/30 px-4 py-2.5">
        <div className="h-3 w-3 rounded-full bg-red-500/80" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <div className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-2 font-mono text-[11px] text-muted-foreground/50">
          zsh — 80x24
        </span>
      </div>
      <div className="p-4 font-mono text-xs leading-relaxed md:text-sm">
        <AnimatePresence>
          {lines.slice(0, visibleLines).map((line, i) => {
            const isCommand = line.startsWith("$");
            const isError = line.includes("No such file") || line === "404";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`${
                  isCommand
                    ? "text-emerald-400"
                    : isError
                      ? "text-red-400"
                      : "text-muted-foreground/70"
                } ${i > 0 ? "mt-1" : ""}`}
              >
                {line}
                {isCommand && i === visibleLines - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="ml-0.5 inline-block h-4 w-1.5 bg-emerald-400"
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {visibleLines === 0 && (
          <div className="flex items-center text-emerald-400">
            <span>$</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="ml-1 inline-block h-4 w-1.5 bg-emerald-400"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function NotFoundContent() {
  const t = useTranslations("notFound");
  const terminal = t.raw("terminal") as string[];
  const tips = t.raw("tips") as string[];
  const funFacts = t.raw("funFacts") as string[];

  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [funFacts.length]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24">
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-size-[60px_60px]" />
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/5 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <FloatingParticles />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Glitch 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
          className="mb-2"
        >
          <h1 className="text-[120px] font-black leading-none tracking-tighter text-foreground md:text-[180px]">
            <GlitchText text={t("title")} />
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-3 text-xl font-semibold text-foreground md:text-2xl"
        >
          {t("subtitle")}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8 max-w-md text-sm text-muted-foreground md:text-base"
        >
          {t("description")}
        </motion.p>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8 w-full max-w-lg"
        >
          <TerminalAnimation lines={terminal} />
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mb-8 w-full max-w-lg"
        >
          <div className="rounded-xl border border-border/30 bg-card/50 p-4 text-left backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">
                {t("tipsTitle")}
              </span>
            </div>
            <ul className="space-y-2">
              {tips.map((tip, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + i * 0.15 }}
                  className="flex items-start gap-2 text-xs text-muted-foreground md:text-sm"
                >
                  <span className="mt-0.5 text-primary">▸</span>
                  {tip}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="mb-8 flex flex-wrap justify-center gap-3"
        >
          <Button asChild className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              {t("backHome")}
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dicas">
              <BookOpen className="h-4 w-4" />
              {t("explore")}
            </Link>
          </Button>
        </motion.div>

        {/* Rotating Fun Facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="h-10"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={factIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="max-w-md text-xs text-muted-foreground/50 italic"
            >
              {funFacts[factIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/40 transition-colors hover:text-muted-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            cd /home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
