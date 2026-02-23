"use client";

import { motion } from "framer-motion";
import { Flame, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface SubmenuItemProps {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  onClick?: () => void;
  href?: string;
  isActive?: boolean;
  badge?: "popular" | "trending";
}

export function SubmenuItem({
  icon: Icon,
  label,
  sublabel,
  onClick,
  href,
  isActive,
  badge,
}: SubmenuItemProps) {
  const t = useTranslations("nav");
  const content = (
    <>
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
          isActive
            ? "bg-primary/20 text-primary"
            : "bg-secondary text-muted-foreground"
        }`}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm ${isActive ? "font-medium text-primary" : "text-foreground"}`}
        >
          {label}
        </p>
        {sublabel && (
          <p className="truncate text-xs text-muted-foreground">{sublabel}</p>
        )}
      </div>
      {badge === "trending" && (
        <span className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-violet-500/10 px-1.5 py-0.5 text-[10px] font-medium text-violet-400">
          <TrendingUp className="h-2.5 w-2.5" />
          {t("badgeTrending")}
        </span>
      )}
      {badge === "popular" && (
        <span className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-orange-500/10 px-1.5 py-0.5 text-[10px] font-medium text-orange-400">
          <Flame className="h-2.5 w-2.5" />
          {t("badgePopular")}
        </span>
      )}
    </>
  );

  const className =
    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-secondary";

  if (href) {
    return (
      <motion.div whileHover={{ x: 2 }}>
        <Link href={href} role="menuitem" tabIndex={-1} className={className}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      role="menuitem"
      tabIndex={-1}
      onClick={onClick}
      className={className}
      whileHover={{ x: 2 }}
    >
      {content}
    </motion.button>
  );
}
