"use client";

import { FlaskConical, Loader2, Wand2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { PR_TYPES, type PrFormData, type PrType } from "./pr-data";

interface PrFormProps {
  onSubmit: (data: PrFormData) => Promise<void>;
  loading: boolean;
}

interface ExampleItem {
  label: string;
  type: string;
  title: string;
  description: string;
  filesChanged: string;
}

const INITIAL: PrFormData = {
  title: "",
  type: "feat",
  description: "",
  filesChanged: "",
};

const TYPE_COLORS: Record<string, string> = {
  feat: "text-emerald-400",
  fix: "text-rose-400",
  refactor: "text-violet-400",
  docs: "text-sky-400",
  test: "text-amber-400",
  chore: "text-zinc-400",
  style: "text-pink-400",
  perf: "text-orange-400",
};

/** Formulário de contexto do PR com exemplos pré-definidos. */
export function PrForm({ onSubmit, loading }: PrFormProps) {
  const t = useTranslations("prGeneratorPage");
  const [form, setForm] = useState<PrFormData>(INITIAL);
  const [error, setError] = useState<string | null>(null);
  const [activeExample, setActiveExample] = useState<number | null>(null);

  const examples = t.raw("examples.items") as ExampleItem[];

  const set = (key: keyof PrFormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function applyExample(ex: ExampleItem, index: number) {
    setForm({
      type: ex.type as PrType,
      title: ex.title,
      description: ex.description,
      filesChanged: ex.filesChanged,
    });
    setActiveExample(index);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.title.trim() || !form.description.trim()) {
      setError(t("errors.validation"));
      return;
    }

    await onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="font-semibold text-foreground">{t("form.title")}</h2>

      {/* Exemplos clicáveis */}
      <div>
        <p className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <FlaskConical className="h-3 w-3 text-primary" />
          {t("examples.title")}
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {examples.map((ex, i) => (
            <button
              key={ex.label}
              type="button"
              onClick={() => applyExample(ex, i)}
              className={`group shrink-0 rounded-xl border px-3 py-2 text-left transition-all ${
                activeExample === i
                  ? "border-primary/50 bg-primary/10"
                  : "border-border bg-secondary/20 hover:border-primary/30 hover:bg-secondary/50"
              }`}
            >
              <span
                className={`block font-mono text-[10px] font-semibold ${TYPE_COLORS[ex.type] ?? "text-primary"}`}
              >
                {ex.type}
              </span>
              <span className="block text-xs text-foreground">{ex.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tipo de PR */}
      <div>
        <Label htmlFor="pr-type" className="mb-1.5 block text-sm">
          {t("form.typeLabel")}{" "}
          <span aria-hidden className="text-destructive">
            *
          </span>
        </Label>
        <select
          id="pr-type"
          value={form.type}
          onChange={(e) => {
            set("type")(e.target.value as PrType);
            setActiveExample(null);
          }}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {PR_TYPES.map((pt) => (
            <option key={pt} value={pt}>
              {t(`form.types.${pt}`)}
            </option>
          ))}
        </select>
      </div>

      {/* Título */}
      <div>
        <Label htmlFor="pr-title" className="mb-1.5 block text-sm">
          {t("form.titleLabel")}{" "}
          <span aria-hidden className="text-destructive">
            *
          </span>
        </Label>
        <Input
          id="pr-title"
          value={form.title}
          onChange={(e) => {
            set("title")(e.target.value);
            setActiveExample(null);
          }}
          placeholder={t("form.titlePlaceholder")}
          maxLength={200}
          required
        />
      </div>

      {/* Descrição */}
      <div>
        <Label htmlFor="pr-desc" className="mb-1.5 block text-sm">
          {t("form.descriptionLabel")}{" "}
          <span aria-hidden className="text-destructive">
            *
          </span>
        </Label>
        <textarea
          id="pr-desc"
          value={form.description}
          onChange={(e) => {
            set("description")(e.target.value);
            setActiveExample(null);
          }}
          placeholder={t("form.descriptionPlaceholder")}
          rows={5}
          maxLength={2_000}
          required
          className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Arquivos */}
      <div>
        <Label htmlFor="pr-files" className="mb-1.5 block text-sm">
          {t("form.filesLabel")}
        </Label>
        <Input
          id="pr-files"
          value={form.filesChanged}
          onChange={(e) => {
            set("filesChanged")(e.target.value);
            setActiveExample(null);
          }}
          placeholder={t("form.filesPlaceholder")}
          maxLength={1_000}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" disabled={loading} className="w-full gap-2">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("form.loadingButton")}
          </>
        ) : (
          <>
            <Wand2 className="h-4 w-4" />
            {t("form.submitButton")}
          </>
        )}
      </Button>
    </form>
  );
}
