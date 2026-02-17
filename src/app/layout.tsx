import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { ChatWidget } from "@/components/chat/chat-widget";
import { CopyFeedbackProvider } from "@/components/copy-feedback";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { ScrollTopButton } from "@/components/scroll-top";
import { resolveLocale } from "@/lib/i18n/request";
import { SITE_AUTHOR, SITE_NAME, SITE_URL } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Desenvolvedor Frontend Senior — React, Next.js, React Native`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Portfolio de Vinicius Bastazin Araujo. Desenvolvedor Frontend Senior com mais de 8 anos de experiência em React.js, Next.js e React Native. Especialista em arquitetura frontend, design systems, performance e acessibilidade.",
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  creator: SITE_AUTHOR,
  applicationName: SITE_NAME,
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} — Desenvolvedor Frontend Senior`,
    description:
      "Portfolio e plataforma de conteúdo de Vinicius Bastazin. +8 anos com React, Next.js e React Native. Implementações reais, guias e dicas para devs.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES", "de_DE"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Desenvolvedor Frontend Senior`,
    description:
      "Portfolio de Vinicius Bastazin. +8 anos com React, Next.js e React Native. Implementações reais e guias para devs.",
  },
  verification: {
    google: "OAX_26lblD3l_QOWRAmX4ujfVAflNwXTxo2Yf0iH7io",
  },
};

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
          <CopyFeedbackProvider>
            <Navbar />
            {children}
            <ScrollTopButton />
            <ChatWidget />
            <Footer />
          </CopyFeedbackProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
