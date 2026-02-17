/**
 * Card para exibir prompts, comandos ou dicas.
 *
 * Card simples com destaque para código/comando e descrição explicativa.
 * Ideal para listar prompts de IA, comandos CLI ou snippets curtos.
 *
 * @param prompt - Comando ou prompt principal
 * @param description - Descrição ou explicação do prompt
 *
 * @example
 * ```tsx
 * <PromptCard
 *   prompt="Crie um componente React com TypeScript"
 *   description="Gera componente funcional tipado"
 * />
 * ```
 */
export function PromptCard({
  prompt,
  description,
}: {
  prompt: string;
  description: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm">
      <code className="mb-2 block break-words font-mono text-sm text-primary">
        {prompt}
      </code>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
