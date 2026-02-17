"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

import { navGroups } from "./nav-data";
import { NavSubmenu } from "./nav-submenu";
import { SubmenuItem } from "./submenu-item";

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

        return (
          <NavSubmenu
            key={group.id}
            label={t(group.labelKey)}
            icon={group.icon}
            isActive={group.activeCheck(pathname)}
            description={
              group.descriptionKey ? t(group.descriptionKey) : undefined
            }
          >
            {/* Flat items (portfolio) */}
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

            {/* Sectioned items (content) */}
            {group.sections?.map((section, idx) => (
              <Fragment key={section.labelKey}>
                {idx > 0 && (
                  <div className="mx-2 my-1.5 border-t border-border/50" />
                )}
                <p className="px-2.5 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {t(section.labelKey)}
                </p>
                {section.items.map((item) => (
                  <SubmenuItem
                    key={item.href}
                    icon={item.icon}
                    label={t(item.labelKey)}
                    sublabel={
                      item.sublabelKey ? t(item.sublabelKey) : undefined
                    }
                    href={item.href}
                    isActive={pathname === item.href}
                  />
                ))}
              </Fragment>
            ))}
          </NavSubmenu>
        );
      })}
    </div>
  );
}
