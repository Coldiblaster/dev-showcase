import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  BarChart3,
  Beaker,
  Blocks,
  BookOpen,
  Bot,
  Braces,
  Briefcase,
  Code2,
  Component,
  Database,
  FileCode,
  FolderKanban,
  GitBranch,
  Github,
  Globe,
  Heart,
  Layers,
  Mail,
  Paintbrush,
  Regex,
  Route,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  SquareStack,
  User,
  Wrench,
} from "lucide-react";

import { getContentByCategory } from "@/data/content";

export type NavKey =
  | "about"
  | "techStack"
  | "github"
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
  | "analyticsShowcase"
  | "analyticsShowcaseDesc"
  | "testingShowcase"
  | "testingShowcaseDesc"
  | "contactFormShowcase"
  | "contactFormShowcaseDesc"
  | "sectionImplementations"
  | "sectionTips"
  | "sectionTools"
  | "devResources"
  | "devResourcesDesc"
  | "securityTips"
  | "securityTipsDesc"
  | "privacyTips"
  | "privacyTipsDesc"
  | "codeReview"
  | "codeReviewDesc"
  | "regexPlayground"
  | "regexPlaygroundDesc"
  | "jsonTool"
  | "jsonToolDesc"
  | "tsPatterns"
  | "tsPatternsDesc"
  | "gitWorkflow"
  | "gitWorkflowDesc"
  | "reactPatterns"
  | "reactPatternsDesc"
  | "nextjsAppRouter"
  | "nextjsAppRouterDesc"
  | "stateManagement"
  | "stateManagementDesc"
  | "contribute"
  | "contributeDesc"
  | "sectionProject"
  | "sectionReference"
  | "overview"
  | "overviewDesc"
  | "architecture"
  | "architectureDesc"
  | "contribTechStack"
  | "contribTechStackDesc"
  | "designSystem"
  | "designSystemDesc"
  | "apiReference"
  | "apiReferenceDesc"
  | "a11y"
  | "a11yDesc"
  | "tutorial"
  | "tutorialDesc"
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
  /** Link direto (sem submenu). Se definido, renderiza como link simples. */
  href?: string;
  items?: NavItem[];
  categories?: NavCategory[];
  /** Link único "Ver todos" no rodapé do submenu (para grupos com items flat). */
  viewAllHref?: string;
  viewAllCount?: number;
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
    { icon: SquareStack, labelKey: "techStack", href: "#stack" },
    { icon: Github, labelKey: "github", href: "#github" },
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
        {
          icon: Bot,
          labelKey: "aiChatbot",
          sublabelKey: "aiChatbotDesc",
          href: "/implementacoes/ai-chatbot",
        },
        {
          icon: BarChart3,
          labelKey: "analyticsShowcase",
          sublabelKey: "analyticsShowcaseDesc",
          href: "/implementacoes/analytics",
        },
        {
          icon: Beaker,
          labelKey: "testingShowcase",
          sublabelKey: "testingShowcaseDesc",
          href: "/implementacoes/testing",
        },
        {
          icon: Mail,
          labelKey: "contactFormShowcase",
          sublabelKey: "contactFormShowcaseDesc",
          href: "/implementacoes/contact-form",
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
        {
          icon: FileCode,
          labelKey: "tsPatterns",
          sublabelKey: "tsPatternsDesc",
          href: "/dicas/typescript-patterns",
        },
        {
          icon: Route,
          labelKey: "nextjsAppRouter",
          sublabelKey: "nextjsAppRouterDesc",
          href: "/dicas/nextjs-app-router",
        },
        {
          icon: Layers,
          labelKey: "stateManagement",
          sublabelKey: "stateManagementDesc",
          href: "/dicas/state-management",
        },
        {
          icon: GitBranch,
          labelKey: "gitWorkflow",
          sublabelKey: "gitWorkflowDesc",
          href: "/dicas/git-workflow",
        },
        {
          icon: Component,
          labelKey: "reactPatterns",
          sublabelKey: "reactPatternsDesc",
          href: "/dicas/react-patterns",
        },
        {
          icon: Paintbrush,
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
          icon: Shield,
          labelKey: "securityTips",
          sublabelKey: "securityTipsDesc",
          href: "/dicas/security-tips",
        },
        {
          icon: ShieldCheck,
          labelKey: "privacyTips",
          sublabelKey: "privacyTipsDesc",
          href: "/dicas/privacy-tips",
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
        {
          icon: Regex,
          labelKey: "regexPlayground",
          sublabelKey: "regexPlaygroundDesc",
          href: "/ferramentas/regex",
        },
        {
          icon: Braces,
          labelKey: "jsonTool",
          sublabelKey: "jsonToolDesc",
          href: "/ferramentas/json",
        },
      ],
    },
  ],
};

export const contributeGroup: NavGroup = {
  id: "contribute",
  labelKey: "contribute",
  descriptionKey: "contributeDesc",
  icon: Heart,
  activeCheck: (pathname) => pathname.startsWith("/contribua"),
  viewAllHref: "/contribua#explore",
  viewAllCount: 7,
  items: [
    {
      icon: Heart,
      labelKey: "overview",
      sublabelKey: "overviewDesc",
      href: "/contribua",
    },
    {
      icon: BookOpen,
      labelKey: "tutorial",
      sublabelKey: "tutorialDesc",
      href: "/contribua/tutorial",
    },
    {
      icon: Layers,
      labelKey: "architecture",
      sublabelKey: "architectureDesc",
      href: "/contribua/arquitetura",
    },
    {
      icon: Blocks,
      labelKey: "contribTechStack",
      sublabelKey: "contribTechStackDesc",
      href: "/contribua/tech-stack",
    },
    {
      icon: Component,
      labelKey: "designSystem",
      sublabelKey: "designSystemDesc",
      href: "/contribua/design-system",
    },
    {
      icon: FileCode,
      labelKey: "apiReference",
      sublabelKey: "apiReferenceDesc",
      href: "/contribua/api",
    },
    {
      icon: Accessibility,
      labelKey: "a11y",
      sublabelKey: "a11yDesc",
      href: "/contribua/acessibilidade",
    },
  ],
};

export const navGroups: NavGroup[] = [
  portfolioGroup,
  contentGroup,
  contributeGroup,
];
