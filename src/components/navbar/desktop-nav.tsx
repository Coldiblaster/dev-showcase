"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

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
          Home
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
            {group.items.map((item) => (
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
          </NavSubmenu>
        );
      })}
    </div>
  );
}
