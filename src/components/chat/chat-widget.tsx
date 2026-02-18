"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";

import { useScrollLock } from "@/hooks/use-scroll-lock";

import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatMessages } from "./chat-messages";
import { type ChatMessage, MAX_MESSAGES } from "./types";

const FULLSCREEN_QUERY = "(max-width: 420px)";

export function ChatWidget() {
  const t = useTranslations("chat");
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(FULLSCREEN_QUERY);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useScrollLock(open && isMobile);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-slot='scroll-area-viewport']",
    );
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chat-widget", handler);
    return () => window.removeEventListener("open-chat-widget", handler);
  }, []);

  const limitReached = useMemo(
    () => messages.filter((m) => m.role === "user").length >= MAX_MESSAGES,
    [messages],
  );

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isStreaming || limitReached) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages
            .filter((m) => m.role === "user" || m.content !== t("error"))
            .map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      const assistantTimestamp = new Date();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", timestamp: assistantTimestamp },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        assistantContent += decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantContent,
            timestamp: assistantTimestamp,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("error"), timestamp: new Date() },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  const suggestions = t.raw("suggestions") as string[];

  const handlePanelKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = e.currentTarget.querySelectorAll<HTMLElement>(
        'button, input, a, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [setOpen],
  );

  return (
    <>
      {/* FAB button */}
      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        className={`fab-floating fixed bottom-4 right-4 z-50 hidden h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-colors hover:bg-primary/90 hover:opacity-100 md:bottom-6 md:right-6 md:flex md:h-14 md:w-14 md:shadow-lg md:shadow-primary/25 ${open ? "opacity-100" : "opacity-70"}`}
        whileHover={{ scale: 1.05, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? t("close") : t("open")}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label={t("title")}
            onKeyDown={handlePanelKeyDown}
            className="fixed bottom-24 right-6 z-60 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl max-[420px]:inset-0 max-[420px]:bottom-0 max-[420px]:right-0 max-[420px]:h-full max-[420px]:w-full max-[420px]:rounded-none"
          >
            <ChatHeader
              title={t("title")}
              subtitle={t("subtitle")}
              closeLabel={t("close")}
              onClose={() => setOpen(false)}
            />

            <ChatMessages
              messages={messages}
              suggestions={suggestions}
              welcomeText={t("welcome")}
              scrollAreaRef={scrollAreaRef}
              onSuggestionClick={(suggestion) => {
                setInput(suggestion);
                inputRef.current?.focus();
              }}
            />

            <ChatInput
              input={input}
              isStreaming={isStreaming}
              limitReached={limitReached}
              limitText={t("limitReached")}
              placeholder={t("placeholder")}
              contactText={t("goToContact")}
              sendLabel={t("send")}
              inputRef={inputRef}
              onInputChange={setInput}
              onSend={handleSend}
              onClose={() => setOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
