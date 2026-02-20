"use client";

import { Braces } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionNav } from "@/components/section-nav";
import { Button } from "@/components/ui/button";
import { CardBlur } from "@/components/ui/card-blur";
import { Textarea } from "@/components/ui/textarea";

import { JsonExamplesSection } from "./json-examples-section";
import { translateJsonError } from "./translate-json-error";

export function JsonTool() {
  const t = useTranslations("jsonPage");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [valid, setValid] = useState<boolean | null>(null);

  const handleFormat = useCallback(() => {
    setError("");
    setValid(null);
    if (!input.trim()) {
      setOutput("");
      return;
    }
    try {
      const parsed = JSON.parse(input) as unknown;
      setOutput(JSON.stringify(parsed, null, 2));
      setValid(true);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(
        translateJsonError(msg, (key, values) =>
          t(key as Parameters<typeof t>[0], values),
        ),
      );
      setOutput("");
      setValid(false);
    }
  }, [input, t]);

  const handleMinify = useCallback(() => {
    setError("");
    setValid(null);
    if (!input.trim()) {
      setOutput("");
      return;
    }
    try {
      const parsed = JSON.parse(input) as unknown;
      setOutput(JSON.stringify(parsed));
      setValid(true);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(
        translateJsonError(msg, (key, values) =>
          t(key as Parameters<typeof t>[0], values),
        ),
      );
      setOutput("");
      setValid(false);
    }
  }, [input, t]);

  const handleValidate = useCallback(() => {
    setError("");
    setValid(null);
    setOutput("");
    if (!input.trim()) {
      return;
    }
    try {
      JSON.parse(input);
      setValid(true);
      setOutput(t("result.valid"));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(
        translateJsonError(msg, (key, values) =>
          t(key as Parameters<typeof t>[0], values),
        ),
      );
      setValid(false);
      setOutput("");
    }
  }, [input, t]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
    setValid(null);
  }, []);

  const handleSelectExample = useCallback((json: string) => {
    setInput(json);
    setOutput("");
    setError("");
    setValid(null);
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Braces}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/ferramentas"
      />

      <SectionNav
        sections={[
          { id: "editor", label: t("sectionNav.editor") },
          { id: "examples", label: t("sectionNav.examples") },
        ]}
        triggerId="editor"
      />

      <section
        id="editor"
        className="px-4 py-12 md:px-6 md:py-24"
        role="region"
        aria-labelledby="json-editor-heading"
        aria-label={t("editor.ariaLabel")}
      >
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <div id="json-editor-heading" className="mb-2">
              <h2 className="text-2xl font-bold text-foreground">
                {t("editor.title")}
              </h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground" id="json-hint">
              {t("editor.hint")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <div className="mb-4 flex flex-wrap gap-2">
              <Button onClick={handleFormat} size="sm">
                {t("editor.format")}
              </Button>
              <Button onClick={handleMinify} variant="secondary" size="sm">
                {t("editor.minify")}
              </Button>
              <Button onClick={handleValidate} variant="outline" size="sm">
                {t("editor.validate")}
              </Button>
              <Button onClick={handleClear} variant="ghost" size="sm">
                {t("editor.clear")}
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <CardBlur padding="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="json-input"
                    className="text-sm font-medium text-foreground"
                  >
                    {t("editor.inputLabel")}
                  </label>
                  <Textarea
                    id="json-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("editor.inputPlaceholder")}
                    className="min-h-[220px] max-h-[32rem] resize-y font-mono text-sm"
                    aria-describedby={error ? "json-error" : undefined}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="json-output"
                    className="text-sm font-medium text-foreground"
                  >
                    {t("editor.outputLabel")}
                  </label>
                  <Textarea
                    id="json-output"
                    value={output}
                    readOnly
                    className="min-h-[220px] max-h-[32rem] resize-y font-mono text-sm"
                    aria-invalid={valid === false}
                    aria-describedby={error ? "json-error" : undefined}
                  />
                  {error && (
                    <p
                      id="json-error"
                      className="text-sm text-destructive"
                      role="alert"
                      aria-live="assertive"
                    >
                      {error}
                    </p>
                  )}
                  {valid === true && !output.startsWith(t("result.valid")) && (
                    <p
                      className="text-sm text-green-600 dark:text-green-400"
                      aria-live="polite"
                      role="status"
                    >
                      {t("result.formatted")}
                    </p>
                  )}
                </div>
              </div>
            </CardBlur>
          </AnimatedSection>
        </div>
      </section>

      <JsonExamplesSection onSelectExample={handleSelectExample} />

      <CTASection
        icon={Braces}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.back")}
        buttonHref="/ferramentas"
      />
    </div>
  );
}
