interface SearchFooterProps {
  navigateText: string;
  selectText: string;
  closeText: string;
}

export function SearchFooter({
  navigateText,
  selectText,
  closeText,
}: SearchFooterProps) {
  return (
    <div className="flex items-center justify-between border-t p-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-4">
        <kbd className="flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono">
          ↑↓
        </kbd>
        <span>{navigateText}</span>
      </div>
      <div className="flex items-center gap-4">
        <kbd className="flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono">
          ↵
        </kbd>
        <span>{selectText}</span>
      </div>
      <div className="flex items-center gap-4">
        <kbd className="flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono">
          ESC
        </kbd>
        <span>{closeText}</span>
      </div>
    </div>
  );
}
