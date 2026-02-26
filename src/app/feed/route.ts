import { CHANGELOG } from "@/data/changelog";
import { PERSONAL } from "@/lib/constants";
import { loadMessages } from "@/lib/i18n/load-messages";
import { resolveLocale } from "@/lib/i18n/request";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const LOCALE_TO_RSS_LANG: Record<string, string> = {
  "pt-BR": "pt-BR",
  en: "en",
  es: "es",
  de: "de",
};

/** RSS 2.0 feed baseado no changelog. Acessível em /feed ou /feed.xml */
export async function GET() {
  const locale = await resolveLocale();
  const messages = await loadMessages(locale);
  const feedMsgs = messages.feed as {
    channelTitle: string;
    channelDescription: string;
  };
  const channelTitle = `${SITE_NAME} — ${feedMsgs.channelTitle}`;
  const channelDescription = feedMsgs.channelDescription.replace(
    "{name}",
    PERSONAL.name,
  );
  const rssLang = LOCALE_TO_RSS_LANG[locale] ?? "pt-BR";

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${SITE_URL}/novidades</link>
    <description>${escapeXml(channelDescription)}</description>
    <language>${rssLang}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed" rel="self" type="application/rss+xml"/>
    ${CHANGELOG.slice(0, 20)
      .map(
        (entry) => `
    <item>
      <title>${escapeXml(entry.version)} — ${escapeXml(entry.title)}</title>
      <link>${SITE_URL}/novidades</link>
      <description>${escapeXml(entry.summary)}</description>
      <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
      <guid isPermaLink="false">${SITE_URL}/novidades#${entry.version}</guid>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
