"use client";

import { Building2, ExternalLink, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";

interface ProfileCardProps {
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
}

/** Card com dados básicos do perfil GitHub. */
export function ProfileCard(profile: ProfileCardProps) {
  const t = useTranslations("githubAnalyzerPage");

  const joinYear = new Date(profile.created_at).getFullYear();

  const stats = [
    { label: t("profile.repos"), value: profile.public_repos },
    { label: t("profile.followers"), value: profile.followers },
    { label: t("profile.following"), value: profile.following },
  ];

  return (
    <AnimatedSection>
      <div className="rounded-2xl border border-border bg-card/60 p-5">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
            <Image
              src={profile.avatar_url}
              alt={profile.login}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-bold text-foreground">
              {profile.name ?? profile.login}
            </p>
            {profile.name && (
              <p className="font-mono text-sm text-muted-foreground">
                @{profile.login}
              </p>
            )}
            {profile.bio && (
              <p className="mt-1 line-clamp-2 text-sm text-foreground/80">
                {profile.bio}
              </p>
            )}

            <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
              {profile.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {profile.location}
                </span>
              )}
              {profile.company && (
                <span className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {profile.company}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {t("profile.memberSince")} {joinYear}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-4 border-t border-border pt-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-mono text-lg font-bold text-foreground">
                {stat.value.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <a
          href={profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {t("profile.viewProfile")}
        </a>
      </div>
    </AnimatedSection>
  );
}
