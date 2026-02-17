import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { SpeedInsights } from "@vercel/speed-insights/next";

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
    "Portfolio de Vinicius Bastazin Araujo. Desenvolvedor frontend com mais de 7 anos de experiência, especializado em React.js, Next.js, React Native, APIs escaláveis e otimização de performance.",
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  creator: SITE_AUTHOR,
  applicationName: SITE_NAME,
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} — Desenvolvedor Frontend`,
    description:
      "Portfolio de Vinicius Bastazin, desenvolvedor especializado em React.js, Next.js, React Native e soluções web personalizadas.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES", "de_DE"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Desenvolvedor Frontend`,
    description:
      "Portfolio de Vinicius Bastazin. React, Next.js, React Native e mais de 7 anos de experiência.",
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
          <Navbar />
          {children}
          <ScrollTopButton />
          <Footer />
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
