import type { Locale } from "@/lib/i18n";

import de from "../../messages/de/i18nPage.json";
import en from "../../messages/en/i18nPage.json";
import es from "../../messages/es/i18nPage.json";
import pt from "../../messages/pt-BR/i18nPage.json";

export type DemoMessages = {
  greeting: string;
  greetingName: string;
  welcomeMessage: string;
  dateLabel: string;
  numberLabel: string;
  itemCountLabel: string;
  items: string;
};

const map: Record<Locale, DemoMessages> = {
  "pt-BR": {
    greeting: pt.liveDemo.greeting,
    greetingName: pt.liveDemo.greetingName,
    welcomeMessage: pt.liveDemo.welcomeMessage,
    dateLabel: pt.liveDemo.dateLabel,
    numberLabel: pt.liveDemo.numberLabel,
    itemCountLabel: pt.liveDemo.itemCount,
    items: pt.liveDemo.items,
  },
  en: {
    greeting: en.liveDemo.greeting,
    greetingName: en.liveDemo.greetingName,
    welcomeMessage: en.liveDemo.welcomeMessage,
    dateLabel: en.liveDemo.dateLabel,
    numberLabel: en.liveDemo.numberLabel,
    itemCountLabel: en.liveDemo.itemCount,
    items: en.liveDemo.items,
  },
  es: {
    greeting: es.liveDemo.greeting,
    greetingName: es.liveDemo.greetingName,
    welcomeMessage: es.liveDemo.welcomeMessage,
    dateLabel: es.liveDemo.dateLabel,
    numberLabel: es.liveDemo.numberLabel,
    itemCountLabel: es.liveDemo.itemCount,
    items: es.liveDemo.items,
  },
  de: {
    greeting: de.liveDemo.greeting,
    greetingName: de.liveDemo.greetingName,
    welcomeMessage: de.liveDemo.welcomeMessage,
    dateLabel: de.liveDemo.dateLabel,
    numberLabel: de.liveDemo.numberLabel,
    itemCountLabel: de.liveDemo.itemCount,
    items: de.liveDemo.items,
  },
};

export function getDemoMessages(locale: Locale): DemoMessages {
  return map[locale] || map["pt-BR"];
}
