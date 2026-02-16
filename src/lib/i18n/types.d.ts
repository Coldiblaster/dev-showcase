// --- i18n Types: Clean & Dynamic ---

// Central type for all namespaces (auto-imported by Next.js)
import type about from "../../../messages/pt-BR/about.json";
import type ai from "../../../messages/pt-BR/ai.json";
import type aiInnovation from "../../../messages/pt-BR/aiInnovation.json";
import type contact from "../../../messages/pt-BR/contact.json";
import type experience from "../../../messages/pt-BR/experience.json";
import type footer from "../../../messages/pt-BR/footer.json";
import type global from "../../../messages/pt-BR/global.json";
import type hero from "../../../messages/pt-BR/hero.json";
import type i18nPage from "../../../messages/pt-BR/i18nPage.json";
import type i18nShowcase from "../../../messages/pt-BR/i18nShowcase.json";
import type implementations from "../../../messages/pt-BR/implementations.json";
import type nav from "../../../messages/pt-BR/nav.json";
import type portfolio from "../../../messages/pt-BR/portfolio.json";
import type projects from "../../../messages/pt-BR/projects.json";
import type search from "../../../messages/pt-BR/search.json";
import type tailwindTips from "../../../messages/pt-BR/tailwindTips.json";
import type tailwindTipsPage from "../../../messages/pt-BR/tailwindTipsPage.json";
import type tips from "../../../messages/pt-BR/tips.json";
import type tipsPage from "../../../messages/pt-BR/tipsPage.json";

export type Messages = {
  global: typeof global;
  about: typeof about;
  nav: typeof nav;
  ai: typeof ai;
  aiInnovation: typeof aiInnovation;
  contact: typeof contact;
  experience: typeof experience;
  footer: typeof footer;
  hero: typeof hero;
  i18nPage: typeof i18nPage;
  i18nShowcase: typeof i18nShowcase;
  implementations: typeof implementations;
  portfolio: typeof portfolio;
  projects: typeof projects;
  tailwindTips: typeof tailwindTips;
  tailwindTipsPage: typeof tailwindTipsPage;
  tips: typeof tips;
  tipsPage: typeof tipsPage;
  search: typeof search;
};

// --- Utility Types ---
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never;

export type Paths<T> = T extends object
  ? T extends Array<infer U>
    ? Paths<U>
    : {
        [K in Extract<keyof T, string>]: T[K] extends object
          ? K | Join<K, Paths<T[K]>>
          : K;
      }[Extract<keyof T, string>]
  : never;

export type NamespacePaths<N extends keyof Messages> = Paths<Messages[N]>;

export type AllMessagesPaths = {
  [K in keyof Messages]: `${K & string}.${Paths<Messages[K]>}`;
}[keyof Messages];

// --- Global Declarations for next-intl ---
declare global {
  // next-intl v4+ usa IntlMessages para tipagem automática
  type IntlMessages = Messages;
}

declare module "next-intl" {
  interface AppConfig {
    Messages: Messages;
  }
}
