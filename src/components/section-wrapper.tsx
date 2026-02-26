import { cn, MAX_WIDTH_MAP, type MaxWidth } from "@/lib/utils";

/** Props do wrapper de seção com largura máxima configurável. */
interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  maxWidth?: MaxWidth;
  variant?: "default" | "alternate";
  className?: string;
}

/** Envolve o conteúdo em uma seção com padding e largura máxima. */
export function SectionWrapper({
  children,
  id,
  maxWidth = "5xl",
  variant = "default",
  className,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "px-4 py-12 sm:px-6 md:py-20",
        variant === "alternate" && "bg-secondary/20",
        className,
      )}
    >
      <div className={cn("mx-auto", MAX_WIDTH_MAP[maxWidth])}>{children}</div>
    </section>
  );
}
