import { LucideIcon } from "lucide-react";

/**
 * Cabeçalho de seção com ícone, título e subtítulo.
 *
 * Padrão visual consistente para títulos de seções em páginas de conteúdo.
 * Inclui ícone em badge circular e textos hierarquizados.
 *
 * @param icon - Ícone do lucide-react
 * @param title - Título principal da seção
 * @param subtitle - Subtítulo ou descrição curta
 * @param iconBgColor - Cor de fundo do ícone (padrão: bg-primary/10)
 * @param iconColor - Cor do ícone (padrão: text-primary)
 *
 * @example
 * ```tsx
 * <SectionHeader
 *   icon={Zap}
 *   title="Setup Inicial"
 *   subtitle="Configuração básica"
 * />
 * ```
 */
export function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  iconBgColor = "bg-primary/10",
  iconColor = "text-primary",
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  iconBgColor?: string;
  iconColor?: string;
}) {
  return (
    <div className="mb-12 flex items-center gap-3">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBgColor}`}
      >
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="font-mono text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
