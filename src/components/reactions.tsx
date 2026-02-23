"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const REACTION_CONFIG = [
  { type: "heart" as const, emoji: "❤️", labelKey: "heart" },
  { type: "fire" as const, emoji: "🔥", labelKey: "fire" },
  { type: "bulb" as const, emoji: "💡", labelKey: "bulb" },
];

type ReactionType = "heart" | "fire" | "bulb";
type Counts = Record<ReactionType, number>;

interface CacheEntry {
  counts: Counts;
  userVote: ReactionType | null;
}

interface ReactionsProps {
  path: string;
  onVote?: () => void;
}

// ── localStorage helpers ────────────────────────────────────────────────────
// Garante que counts sobrevivam ao F5 mesmo quando Redis retorna 0
function cacheKey(path: string) {
  return `rx:${path}`;
}

function readCache(path: string): CacheEntry | null {
  try {
    const raw = localStorage.getItem(cacheKey(path));
    if (!raw) return null;
    return JSON.parse(raw) as CacheEntry;
  } catch {
    return null;
  }
}

function writeCache(path: string, entry: CacheEntry) {
  try {
    localStorage.setItem(cacheKey(path), JSON.stringify(entry));
  } catch {}
}

// ── Component ───────────────────────────────────────────────────────────────

export function Reactions({ path, onVote }: ReactionsProps) {
  const t = useTranslations("global.reactions");
  const [counts, setCounts] = useState<Counts>({ heart: 0, fire: 0, bulb: 0 });
  const [userVote, setUserVote] = useState<ReactionType | null>(null);
  const [pendingVote, setPendingVote] = useState<ReactionType | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 1) Mostra cache imediatamente (sem flash enquanto GET carrega)
    const cached = readCache(path);
    if (cached) {
      setCounts(cached.counts);
      setUserVote(cached.userVote);
      setLoaded(true);
    }

    // 2) Sempre busca do servidor para sincronizar
    fetch(`/api/reactions?path=${encodeURIComponent(path)}`)
      .then((r) => r.json())
      .then((data) => {
        const serverCounts: Counts = {
          heart: data.heart ?? 0,
          fire: data.fire ?? 0,
          bulb: data.bulb ?? 0,
        };
        const serverVote: ReactionType | null = data.userVote ?? null;

        // Se o servidor confirmou um voto mas retornou count 0
        // (inconsistência Redis), garante pelo menos 1 no campo votado
        if (serverVote !== null && serverCounts[serverVote] === 0) {
          serverCounts[serverVote] = cached?.counts[serverVote] ?? 1;
        }

        setCounts(serverCounts);
        setUserVote(serverVote);
        writeCache(path, { counts: serverCounts, userVote: serverVote });
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [path]);

  async function handleVote(type: ReactionType) {
    if (pendingVote) return;

    const prevVote = userVote;
    const prevCounts = { ...counts };
    const isToggleOff = userVote === type;
    const isSwitch = userVote !== null && userVote !== type;

    // Optimistic update
    const optimisticCounts = { ...counts };
    if (isToggleOff) {
      optimisticCounts[type] = Math.max(0, optimisticCounts[type] - 1);
    } else {
      if (isSwitch && prevVote)
        optimisticCounts[prevVote] = Math.max(
          0,
          optimisticCounts[prevVote] - 1,
        );
      optimisticCounts[type] += 1;
    }
    const optimisticVote = isToggleOff ? null : type;

    setPendingVote(type);
    setCounts(optimisticCounts);
    setUserVote(optimisticVote);
    writeCache(path, { counts: optimisticCounts, userVote: optimisticVote });

    if (!isToggleOff) onVote?.();

    try {
      const res = await fetch("/api/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, type }),
      });
      const data = await res.json();

      // POST não retorna counts — mas confirma o userVote
      if ("userVote" in data) {
        setUserVote(data.userVote);
        writeCache(path, { counts: optimisticCounts, userVote: data.userVote });
      }
    } catch {
      // Revert em caso de erro de rede
      setCounts(prevCounts);
      setUserVote(prevVote);
      writeCache(path, { counts: prevCounts, userVote: prevVote });
    } finally {
      setPendingVote(null);
    }
  }

  if (!loaded) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-12 flex flex-col items-center gap-5 border-t border-border/50 pt-10"
    >
      <p className="text-sm font-medium text-muted-foreground">{t("title")}</p>

      <div className="flex items-center gap-3">
        {REACTION_CONFIG.map(({ type, emoji, labelKey }, i) => {
          const isVoted = userVote === type;
          const isPending = pendingVote === type;
          const count = counts[type];

          return (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07, ease: "easeOut" }}
            >
              <motion.button
                onClick={() => handleVote(type)}
                disabled={!!pendingVote}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.93 }}
                animate={
                  isPending ? { scale: [1, 1.18, 0.96, 1.04, 1] } : { scale: 1 }
                }
                transition={
                  isPending
                    ? { duration: 0.4, times: [0, 0.3, 0.6, 0.8, 1] }
                    : { type: "spring", stiffness: 400, damping: 25 }
                }
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  isVoted
                    ? "border-primary/50 bg-primary/10 text-primary shadow-sm shadow-primary/10"
                    : "border-border/50 bg-card/60 text-muted-foreground hover:border-border hover:bg-card hover:text-foreground"
                } ${pendingVote && !isPending ? "cursor-default" : "cursor-pointer"}`}
                aria-label={t(labelKey as "heart" | "fire" | "bulb")}
                aria-pressed={isVoted}
              >
                <motion.span
                  animate={
                    isPending
                      ? {
                          rotate: [0, -12, 12, -6, 0],
                          scale: [1, 1.3, 1.1, 1.2, 1],
                        }
                      : {}
                  }
                  transition={{ duration: 0.45 }}
                  className="text-base leading-none"
                >
                  {emoji}
                </motion.span>
                <span>{t(labelKey as "heart" | "fire" | "bulb")}</span>
                {count > 0 && (
                  <span
                    className={`text-xs font-normal tabular-nums ${
                      isVoted ? "text-primary/60" : "text-muted-foreground/50"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
