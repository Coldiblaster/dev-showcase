import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { CopyFeedbackProvider } from "@/components/copy-feedback";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { Navbar } from "@/components/navbar";
import { RecaptchaProvider } from "@/components/recaptcha-provider";
import { ScrollTopButton } from "@/components/scroll-top";
import { SkipLink } from "@/components/skip-link";
import { ViewTracker } from "@/components/view-tracker";
import { PERSONAL } from "@/lib/constants";
import { resolveLocale } from "@/lib/i18n/request";
import { SITE_AUTHOR, SITE_NAME, SITE_URL } from "@/lib/seo";

const ChatWidget = dynamic(() =>
  import("@/components/chat/chat-widget").then((m) => m.ChatWidget),
);
const TerminalEasterEgg = dynamic(() =>
  import("@/components/terminal").then((m) => m.TerminalEasterEgg),
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("hero");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} | ${PERSONAL.role} — React, Next.js, React Native`,
      template: `%s | ${SITE_NAME}`,
    },
    description: t("meta.description"),
    authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
    creator: SITE_AUTHOR,
    applicationName: SITE_NAME,
    robots: { index: true, follow: true },
    alternates: { canonical: SITE_URL },
    openGraph: {
      title: `${SITE_NAME} — ${PERSONAL.role}`,
      description: t("meta.ogDescription"),
      url: SITE_URL,
      siteName: SITE_NAME,
      type: "website",
      locale: "pt_BR",
      alternateLocale: ["en_US", "es_ES", "de_DE"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — ${PERSONAL.role}`,
      description: t("meta.twitterDescription"),
    },
    keywords: [
      "Vinicius Bastazin",
      "portfolio frontend",
      "React developer",
      "Next.js developer",
      "React Native",
      "TypeScript",
      "frontend senior",
      "design systems",
      "frontend architecture",
      "Tailwind CSS",
      "i18n",
      "SEO Next.js",
      "AI chatbot",
    ],
    verification: {
      google: PERSONAL.googleVerification,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await resolveLocale();
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="dark">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <RecaptchaProvider>
            <CopyFeedbackProvider>
              <SkipLink />
              <Navbar />
              <main id="main" tabIndex={-1} className="outline-none">
                {children}
              </main>
              <ScrollTopButton />
              <ChatWidget />
              <Footer />
              <MobileActionBar />
              <TerminalEasterEgg />
            </CopyFeedbackProvider>
          </RecaptchaProvider>
        </NextIntlClientProvider>
        <ViewTracker />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
