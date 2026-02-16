import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ScrollTopButton } from "@/components/scroll-top";
import { resolveLocale } from "@/lib/i18n/request";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title:
    "Vinicius Bastazin | Desenvolvedor Frontend Senior - React, Next.js, React Native",
  description:
    "Portfolio de Vinicius Bastazin Araujo. Desenvolvedor frontend especializado em React.js, Next.js e React Native com mais de 7 anos de experiencia.",
};

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
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
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          {children}
          <ScrollTopButton />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
