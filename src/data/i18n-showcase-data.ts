import {
  Braces,
  Calendar,
  FolderTree,
  Sparkles,
  Terminal,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { ComponentType, SVGProps } from "react";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export interface I18nShowcaseItem {
  title: string;
  badge: string;
  description: string;
  icon: IconType;
  code: string;
}

export function useI18nShowcaseData(): I18nShowcaseItem[] {
  const tShow = useTranslations("i18nShowcase");
  const tPage = useTranslations("i18nPage");

  type ShowcaseKey = Parameters<typeof tShow>[0];
  type PageKey = Parameters<typeof tPage>[0];

  const tt = (key: string, fallback: string): string => {
    // choose namespace
    try {
      if (key.startsWith("i18nShowcase.")) {
        const short = key.replace(/^i18nShowcase\./, "") as ShowcaseKey;

        // 1) try to read raw message (avoids formatting runtime)
        const rawGetter =
          typeof tShow === "function" && "raw" in tShow
            ? (tShow as { raw: (key: string) => string }).raw
            : undefined;
        if (typeof rawGetter === "function") {
          const raw = rawGetter(short);
          if (typeof raw === "string" && raw && raw !== short) return raw;
        }

        // 2) fallback: try to call translator but guard against missing params
        try {
          const res = typeof tShow === "function" ? tShow(short) : undefined;
          if (typeof res === "string" && res && res !== short) return res;
        } catch (err) {
          // translator may throw if placeholders are missing; fallthrough to fallback
          console.debug("i18n-showcase: formatting skipped for", short, err);
        }

        return fallback;
      }

      // non-showcase keys (i18nPage)
      const rawGetterPage =
        typeof tPage === "function" && "raw" in tPage
          ? (tPage as { raw: (key: string) => string }).raw
          : undefined;
      if (typeof rawGetterPage === "function") {
        const raw = rawGetterPage(key);
        if (typeof raw === "string" && raw && raw !== key) return raw;
      }

      try {
        const res =
          typeof tPage === "function" ? tPage(key as PageKey) : undefined;
        if (typeof res === "string" && res && res !== key) return res;
      } catch (err) {
        console.debug(
          "i18n-showcase: formatting skipped for page key",
          key,
          err,
        );
      }

      return fallback;
    } catch (err) {
      console.debug("i18n-showcase: tt unexpected error", err);
      return fallback;
    }
  };

  return [
    {
      title: tt("i18nShowcase.useTranslations.title", "useTranslations()"),
      badge: tt("i18nShowcase.useTranslations.badge", "Client hook"),
      description: tt(
        "i18nShowcase.useTranslations.description",
        "Use `useTranslations` inside client components to read messages for a namespace.",
      ),
      icon: Braces,
      code: `import { useTranslations } from "next-intl";

export function LoginPage() {
  const t = useTranslations("auth");
  const tActions = useTranslations("global.actions");

  return (
    <form>
      <h1>{t("login.title")}</h1>
      <input placeholder={t("login.emailPlaceholder")} />
      <button>{tActions("save")}</button>
    </form>
  );
}`,
    },
    {
      title: tt("i18nShowcase.getTranslations.title", "getTranslations()"),
      badge: tt("i18nShowcase.getTranslations.badge", "Server"),
      description: tt(
        "i18nShowcase.getTranslations.description",
        "Use `getTranslations` in server components or server actions to load namespaces synchronously.",
      ),
      icon: Terminal,
      code: `import { getTranslations } from "next-intl/server";

// Server Component
export default async function ServerPage() {
  const t = await getTranslations("global");
  return <h1>{t("welcome")}</h1>;
}

// Server Action
export async function createUserAction(data: FormData) {
  "use server";
  const t = await getTranslations("admin.userManagement");
  return { message: t("success.userCreated") };
}`,
    },
    {
      title: tt("i18nShowcase.namespaces.title", "Namespaces"),
      badge: tt("i18nShowcase.namespaces.badge", "Organization"),
      description: tt(
        "i18nShowcase.namespaces.description",
        "Split messages into multiple namespaces and combine them in components.",
      ),
      icon: FolderTree,
      code: `// messages/pt-BR/global.json
{
  "actions": { "save": "Salvar", "cancel": "Cancelar" }
}

// messages/pt-BR/admin/user-management.json
{
  "form": {
    "title": "Criar Usuario",
    "fields": {
      "name": { "label": "Nome", "placeholder": "Digite" }
    }
  }
}

// Uso: combine namespaces
const tForm = useTranslations("admin.userManagement");
const tActions = useTranslations("global.actions");
<h1>{tForm("form.title")}</h1>
<button>{tActions("save")}</button>`,
    },
    {
      title: tt("i18nShowcase.pluralization.title", "Pluralization"),
      badge: tt("i18nShowcase.pluralization.badge", "Formatting"),
      description: tt(
        "i18nShowcase.pluralization.description",
        "Use ICU plural rules to display different strings depending on numeric values.",
      ),
      icon: User,
      code: `// messages/pt-BR/global.json
{
  "items": "{count, plural, =0 {nenhum item} one {1 item} other {# itens}}"
}

// Uso no componente
const t = useTranslations("global");

t("items", { count: 0 }); // "nenhum item"
t("items", { count: 1 }); // "1 item"
t("items", { count: 5 }); // "5 itens"`,
    },
    {
      title: tt("i18nShowcase.interpolation.title", "Interpolation"),
      badge: tt("i18nShowcase.interpolation.badge", "Variables"),
      description: tt(
        "i18nShowcase.interpolation.description",
        "Interpolate variables inside messages using placeholders.",
      ),
      icon: Sparkles,
      code: `// messages/pt-BR/global.json
{
  "greeting": "Ola, {name}!",
  "userCreated": "{userName} criou {plantCount} plantas"
}

// Uso
t("greeting", { name: "Joao" });
// "Ola, Joao!"

t("userCreated", { userName: "Maria", plantCount: 3 });
// "Maria criou 3 plantas"`,
    },
    {
      title: tt("i18nShowcase.dateFormatting.title", "Date formatting"),
      badge: tt("i18nShowcase.dateFormatting.badge", "Locale APIs"),
      description: tt(
        "i18nShowcase.dateFormatting.description",
        "Format dates and numbers using the Intl APIs with the current locale.",
      ),
      icon: Calendar,
      code: `import { useLocale } from "next-intl";

export function FormattedDate({ date }: { date: Date }) {
  const locale = useLocale(); // "pt-BR" | "en" | "es"

  const formatted = new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);

  return <time>{formatted}</time>;
  // pt-BR: "6 de janeiro de 2026 as 14:30"
  // en:    "January 6, 2026 at 2:30 PM"
  // es:    "6 de enero de 2026 a las 14:30"
}`,
    },
  ];
}
