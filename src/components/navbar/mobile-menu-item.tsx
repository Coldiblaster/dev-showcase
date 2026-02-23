"use client";

import { Flame } from "lucide-react";
import Link from "next/link";

interface MobileMenuItemProps {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
  isPopular?: boolean;
}

export function MobileMenuItem({
  icon: Icon,
  label,
  sublabel,
  href,
  isActive,
  onClick,
  isPopular,
}: MobileMenuItemProps) {
  const isAnchor = href.startsWith("#");

  const className = `flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm ${
    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
  }`;

  const popularBadge = isPopular && (
    <span className="ml-auto flex shrink-0 items-center gap-0.5 rounded-full bg-orange-500/10 px-1.5 py-0.5 text-[10px] font-medium text-orange-400">
      <Flame className="h-2.5 w-2.5" />
      Popular
    </span>
  );

  if (isAnchor) {
    return (
      <a href={href} onClick={onClick} className={className}>
        <Icon className="h-4 w-4 shrink-0" />
        {label}
        {popularBadge}
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
      {popularBadge}
    </Link>
  );
}
