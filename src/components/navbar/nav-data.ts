import {
  BookOpen,
  Briefcase,
  Database,
  FolderKanban,
  Globe,
  Mail,
  Palette,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavKey =
  | "about"
  | "projects"
  | "experience"
  | "aiInnovation"
  | "contact"
  | "i18nShowcase"
  | "i18nShowcaseDesc"
  | "aiTips"
  | "aiTipsDesc"
  | "tailwindTips"
  | "tailwindTipsDesc"
  | "reactQueryTips"
  | "reactQueryTipsDesc"
  | "portfolio"
  | "implementations"
  | "implementationsDesc"
  | "tips"
  | "tipsDesc"
  | "devResources"
  | "devResourcesDesc"
  | "openMenu"
  | "closeMenu";

export interface NavItem {
  icon: LucideIcon;
  labelKey: NavKey;
  sublabelKey?: NavKey;
  href: string;
}

export interface NavGroup {
  id: string;
  labelKey: NavKey;
  descriptionKey?: NavKey;
  icon: LucideIcon;
  items: NavItem[];
  activeCheck: (pathname: string) => boolean;
  showOnlyOn?: "home";
}

export const portfolioGroup: NavGroup = {
  id: "portfolio",
  labelKey: "portfolio",
  icon: FolderKanban,
  showOnlyOn: "home",
  activeCheck: () => false,
  items: [
    { icon: User, labelKey: "about", href: "#about" },
    { icon: FolderKanban, labelKey: "projects", href: "#projects" },
    { icon: Briefcase, labelKey: "experience", href: "#experience" },
    { icon: Sparkles, labelKey: "aiInnovation", href: "#ai" },
    { icon: Mail, labelKey: "contact", href: "#contact" },
  ],
};

export const implementationsGroup: NavGroup = {
  id: "implementations",
  labelKey: "implementations",
  descriptionKey: "implementationsDesc",
  icon: Wrench,
  activeCheck: (pathname) => pathname.startsWith("/implementacoes"),
  items: [
    {
      icon: Globe,
      labelKey: "i18nShowcase",
      sublabelKey: "i18nShowcaseDesc",
      href: "/implementacoes/i18n",
    },
  ],
};

export const tipsGroup: NavGroup = {
  id: "tips",
  labelKey: "tips",
  descriptionKey: "tipsDesc",
  icon: BookOpen,
  activeCheck: (pathname) => pathname.startsWith("/dicas"),
  items: [
    {
      icon: Sparkles,
      labelKey: "aiTips",
      sublabelKey: "aiTipsDesc",
      href: "/dicas/ai-tips",
    },
    {
      icon: Palette,
      labelKey: "tailwindTips",
      sublabelKey: "tailwindTipsDesc",
      href: "/dicas/tailwind-tips",
    },
    {
      icon: Database,
      labelKey: "reactQueryTips",
      sublabelKey: "reactQueryTipsDesc",
      href: "/dicas/react-query-tips",
    },
    {
      icon: Wrench,
      labelKey: "devResources",
      sublabelKey: "devResourcesDesc",
      href: "/dicas/dev-resources",
    },
  ],
};

export const navGroups: NavGroup[] = [
  portfolioGroup,
  implementationsGroup,
  tipsGroup,
];
