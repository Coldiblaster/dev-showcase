"use client";

import { AlertCircle, Loader2, Sparkles, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Props do editor de código para revisão. */
interface CodeEditorProps {
  code: string;
  language: string;
  loading: boolean;
  error: string;
  onCodeChange: (code: string) => void;
  onLanguageChange: (language: string) => void;
  onReview: () => void;
  onClear: () => void;
}

/** Editor de código com seletor de linguagem e barra de progresso de caracteres. */
export function CodeEditor({
  code,
  language,
  loading,
  error,
  onCodeChange,
  onLanguageChange,
  onReview,
  onClear,
}: CodeEditorProps) {
  const t = useTranslations("codeReviewPage");
  const languages = t.raw("languages") as string[];
  const charPercentage = Math.min((code.length / 5000) * 100, 100);

  return (
    <div className="overflow-hidden rounded-xl border border-border/40 bg-card shadow-lg">
      <div className="flex items-center justify-between border-b border-border/30 bg-muted/30 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/70 transition-colors hover:bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/70 transition-colors hover:bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500/70 transition-colors hover:bg-green-500" />
          </div>
          <div className="mx-2 h-4 w-px bg-border/50" />
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="h-7 w-36 border-border/30 bg-background/50 text-xs">
              <SelectValue placeholder={t("editor.autoDetect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">{t("editor.autoDetect")}</SelectItem>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang.toLowerCase()}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          {code && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
              {t("editor.clear")}
            </Button>
          )}
        </div>
      </div>

      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value.slice(0, 5000))}
          placeholder={t.raw("editor.placeholder")}
          className="min-h-[280px] w-full resize-y bg-transparent p-5 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/30 focus:outline-none"
          spellCheck={false}
        />
      </div>

      <div className="border-t border-border/30 bg-muted/20 px-4 py-3">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted/50">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${charPercentage}%`,
                backgroundColor:
                  charPercentage > 90
                    ? "#ef4444"
                    : charPercentage > 70
                      ? "#eab308"
                      : "hsl(var(--primary))",
              }}
            />
          </div>
          <span className="min-w-[100px] text-right text-xs tabular-nums text-muted-foreground">
            {t("editor.charCount", { count: code.length })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="min-h-[20px]">
            {error && (
              <p className="flex items-center gap-1.5 text-sm font-medium text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </p>
            )}
          </div>
          <Button
            onClick={onReview}
            disabled={loading || code.length < 10}
            size="lg"
            className="min-w-[180px] gap-2 font-semibold shadow-md transition-all hover:shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("editor.reviewing")}
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                {t("editor.review")}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
