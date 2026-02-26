import { LucideIcon } from "lucide-react";

import { CopyLinkToSection } from "@/components/copy-link-to-section";

/**
 * Cabeçalho de seção com ícone, título e subtítulo.
 *
 * Padrão visual consistente para títulos de seções em páginas de conteúdo.
 * Inclui ícone em badge circular e textos hierarquizados.
 * Se sectionId for passado, exibe ícone de copiar link ao hover.
 *
 * @param icon - Ícone do lucide-react
 * @param title - Título principal da seção
 * @param subtitle - Subtítulo ou descrição curta
 * @param sectionId - ID da seção para permalink (opcional)
 * @param iconBgColor - Cor de fundo do ícone (padrão: bg-primary/10)
 * @param iconColor - Cor do ícone (padrão: text-primary)
 *
 * @example
 * ```tsx
 * <SectionHeader
 *   icon={Zap}
 *   title="Setup Inicial"
 *   subtitle="Configuração básica"
 *   sectionId="setup"
 * />
 * ```
 */
export function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  sectionId,
  iconBgColor = "bg-primary/10",
  iconColor = "text-primary",
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  sectionId?: string;
  iconBgColor?: string;
  iconColor?: string;
}) {
  return (
    <div className="group mb-8 flex items-center gap-3 md:mb-12">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBgColor}`}
        aria-hidden
      >
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            {title}
          </h2>
          {sectionId && (
            <CopyLinkToSection sectionId={sectionId} className="shrink-0" />
          )}
        </div>
        {subtitle && (
          <p className="font-mono text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
