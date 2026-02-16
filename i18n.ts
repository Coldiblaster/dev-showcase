import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { loadMessages } from "@/lib/i18n/load-messages";
import { formats, resolveLocale, SUPPORTED_LOCALES } from "@/lib/i18n/request";

export default getRequestConfig(async () => {
  const locale = await resolveLocale();

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  return {
    locale,
    messages: await loadMessages(locale),
    formats,
  };
});
