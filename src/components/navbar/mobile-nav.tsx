"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useScrollLock } from "@/hooks/use-scroll-lock";

import { MobileMenuItem } from "./mobile-menu-item";
import { navGroups } from "./nav-data";

const HEADER_HEIGHT = "57px";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          role="navigation"
          aria-label={t("mainMenu")}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: `calc(100dvh - ${HEADER_HEIGHT} - 3.5rem)`,
            opacity: 1,
          }}
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
                {t("home")}
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
                              item.sublabelKey ? t(item.sublabelKey) : undefined
                            }
                            href={item.href}
                            isActive={pathname === item.href}
                            onClick={onClose}
                          />
                        ))}
                      </>
                    )}

                    {/* Category sections (content) */}
                    {group.categories?.map((category) => {
                      const CategoryIcon = category.icon;
                      return (
                        <div key={category.id}>
                          <div className="mt-4 flex items-center gap-2 px-3 py-1">
                            <CategoryIcon className="h-3.5 w-3.5 text-primary" />
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">
                              {t(category.labelKey)}
                            </p>
                          </div>

                          {category.featured.map((item) => (
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

                          <Link
                            href={category.href}
                            onClick={onClose}
                            className="mx-1 mt-1 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                          >
                            <span>
                              {t("viewAll", { count: category.totalItems })}
                            </span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      );
                    })}
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
