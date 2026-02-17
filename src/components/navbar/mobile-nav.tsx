"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Fragment, useEffect } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import { MobileMenuItem } from "./mobile-menu-item";
import { navGroups } from "./nav-data";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isOpen) {
      const scrollY = window.scrollY;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
    } else {
      const top = body.style.top;
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      if (top) {
        window.scrollTo(0, parseInt(top, 10) * -1);
      }
    }

    return () => {
      const top = body.style.top;
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      if (top) {
        window.scrollTo(0, parseInt(top, 10) * -1);
      }
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          role="navigation"
          aria-label="Menu principal"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "calc(100dvh - 57px)", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden border-t border-border/50 md:hidden"
        >
          <ScrollArea className="h-full">
          <div className="flex flex-col gap-1 p-4">
            <Link
              href="/"
              onClick={onClose}
              className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                isHome
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Home
            </Link>

            {navGroups.map((group) => {
              if (group.showOnlyOn === "home" && !isHome) return null;

              return (
                <div key={group.id}>
                  {/* Flat items (portfolio) */}
                  {group.items && (
                    <>
                      <p className="mt-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">
                        {t(group.labelKey)}
                      </p>
                      {group.items.map((item) => (
                        <MobileMenuItem
                          key={item.href}
                          icon={item.icon}
                          label={t(item.labelKey)}
                          sublabel={
                            item.sublabelKey
                              ? t(item.sublabelKey)
                              : undefined
                          }
                          href={item.href}
                          isActive={pathname === item.href}
                          onClick={onClose}
                        />
                      ))}
                    </>
                  )}

                  {/* Sectioned items (content) */}
                  {group.sections?.map((section) => (
                    <Fragment key={section.labelKey}>
                      <p className="mt-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">
                        {t(section.labelKey)}
                      </p>
                      {section.items.map((item) => (
                        <MobileMenuItem
                          key={item.href}
                          icon={item.icon}
                          label={t(item.labelKey)}
                          sublabel={
                            item.sublabelKey
                              ? t(item.sublabelKey)
                              : undefined
                          }
                          href={item.href}
                          isActive={pathname === item.href}
                          onClick={onClose}
                        />
                      ))}
                    </Fragment>
                  ))}
                </div>
              );
            })}
          </div>
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
