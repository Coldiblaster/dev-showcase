"use client";

import Giscus from "@giscus/react";
import { MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

// http://localhost não funciona: giscus.app é HTTPS e o browser bloqueia mixed content.
// Em produção (HTTPS) o CSS customizado é carregado normalmente.
function getThemeUrl() {
  if (typeof window === "undefined") return "dark_dimmed";
  if (window.location.protocol !== "https:") return "dark_dimmed";
  return `${window.location.origin}/giscus-theme.css`;
}

const REPO = (process.env.NEXT_PUBLIC_GISCUS_REPO ??
  "") as `${string}/${string}`;
const REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "";
const CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "Announcements";
const CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "";

interface GiscusCommentsProps {
  path: string;
}

export function GiscusComments({ path }: GiscusCommentsProps) {
  const t = useTranslations("global.comments");
  const [mounted, setMounted] = useState(false);
  const [themeUrl, setThemeUrl] = useState("dark_dimmed");

  useEffect(() => {
    setThemeUrl(getThemeUrl());
    setMounted(true);
  }, []);

  if (!REPO_ID || !CATEGORY_ID) return null;

  return (
    <div className="mt-10 border-t border-border/50 pt-10">
      <div className="mb-6 flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">
          {t("title")}
        </span>
      </div>

      {mounted && (
        <Giscus
          id={`giscus${path.replace(/\//g, "-")}`}
          repo={REPO}
          repoId={REPO_ID}
          category={CATEGORY}
          categoryId={CATEGORY_ID}
          mapping="pathname"
          strict="1"
          reactionsEnabled="0"
          emitMetadata="0"
          inputPosition="top"
          theme={themeUrl}
          lang="pt"
          loading="lazy"
        />
      )}
    </div>
  );
}
