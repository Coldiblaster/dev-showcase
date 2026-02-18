import { Bot, Loader2 } from "lucide-react";
import { type RefObject, useCallback } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import { formatMessage } from "./format-message";
import type { ChatMessage } from "./types";

interface ChatMessagesProps {
  messages: ChatMessage[];
  suggestions: string[];
  welcomeText: string;
  scrollAreaRef: RefObject<HTMLDivElement | null>;
  onSuggestionClick: (suggestion: string) => void;
}

export function ChatMessages({
  messages,
  suggestions,
  welcomeText,
  scrollAreaRef,
  onSuggestionClick,
}: ChatMessagesProps) {
  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, []);

  return (
    <ScrollArea ref={scrollAreaRef} className="min-h-0 flex-1 overflow-hidden">
      <div role="log" aria-live="polite" className="flex flex-col gap-3 px-4 py-4">
        {messages.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {welcomeText}
            </p>
            <div className="flex w-full flex-col gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => onSuggestionClick(suggestion)}
                  className="rounded-xl border border-border bg-secondary/50 px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={`${msg.timestamp.getTime()}-${msg.role}`}
            className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed wrap-break-word ${
                msg.role === "user"
                  ? "rounded-br-md bg-primary text-primary-foreground"
                  : "rounded-bl-md bg-secondary text-foreground"
              }`}
            >
              {msg.content ? (
                formatMessage(msg.content)
              ) : (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>
            {msg.content && (
              <span className="mt-1 px-1 text-[10px] text-muted-foreground">
                {formatTime(msg.timestamp)}
              </span>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
