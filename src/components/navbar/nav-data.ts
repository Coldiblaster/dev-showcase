import {
  BookOpen,
  Bot,
  Briefcase,
  Database,
  FolderKanban,
  Globe,
  Layers,
  Mail,
  Palette,
  Search,
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
  | "content"
  | "contentDesc"
  | "seoShowcase"
  | "seoShowcaseDesc"
  | "aiChatbot"
  | "aiChatbotDesc"
  | "sectionImplementations"
  | "sectionTips"
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

export interface NavSection {
  labelKey: NavKey;
  items: NavItem[];
}

export interface NavGroup {
  id: string;
  labelKey: NavKey;
  descriptionKey?: NavKey;
  icon: LucideIcon;
  items?: NavItem[];
  sections?: NavSection[];
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
    pathname.startsWith("/implementacoes") || pathname.startsWith("/dicas"),
  sections: [
    {
      labelKey: "sectionImplementations",
      items: [
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
        {
          icon: Bot,
          labelKey: "aiChatbot",
          sublabelKey: "aiChatbotDesc",
          href: "/implementacoes/ai-chatbot",
        },
      ],
    },
    {
      labelKey: "sectionTips",
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
    },
  ],
};

export const navGroups: NavGroup[] = [portfolioGroup, contentGroup];
