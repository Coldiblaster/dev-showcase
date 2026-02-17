import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SearchTriggerProps {
  onClick: () => void;
  open: boolean;
  isMac: boolean;
  label: string;
  placeholder: string;
}

export function SearchTrigger({
  onClick,
  open,
  isMac,
  label,
  placeholder,
}: SearchTriggerProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="gap-2 rounded-lg border-border bg-card hover:border-primary/50 hover:bg-card hover:text-primary xl:w-60 xl:justify-start"
      aria-label={label}
      aria-haspopup="dialog"
      aria-expanded={open}
    >
      <Search className="h-4 w-4" />
      <span className="hidden text-muted-foreground xl:inline">
        {placeholder}
      </span>
      <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium xl:flex">
        {isMac ? (
          <>
            <span className="text-base">⌘</span>K
          </>
        ) : (
          <>
            <span className="text-xs">Ctrl</span>+K
          </>
        )}
      </kbd>
    </Button>
  );
}
