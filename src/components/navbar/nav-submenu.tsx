"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface NavSubmenuProps {
  label: string;
  icon: React.ElementType;
  isActive?: boolean;
  description?: string;
  children: React.ReactNode;
}

export function NavSubmenu({
  label,
  icon: Icon,
  isActive,
  description,
  children,
}: NavSubmenuProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (
        !open &&
        (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")
      ) {
        e.preventDefault();
        setOpen(true);
        return;
      }

      if (!open) return;

      const items =
        menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
      if (!items?.length) return;

      const currentIndex = Array.from(items).findIndex(
        (item) => item === document.activeElement,
      );

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[next].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[prev].focus();
      }
    },
    [open],
  );

  useEffect(() => {
    if (open && menuRef.current) {
      const firstItem =
        menuRef.current.querySelector<HTMLElement>('[role="menuitem"]');
      firstItem?.focus();
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onKeyDown={handleKeyDown}
    >
      <motion.button
        ref={triggerRef}
        aria-haspopup="true"
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors ${
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Icon className="h-3.5 w-3.5" />
        <span>{label}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            role="menu"
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 mt-1 min-w-70 overflow-hidden rounded-xl border border-border bg-card/95 shadow-xl backdrop-blur-lg"
          >
            {description && (
              <div className="border-b border-border/50 px-3.5 py-2.5">
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            )}
            <div className="p-1.5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
