"use client";

import { ExternalLink, GitFork, Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";

interface Repo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
}

interface ReposListProps {
  repos: Repo[];
}

/** Lista os top repositórios do perfil analisado. */
export function ReposList({ repos }: ReposListProps) {
  const t = useTranslations("githubAnalyzerPage");

  if (repos.length === 0) return null;

  return (
    <AnimatedSection delay={0.15}>
      <div className="rounded-2xl border border-border bg-card/50 p-5">
        <p className="mb-4 font-semibold text-foreground">{t("repos.title")}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {repos.map((repo, i) => (
            <AnimatedSection key={repo.name} delay={0.15 + i * 0.04}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1.5 rounded-xl border border-border/60 p-3 transition-colors hover:border-primary/40 hover:bg-card"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-mono text-sm font-medium text-primary group-hover:underline">
                    {repo.name}
                  </p>
                  <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground/50" />
                </div>

                {repo.description && (
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {repo.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-2 mt-0.5">
                  {repo.language && (
                    <Badge variant="outline" className="text-xs px-1.5 py-0">
                      {repo.language}
                    </Badge>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                      <Star className="h-2.5 w-2.5" />
                      {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                      <GitFork className="h-2.5 w-2.5" />
                      {repo.forks_count}
                    </span>
                  )}
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
