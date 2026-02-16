"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Briefcase,
  ChevronDown,
  Code2,
  Database,
  FolderKanban,
  Globe,
  Mail,
  Palette,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { LanguageSwitcher } from "./language-switcher";

function NavSubmenu({
  label,
  icon: Icon,
  isActive,
  description,
  children,
}: {
  label: string;
  icon: React.ElementType;
  isActive?: boolean;
  description?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

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
    >
      <motion.button
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

function SubmenuItem({
  icon: Icon,
  label,
  sublabel,
  onClick,
  href,
  isActive,
}: {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  onClick?: () => void;
  href?: string;
  isActive?: boolean;
}) {
  const content = (
    <>
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
          isActive
            ? "bg-primary/20 text-primary"
            : "bg-secondary text-muted-foreground"
        }`}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0">
        <p
          className={`truncate text-sm ${isActive ? "font-medium text-primary" : "text-foreground"}`}
        >
          {label}
        </p>
        {sublabel && (
          <p className="truncate text-xs text-muted-foreground">{sublabel}</p>
        )}
      </div>
    </>
  );

  const className =
    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-secondary";

  if (href) {
    return (
      <motion.a href={href} className={className} whileHover={{ x: 2 }}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={className}
      whileHover={{ x: 2 }}
    >
      {content}
    </motion.button>
  );
}

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isHome = pathname === "/";
  const isImplementations = pathname?.startsWith("/implementacoes");
  const isDicas = pathname?.startsWith("/dicas");

  const portfolioSections = [
    { icon: User, label: t("about"), href: "#about" },
    { icon: FolderKanban, label: t("projects"), href: "#projects" },
    { icon: Briefcase, label: t("experience"), href: "#experience" },
    { icon: Sparkles, label: t("aiInnovation"), href: "#ai" },
    { icon: Mail, label: t("contact"), href: "#contact" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/">
          <motion.div
            className="flex items-center gap-2 text-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Code2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-mono text-sm font-bold tracking-tight">
              {"<VB />"}
            </span>
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {/* Home */}
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

          {/* Portfolio submenu */}
          {isHome && (
            <NavSubmenu label={t("portfolio")} icon={FolderKanban}>
              {portfolioSections.map((item) => (
                <SubmenuItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                />
              ))}
            </NavSubmenu>
          )}

          {/* Implementations submenu */}
          <NavSubmenu
            label={t("implementations")}
            icon={Wrench}
            isActive={isImplementations}
            description={t("implementationsDesc")}
          >
            <SubmenuItem
              icon={Globe}
              label={t("i18nShowcase")}
              sublabel={t("i18nShowcaseDesc")}
              href="/implementacoes/i18n"
              isActive={pathname === "/implementacoes/i18n"}
            />
          </NavSubmenu>

          {/* Tips & Guides submenu */}
          <NavSubmenu
            label={t("tips")}
            icon={BookOpen}
            isActive={isDicas}
            description={t("tipsDesc")}
          >
            <SubmenuItem
              icon={Sparkles}
              label={t("aiTips")}
              sublabel={t("aiTipsDesc")}
              href="/dicas/ai-tips"
              isActive={pathname === "/dicas/ai-tips"}
            />
            <SubmenuItem
              icon={Palette}
              label={t("tailwindTips")}
              sublabel={t("tailwindTipsDesc")}
              href="/dicas/tailwind-tips"
              isActive={pathname === "/dicas/tailwind-tips"}
            />
            <SubmenuItem
              icon={Database}
              label={t("reactQueryTips")}
              sublabel={t("reactQueryTipsDesc")}
              href="/dicas/react-query-tips"
              isActive={pathname === "/dicas/react-query-tips"}
            />
          </NavSubmenu>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          {/* Mobile toggle */}
          <motion.button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1">
              <motion.span
                animate={
                  isMobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }
                }
                className="block h-0.5 w-4 bg-current"
              />
              <motion.span
                animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-4 bg-current"
              />
              <motion.span
                animate={
                  isMobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }
                }
                className="block h-0.5 w-4 bg-current"
              />
            </div>
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/50 md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {/* Home */}
              <Link href="/">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                    isHome
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  Home
                </button>
              </Link>

              {/* Portfolio group */}
              {isHome && (
                <>
                  <p className="mt-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">
                    {t("portfolio")}
                  </p>
                  {portfolioSections.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-muted-foreground"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </a>
                  ))}
                </>
              )}

              {/* Implementations group */}
              <p className="mt-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">
                {t("implementations")}
              </p>
              <Link href="/implementacoes/i18n">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm ${
                    pathname === "/implementacoes/i18n"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  <div>
                    <span className="font-medium">{t("i18nShowcase")}</span>
                    <p className="text-xs text-muted-foreground/70">
                      {t("i18nShowcaseDesc")}
                    </p>
                  </div>
                </button>
              </Link>

              {/* Tips & Guides group */}
              <p className="mt-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">
                {t("tips")}
              </p>
              <Link href="/dicas/ai-tips">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm ${
                    pathname === "/dicas/ai-tips"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <div>
                    <span className="font-medium">{t("aiTips")}</span>
                    <p className="text-xs text-muted-foreground/70">
                      {t("aiTipsDesc")}
                    </p>
                  </div>
                </button>
              </Link>
              <Link href="/dicas/tailwind-tips">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm ${
                    pathname === "/dicas/tailwind-tips"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <Palette className="h-4 w-4" />
                  <div>
                    <span className="font-medium">{t("tailwindTips")}</span>
                    <p className="text-xs text-muted-foreground/70">
                      {t("tailwindTipsDesc")}
                    </p>
                  </div>
                </button>
              </Link>
              <Link href="/dicas/react-query-tips">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm ${
                    pathname === "/dicas/react-query-tips"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <Database className="h-4 w-4" />
                  <div>
                    <span className="font-medium">{t("reactQueryTips")}</span>
                    <p className="text-xs text-muted-foreground/70">
                      {t("reactQueryTipsDesc")}
                    </p>
                  </div>
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
