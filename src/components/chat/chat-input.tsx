import { Loader2, Mail, Send } from "lucide-react";
import type { RefObject } from "react";

import { Button } from "@/components/ui/button";

interface ChatInputProps {
  input: string;
  isStreaming: boolean;
  limitReached: boolean;
  limitText: string;
  placeholder: string;
  contactText: string;
  sendLabel: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onClose: () => void;
}

export function ChatInput({
  input,
  isStreaming,
  limitReached,
  limitText,
  placeholder,
  contactText,
  sendLabel,
  inputRef,
  onInputChange,
  onSend,
  onClose,
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-border px-4 py-3">
      {limitReached ? (
        <p className="text-center text-xs text-muted-foreground">{limitText}</p>
      ) : (
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
            placeholder={placeholder}
            maxLength={500}
            aria-label={placeholder}
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground/50 outline-none disabled:opacity-50"
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={onSend}
            disabled={!input.trim() || isStreaming}
            className="h-8 w-8 shrink-0 text-primary hover:bg-primary/10"
            aria-label={sendLabel}
          >
            {isStreaming ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
      <a
        href="/#contact"
        onClick={onClose}
        className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground/60 transition-colors hover:text-primary"
        aria-label={contactText}
      >
        <Mail className="h-3 w-3" />
        {contactText}
      </a>
    </div>
  );
}
