"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ClipboardCopy, RotateCcw, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardBlur } from "@/components/ui/card-blur";

type Flag = "g" | "i" | "m" | "s";
const ALL_FLAGS: Flag[] = ["g", "i", "m", "s"];

interface MatchGroup {
  full: string;
  groups: string[];
  start: number;
  end: number;
}

interface RegexEditorProps {
  injection?: { regex: string; test: string } | null;
  onInjectionConsumed?: () => void;
}

export function RegexEditor({
  injection,
  onInjectionConsumed,
}: RegexEditorProps) {
  const t = useTranslations("regexPage.editor");
  const tFlags = useTranslations("regexPage.editor.flags");

  const [regex, setRegex] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState<Set<Flag>>(new Set(["g"]));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (injection) {
      setRegex(injection.regex);
      setTestString(injection.test);
      onInjectionConsumed?.();
    }
  }, [injection, onInjectionConsumed]);

  const toggleFlag = useCallback((flag: Flag) => {
    setFlags((prev) => {
      const next = new Set(prev);
      if (next.has(flag)) next.delete(flag);
      else next.add(flag);
      return next;
    });
  }, []);

  const flagString = useMemo(
    () => ALL_FLAGS.filter((f) => flags.has(f)).join(""),
    [flags],
  );

  const { matches, error } = useMemo(() => {
    if (!regex) return { matches: [] as MatchGroup[], error: null };
    try {
      const re = new RegExp(regex, flagString);
      const result: MatchGroup[] = [];
      const allMatches = testString.matchAll(
        new RegExp(
          regex,
          flagString.includes("g") ? flagString : flagString + "g",
        ),
      );
      for (const m of allMatches) {
        result.push({
          full: m[0],
          groups: m.slice(1).filter(Boolean),
          start: m.index ?? 0,
          end: (m.index ?? 0) + m[0].length,
        });
        if (!flags.has("g")) break;
      }
      void re;
      return { matches: result, error: null };
    } catch (e) {
      return { matches: [] as MatchGroup[], error: (e as Error).message };
    }
  }, [regex, testString, flagString, flags]);

  const highlightedText = useMemo(() => {
    if (!testString || !matches.length) return null;
    const parts: { text: string; highlighted: boolean }[] = [];
    let lastIndex = 0;
    for (const m of matches) {
      if (m.start > lastIndex) {
        parts.push({
          text: testString.slice(lastIndex, m.start),
          highlighted: false,
        });
      }
      parts.push({ text: testString.slice(m.start, m.end), highlighted: true });
      lastIndex = m.end;
    }
    if (lastIndex < testString.length) {
      parts.push({ text: testString.slice(lastIndex), highlighted: false });
    }
    return parts;
  }, [testString, matches]);

  const handleCopy = useCallback(() => {
    const full = `/${regex}/${flagString}`;
    navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [regex, flagString]);

  const handleClear = useCallback(() => {
    setRegex("");
    setTestString("");
    setFlags(new Set(["g"]));
  }, []);

  return (
    <section id="editor" className="px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              {t("title")}
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Input side */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <AnimatedSection delay={0.1}>
              <CardBlur>
                {/* Regex input */}
                <div className="mb-4">
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    {t("regexLabel")}
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-3 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20">
                    <span className="select-none font-mono text-sm text-muted-foreground">
                      /
                    </span>
                    <input
                      type="text"
                      value={regex}
                      onChange={(e) => setRegex(e.target.value)}
                      placeholder={t("regexPlaceholder")}
                      spellCheck={false}
                      className="flex-1 bg-transparent py-2.5 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
                    />
                    <span className="select-none font-mono text-sm text-muted-foreground">
                      /{flagString}
                    </span>
                  </div>
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive"
                      >
                        <X className="h-3 w-3" />
                        {t("invalidRegex")}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Flags */}
                <div className="mb-4">
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    {t("flagsLabel")}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ALL_FLAGS.map((flag) => (
                      <button
                        key={flag}
                        onClick={() => toggleFlag(flag)}
                        title={String(tFlags.raw(flag))}
                        className={`rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                          flags.has(flag)
                            ? "border-primary/50 bg-primary/10 text-primary"
                            : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                        }`}
                      >
                        {flag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    disabled={!regex}
                    className="gap-1.5"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        {t("copied")}
                      </>
                    ) : (
                      <>
                        <ClipboardCopy className="h-3.5 w-3.5" />
                        {t("copyRegex")}
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    className="gap-1.5"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {t("clear")}
                  </Button>
                </div>
              </CardBlur>
            </AnimatedSection>

            {/* Test string */}
            <AnimatedSection delay={0.15}>
              <CardBlur>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  {t("testLabel")}
                </label>
                {highlightedText ? (
                  <div className="min-h-[120px] whitespace-pre-wrap rounded-xl border border-border bg-secondary/50 p-3 font-mono text-sm leading-relaxed">
                    {highlightedText.map((part, i) =>
                      part.highlighted ? (
                        <mark
                          key={i}
                          className="rounded bg-primary/20 px-0.5 text-primary ring-1 ring-primary/30"
                        >
                          {part.text}
                        </mark>
                      ) : (
                        <span key={i} className="text-foreground">
                          {part.text}
                        </span>
                      ),
                    )}
                  </div>
                ) : null}
                <textarea
                  value={testString}
                  onChange={(e) => setTestString(e.target.value)}
                  placeholder={t("testPlaceholder")}
                  rows={5}
                  spellCheck={false}
                  className={`w-full resize-none rounded-xl border border-border bg-secondary/50 p-3 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 ${highlightedText ? "mt-3 border-dashed opacity-60" : ""}`}
                />
              </CardBlur>
            </AnimatedSection>
          </div>

          {/* Results side */}
          <div className="lg:col-span-2">
            <AnimatedSection delay={0.2}>
              <CardBlur className="sticky top-24">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">
                    {t("matchesTitle")}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`font-mono text-xs ${
                      matches.length > 0
                        ? "border-primary/30 text-primary"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {t("matchesFound", { count: matches.length })}
                  </Badge>
                </div>

                {matches.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="mb-2 text-3xl opacity-30">∅</div>
                    <p className="text-sm text-muted-foreground">
                      {t("noMatches")}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground/60">
                      {t("noMatchesHint")}
                    </p>
                  </div>
                ) : (
                  <div className="flex max-h-[400px] flex-col gap-2 overflow-y-auto">
                    {matches.map((m, i) => (
                      <motion.div
                        key={`${m.start}-${i}`}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="rounded-lg border border-border/50 bg-secondary/30 p-3"
                      >
                        <div className="mb-1 flex items-center justify-between">
                          <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-xs text-primary">
                            {m.full}
                          </code>
                          <span className="text-[10px] text-muted-foreground">
                            {t("position", { start: m.start, end: m.end })}
                          </span>
                        </div>
                        {m.groups.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {m.groups.map((g, gi) => (
                              <span
                                key={gi}
                                className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                              >
                                {t("group", { index: gi + 1 })}: {g}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardBlur>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
