import React from "react";

type CardBlurRadius = "lg" | "xl" | "2xl";
type CardBlurPadding = "p-3" | "p-4" | "p-5" | "p-6" | "p-8";

interface CardBlurProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  radius?: CardBlurRadius;
  padding?: CardBlurPadding;
  bg?: string; // permite bg-card, bg-card/50, bg-secondary/50, etc
  border?: string; // permite border-border, border-primary/20, etc
}

/**
 * CardBlur: Wrapper para cards com fundo blur, borda e padding padrão.
 */
export function CardBlur({
  children,
  className = "",
  radius = "2xl",
  padding = "p-6",
  bg = "bg-card/50",
  border = "border-border",
  ...props
}: CardBlurProps) {
  const radiusClass =
    radius === "lg"
      ? "rounded-lg"
      : radius === "xl"
        ? "rounded-xl"
        : "rounded-2xl";
  return (
    <div
      className={[
        radiusClass,
        "border",
        border,
        bg,
        padding,
        "backdrop-blur-sm",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
