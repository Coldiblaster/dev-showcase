import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Code2,
  Info,
  Sparkles,
} from "lucide-react";

/** Configuração de ícones e cores por severidade de problema. */
export const SEVERITY_CONFIG = {
  error: {
    icon: AlertCircle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
  },
  info: {
    icon: Info,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
};

/** Ícones exibidos nos passos de "Como funciona". */
export const HOW_IT_WORKS_ICONS = [Code2, Sparkles, CheckCircle2];
