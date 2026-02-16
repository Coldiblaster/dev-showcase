import { ChevronRight } from "lucide-react";

/**
 * Item de lista de dicas ou boas práticas.
 *
 * Card simples com ícone de seta, título e descrição.
 * Ideal para listar princípios, dicas ou boas práticas.
 *
 * @param title - Título da dica
 * @param description - Descrição detalhada
 * @param index - Número opcional para exibir (ex: "1", "2")
 *
 * @example
 * ```tsx
 * <TipItem
 *   title="Use Query Keys Consistentes"
 *   description="Sempre use arrays ao invés de strings"
 * />
 * ```
 */
export function TipItem({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index?: number;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm">
      {index !== undefined ? (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
          {index}
        </div>
      ) : (
        <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
      )}
      <div>
        <h3 className="mb-1 text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
