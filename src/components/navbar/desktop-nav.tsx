"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import type { NavCategory } from "./nav-data";
import { navGroups } from "./nav-data";
import { NavSubmenu } from "./nav-submenu";
import { SubmenuItem } from "./submenu-item";

const MAX_PREVIEW_ITEMS = 4;

function CategoryColumn({
  category,
  t,
  pathname,
}: {
  category: NavCategory;
  t: ReturnType<typeof useTranslations<"nav">>;
  pathname: string;
}) {
  const Icon = category.icon;
  const visibleItems = category.featured.slice(0, MAX_PREVIEW_ITEMS);

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center gap-2 px-2">
        <Icon className="h-3.5 w-3.5 text-primary" />
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
          {t(category.labelKey)}
        </p>
      </div>

      <div className="flex-1 space-y-0.5">
        {visibleItems.map((item) => (
          <SubmenuItem
            key={item.href}
            icon={item.icon}
            label={t(item.labelKey)}
            sublabel={item.sublabelKey ? t(item.sublabelKey) : undefined}
            href={item.href}
            isActive={pathname === item.href}
          />
        ))}
      </div>

      <Link
        href={category.href}
        role="menuitem"
        tabIndex={-1}
        className="mt-2 flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
      >
        <span>{t("viewAll", { count: category.totalItems })}</span>
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

export function DesktopNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="hidden items-center gap-1 md:flex">
      <Link href="/">
        <motion.div
          className={`rounded-lg px-3 py-2 text-sm transition-colors ${
            isHome
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {t("home")}
        </motion.div>
      </Link>

      {navGroups.map((group) => {
        if (group.showOnlyOn === "home" && !isHome) return null;

        if (group.href) {
          return (
            <Link key={group.id} href={group.href}>
              <motion.div
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  group.activeCheck(pathname)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t(group.labelKey)}
              </motion.div>
            </Link>
          );
        }

        const hasCategories = !!group.categories?.length;

        return (
          <NavSubmenu
            key={group.id}
            label={t(group.labelKey)}
            icon={group.icon}
            isActive={group.activeCheck(pathname)}
            description={
              group.descriptionKey ? t(group.descriptionKey) : undefined
            }
            wide={hasCategories}
          >
            {/* Flat items (portfolio, contribute) */}
            {group.items?.map((item) => (
              <SubmenuItem
                key={item.href}
                icon={item.icon}
                label={t(item.labelKey)}
                sublabel={item.sublabelKey ? t(item.sublabelKey) : undefined}
                href={item.href}
                isActive={pathname === item.href}
              />
            ))}

            {group.viewAllHref && (
              <Link
                href={group.viewAllHref}
                role="menuitem"
                tabIndex={-1}
                className="mt-2 flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                <span>{t("viewAll", { count: group.viewAllCount ?? 0 })}</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            )}

            {/* Category columns (content) */}
            {hasCategories && (
              <div className="grid grid-cols-3 gap-3">
                {group.categories!.map((category) => (
                  <CategoryColumn
                    key={category.id}
                    category={category}
                    t={t}
                    pathname={pathname}
                  />
                ))}
              </div>
            )}
          </NavSubmenu>
        );
      })}
    </div>
  );
}
