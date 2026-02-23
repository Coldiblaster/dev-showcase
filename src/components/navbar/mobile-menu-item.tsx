"use client";

import { Flame, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface MobileMenuItemProps {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
  badge?: "popular" | "trending";
}

export function MobileMenuItem({
  icon: Icon,
  label,
  sublabel,
  href,
  isActive,
  onClick,
  badge,
}: MobileMenuItemProps) {
  const t = useTranslations("nav");
  const isAnchor = href.startsWith("#");

  const className = `flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm ${
    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
  }`;

  const badgeEl =
    badge === "trending" ? (
      <span className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-violet-500/10 px-1.5 py-0.5 text-[10px] font-medium text-violet-400">
        <TrendingUp className="h-2.5 w-2.5" />
        {t("badgeTrending")}
      </span>
    ) : badge === "popular" ? (
      <span className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-orange-500/10 px-1.5 py-0.5 text-[10px] font-medium text-orange-400">
        <Flame className="h-2.5 w-2.5" />
        {t("badgePopular")}
      </span>
    ) : null;

  if (isAnchor) {
    return (
      <a href={href} onClick={onClick} className={className}>
        <Icon className="h-4 w-4 shrink-0" />
        {label}
        {badgeEl}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      <Icon className="h-4 w-4 shrink-0" />
      {sublabel ? (
        <div className="flex-1">
          <span className="font-medium">{label}</span>
          <p className="text-xs text-muted-foreground/70">{sublabel}</p>
        </div>
      ) : (
        <span className="flex-1">{label}</span>
      )}
      {badgeEl}
    </Link>
  );
}
