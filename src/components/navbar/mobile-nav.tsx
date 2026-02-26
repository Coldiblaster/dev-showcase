"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { ScrollArea } from "@/components/ui/scroll-area";
import { CHANGELOG } from "@/data/changelog";
import { useScrollLock } from "@/hooks/use-scroll-lock";

const LATEST_DATE = new Date(CHANGELOG[0].date);
const IS_RECENT =
  (Date.now() - LATEST_DATE.getTime()) / (1000 * 60 * 60 * 24) < 14;

import { MobileMenuItem } from "./mobile-menu-item";
import { navGroups } from "./nav-data";

const HEADER_HEIGHT = "57px";
const MAX_PREVIEW_ITEMS = 4;

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  badgePaths: Record<string, "popular" | "trending">;
}

export function MobileNav({ isOpen, onClose, badgePaths }: MobileNavProps) {
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
          className="overflow-hidden border-t border-border/50 lg:hidden"
        >
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-1 p-4">
              {navGroups
                .find((g) => g.id === "home")
                ?.items?.map((item) => (
                  <MobileMenuItem
                    key={item.href}
                    icon={item.icon}
                    label={t(item.labelKey)}
                    sublabel={
                      item.sublabelKey ? t(item.sublabelKey) : undefined
                    }
                    href={item.href}
                    isActive={pathname === "/" && item.href === "/"}
                    onClick={onClose}
                    badge={badgePaths[item.href]}
                  />
                ))}

              <Link
                href="/novidades"
                onClick={onClose}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  pathname === "/novidades"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Sparkles className="h-4 w-4 shrink-0" />
                {t("changelog")}
                {IS_RECENT && pathname !== "/novidades" && (
                  <span className="ml-auto flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                )}
              </Link>

              {navGroups
                .filter((g) => g.id !== "home")
                .map((group) => {
                  if (group.showOnlyOn === "home" && !isHome) return null;

                  if (group.href) {
                    return (
                      <Link
                        key={group.id}
                        href={group.href}
                        onClick={onClose}
                        className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                          group.activeCheck(pathname)
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {t(group.labelKey)}
                      </Link>
                    );
                  }

                  return (
                    <div key={group.id}>
                      {/* Flat items (portfolio, contribute) */}
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
                              badge={badgePaths[item.href]}
                            />
                          ))}

                          {group.viewAllHref && (
                            <Link
                              href={group.viewAllHref}
                              onClick={onClose}
                              className="mx-1 mt-1 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                            >
                              <span>
                                {t("viewAll", {
                                  count: group.viewAllCount ?? 0,
                                })}
                              </span>
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          )}
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

                            {category.featured
                              .slice(0, MAX_PREVIEW_ITEMS)
                              .map((item) => (
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
                                  badge={badgePaths[item.href]}
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
