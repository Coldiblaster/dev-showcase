"use client";

import { Github } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { HeroSection } from "@/components/hero-section";
import { SectionWrapper } from "@/components/section-wrapper";

import { AnalysisOutput } from "./analysis-output";
import { AnalyzerForm } from "./analyzer-form";
import { ProfileCard } from "./profile-card";
import { ReposList } from "./repos-list";

interface AnalyzerResult {
  profile: {
    login: string;
    name: string | null;
    bio: string | null;
    avatar_url: string;
    html_url: string;
    public_repos: number;
    followers: number;
    following: number;
    location: string | null;
    company: string | null;
    created_at: string;
  };
  repos: Array<{
    name: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    html_url: string;
  }>;
  analysis: {
    summary: string;
    languages: string[];
    highlights: string[];
    advice: string;
  };
}

/** Ferramenta de análise de perfil GitHub com IA. */
export function GithubAnalyzer() {
  const t = useTranslations("githubAnalyzerPage");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function analyze(username: string) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/github-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, locale }),
      });

      if (res.status === 404) {
        setError(t("errors.notFound"));
        return;
      }
      if (res.status === 429) {
        setError(t("errors.rateLimit"));
        return;
      }
      if (!res.ok) {
        setError(t("errors.generic"));
        return;
      }

      const data = (await res.json()) as AnalyzerResult;
      setResult(data);
    } catch {
      setError(t("errors.generic"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Github}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/ferramentas"
        warning={t("hero.warning")}
      />

      <SectionWrapper id="analyzer" variant="default">
        {/* Formulário de busca */}
        <AnimatedSection>
          <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card/50 p-5">
            <AnalyzerForm onSubmit={analyze} loading={loading} />
          </div>
        </AnimatedSection>

        {/* Erro */}
        {error && (
          <AnimatedSection delay={0.1}>
            <div
              role="alert"
              className="mx-auto mt-6 max-w-xl rounded-xl border border-destructive/30 bg-destructive/10 p-4"
            >
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </AnimatedSection>
        )}

        {/* Resultado */}
        {result && !error && (
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
            {/* Coluna esquerda: perfil + repos */}
            <div className="space-y-4">
              <ProfileCard {...result.profile} />
              <ReposList repos={result.repos} />
            </div>

            {/* Coluna direita: análise IA */}
            <AnalysisOutput {...result.analysis} />
          </div>
        )}
      </SectionWrapper>
    </div>
  );
}
