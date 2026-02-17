"use client";

import Link from "next/link";

interface MobileMenuItemProps {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}

export function MobileMenuItem({
  icon: Icon,
  label,
  sublabel,
  href,
  isActive,
  onClick,
}: MobileMenuItemProps) {
  const isAnchor = href.startsWith("#");

  const className = `flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm ${
    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
  }`;

  if (isAnchor) {
    return (
      <a href={href} onClick={onClick} className={className}>
        <Icon className="h-4 w-4" />
        {label}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      <Icon className="h-4 w-4" />
      {sublabel ? (
        <div>
          <span className="font-medium">{label}</span>
          <p className="text-xs text-muted-foreground/70">{sublabel}</p>
        </div>
      ) : (
        label
      )}
    </Link>
  );
}
