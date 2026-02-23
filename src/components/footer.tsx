"use client";

import { motion, useInView } from "framer-motion";
import { Code2, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { OnlineCounter } from "@/components/online-counter";
import { Separator } from "@/components/ui/separator";
import { PERSONAL } from "@/lib/constants";

const SOCIAL_LINKS_BASE = [
  { icon: Github, href: PERSONAL.github, labelKey: null, label: "GitHub" },
  {
    icon: Linkedin,
    href: PERSONAL.linkedin,
    labelKey: null,
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: `mailto:${PERSONAL.email}`,
    labelKey: "emailLabel" as const,
    label: "",
  },
];

export function Footer() {
  const t = useTranslations("footer");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer
      className="border-t border-border px-6 pb-20 pt-12 md:py-16"
      ref={ref}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between"
        >
          <a href="/" className="flex items-center gap-2 text-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Code2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-mono text-sm font-bold tracking-tight">
              {"<VB />"}
            </span>
          </a>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS_BASE.map(({ icon: Icon, href, labelKey, label }) => {
              const ariaLabel = labelKey ? t(labelKey) : label;
              return (
                <motion.a
                  key={ariaLabel}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={ariaLabel}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        <Separator className="mb-8" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between"
        >
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <p className="font-mono text-xs text-muted-foreground">
              {t("built")}
            </p>
            <OnlineCounter />
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/privacidade"
              className="font-mono text-xs text-muted-foreground underline-offset-2 outline-none hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("privacy")}
            </Link>
            <p className="font-mono text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} {PERSONAL.fullName}.{" "}
              {t("rights")}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
