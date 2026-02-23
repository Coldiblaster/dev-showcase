"use client";

import { Loader2, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AnalyzerFormProps {
  onSubmit: (username: string) => Promise<void>;
  loading: boolean;
}

/** Formulário de input do username do GitHub. */
export function AnalyzerForm({ onSubmit, loading }: AnalyzerFormProps) {
  const t = useTranslations("githubAnalyzerPage");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const USERNAME_REGEX = /^[a-zA-Z0-9-]{1,39}$/;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!USERNAME_REGEX.test(username.trim())) {
      setError(t("errors.validation"));
      return;
    }

    await onSubmit(username.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <Label htmlFor="gh-username" className="sr-only">
          {t("form.label")}
        </Label>
        <Input
          id="gh-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={t("form.placeholder")}
          maxLength={39}
          aria-label={t("form.label")}
          className="h-11"
        />
      </div>

      <Button type="submit" disabled={loading} className="h-11 gap-2 shrink-0">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("form.loading")}
          </>
        ) : (
          <>
            <Search className="h-4 w-4" />
            {t("form.submit")}
          </>
        )}
      </Button>

      {error && (
        <p role="alert" className="col-span-full text-sm text-destructive">
          {error}
        </p>
      )}
    </form>
  );
}
