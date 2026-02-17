import { Bot, X } from "lucide-react";

interface ChatHeaderProps {
  title: string;
  subtitle: string;
  closeLabel: string;
  onClose: () => void;
}

export function ChatHeader({
  title,
  subtitle,
  closeLabel,
  onClose,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-3 border-b border-border bg-secondary/50 px-5 py-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
        <Bot className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <button
        onClick={onClose}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        aria-label={closeLabel}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
