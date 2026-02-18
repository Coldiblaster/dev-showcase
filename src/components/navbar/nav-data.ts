import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Briefcase,
  Code2,
  FolderKanban,
  Globe,
  Layers,
  Mail,
  Search,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";

import { getContentByCategory } from "@/data/content";

export type NavKey =
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
  | "tools"
  | "toolsDesc"
  | "content"
  | "contentDesc"
  | "seoShowcase"
  | "seoShowcaseDesc"
  | "aiChatbot"
  | "aiChatbotDesc"
  | "sectionImplementations"
  | "sectionTips"
  | "sectionTools"
  | "devResources"
  | "devResourcesDesc"
  | "securityTips"
  | "securityTipsDesc"
  | "codeReview"
  | "codeReviewDesc"
  | "openMenu"
  | "closeMenu"
  | "viewAll";

export interface NavItem {
  icon: LucideIcon;
  labelKey: NavKey;
  sublabelKey?: NavKey;
  href: string;
}

export interface NavCategory {
  id: string;
  labelKey: NavKey;
  icon: LucideIcon;
  href: string;
  featured: NavItem[];
  totalItems: number;
}

export interface NavGroup {
  id: string;
  labelKey: NavKey;
  descriptionKey?: NavKey;
  icon: LucideIcon;
  items?: NavItem[];
  categories?: NavCategory[];
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

export const contentGroup: NavGroup = {
  id: "content",
  labelKey: "content",
  descriptionKey: "contentDesc",
  icon: Layers,
  activeCheck: (pathname) =>
    pathname.startsWith("/implementacoes") ||
    pathname.startsWith("/dicas") ||
    pathname.startsWith("/ferramentas"),
  categories: [
    {
      id: "implementations",
      labelKey: "sectionImplementations",
      icon: Globe,
      href: "/implementacoes",
      totalItems: getContentByCategory("implementation").length,
      featured: [
        {
          icon: Globe,
          labelKey: "i18nShowcase",
          sublabelKey: "i18nShowcaseDesc",
          href: "/implementacoes/i18n",
        },
        {
          icon: Search,
          labelKey: "seoShowcase",
          sublabelKey: "seoShowcaseDesc",
          href: "/implementacoes/seo",
        },
      ],
    },
    {
      id: "tips",
      labelKey: "sectionTips",
      icon: Sparkles,
      href: "/dicas",
      totalItems: getContentByCategory("guide").length,
      featured: [
        {
          icon: Sparkles,
          labelKey: "aiTips",
          sublabelKey: "aiTipsDesc",
          href: "/dicas/ai-tips",
        },
        {
          icon: Wrench,
          labelKey: "devResources",
          sublabelKey: "devResourcesDesc",
          href: "/dicas/dev-resources",
        },
      ],
    },
    {
      id: "tools",
      labelKey: "sectionTools",
      icon: Code2,
      href: "/ferramentas",
      totalItems: getContentByCategory("tool").length,
      featured: [
        {
          icon: Code2,
          labelKey: "codeReview",
          sublabelKey: "codeReviewDesc",
          href: "/ferramentas/code-review",
        },
      ],
    },
  ],
};

export const navGroups: NavGroup[] = [portfolioGroup, contentGroup];
