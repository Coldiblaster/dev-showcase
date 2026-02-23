"use client";

import { Circle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const POLL_INTERVAL = 30_000;

export function OnlineCounter() {
  const t = useTranslations("footer");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchCount() {
      try {
        const res = await fetch("/api/online", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (mounted && typeof data.count === "number" && data.count > 0) {
          setCount(data.count);
        }
      } catch {
        // falha silenciosa — não exibe nada
      }
    }

    fetchCount();
    const interval = setInterval(fetchCount, POLL_INTERVAL);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!count) return null;

  return (
    <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <Circle className="relative h-2 w-2 fill-green-400 text-green-400" />
      </span>
      {t("online", { count })}
    </span>
  );
}
