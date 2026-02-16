"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getDemoMessages } from "@/data/demo-messages";
import { useQueryParams } from "@/hooks/use-query-params";
import { useSectionInView } from "@/hooks/use-section-in-view";
import type { Locale } from "@/lib/i18n";
import { localeDisplayName, locales } from "@/lib/i18n";
import { getPluralMessage, interpolate } from "@/lib/i18n/utils";

export function LiveDemo() {
  const t = useTranslations("i18nPage");
  // O locale real pode ser obtido via next-intl, mas para demo mantemos "pt-BR" como default
  const locale: Locale = "pt-BR";
  const { ref, isInView } = useSectionInView();
  const [demoLocale, setDemoLocale] = useState<Locale>(locale);
  const [itemCount, setItemCount] = useState(5);
  const [name, setName] = useState("Vinicius");
  const [copied, setCopied] = useState(false);

  // Use real translations from messages/*/i18nPage.json for the preview
  const msgs = getDemoMessages(demoLocale);

  // useQueryParams para ler e atualizar query params
  const [getParams, setParam] = useQueryParams();

  // Inicializa estado a partir dos query params
  useEffect(() => {
    const params = getParams();
    if (params.locale && locales.includes(params.locale as Locale)) {
      setDemoLocale(params.locale as Locale);
    }
    if (params.count && !Number.isNaN(Number(params.count))) {
      setItemCount(Math.max(0, Number(params.count)));
    }
    if (params.name) setName(params.name);
  }, []);

  // Sincroniza estado com a URL
  useEffect(() => {
    setParam("locale", demoLocale);
    setParam("count", String(itemCount));
    setParam("name", name);
  }, [demoLocale, itemCount, name]);

  const demoDate = useMemo(() => {
    const localeMap: Record<Locale, string> = {
      "pt-BR": "pt-BR",
      en: "en-US",
      es: "es-ES",
      de: "de-DE",
    };
    return new Intl.DateTimeFormat(localeMap[demoLocale], {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());
  }, [demoLocale]);

  const demoNumber = useMemo(() => {
    const localeForNumber: Record<Locale, string> = {
      "pt-BR": "pt-BR",
      en: "en-US",
      es: "es-ES",
      de: "de-DE",
    };
    const currencyForLocale: Record<Locale, string> = {
      "pt-BR": "BRL",
      en: "USD",
      es: "EUR",
      de: "EUR",
    };
    const baseAmountBRL = 1234567.89;
    const conversionFromBRL: Record<Locale, number> = {
      "pt-BR": 1,
      en: 0.2,
      es: 0.18,
      de: 0.18,
    };
    const amount = baseAmountBRL * (conversionFromBRL[demoLocale] ?? 1);
    return new Intl.NumberFormat(localeForNumber[demoLocale], {
      style: "currency",
      currency: currencyForLocale[demoLocale] ?? "BRL",
    }).format(amount);
  }, [demoLocale]);

  // Pluralização usando utilitário
  const pluralResult = getPluralMessage(
    msgs.items || "{count, plural, other {{count}}}",
    itemCount,
    demoLocale,
  );

  return (
    <section ref={ref} id="live-demo" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 30 },
          }}
          className="mb-12 text-center"
        >
          <motion.h2
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 30 },
            }}
            className="mb-2 text-3xl font-bold text-foreground md:text-4xl"
          >
            {t("liveDemo.title")}
          </motion.h2>
          <motion.p
            variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
            className="text-muted-foreground"
          >
            {t("liveDemo.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="overflow-hidden border-primary/20 bg-card rounded-xl shadow">
            <div className="p-0">
              <div className="grid gap-0 lg:grid-cols-[300px_1fr]">
                {/* Controls */}
                <div className="border-b border-border bg-secondary/30 p-6 lg:border-b-0 lg:border-r">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("liveDemo.selectLanguage")}
                  </p>
                  <div className="flex flex-col gap-2">
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => setDemoLocale(loc)}
                        className={[
                          "flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-all",
                          demoLocale === loc
                            ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                            : "text-foreground hover:bg-secondary",
                        ].join(" ")}
                      >
                        <span className="font-mono text-xs text-muted-foreground">
                          {loc}
                        </span>
                        <span className="font-medium">
                          {localeDisplayName[loc as Locale]}
                        </span>
                        {demoLocale === loc && (
                          <Check className="ml-auto h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                  <Separator className="my-6" />

                  <div className="mb-4">
                    <label className="mb-2 block text-xs font-semibold text-muted-foreground">
                      Nome (preview)
                    </label>
                    <Input
                      aria-label="Nome para saudacao"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setItemCount(Math.max(0, itemCount - 1))}
                      className="h-8 min-w-8 p-0"
                      aria-label="Diminuir contador"
                    >
                      -
                    </Button>
                    <span className="w-10 text-center font-mono text-sm font-bold text-foreground">
                      {itemCount}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setItemCount(itemCount + 1)}
                      className="h-8 min-w-8 p-0"
                      aria-label="Aumentar contador"
                    >
                      +
                    </Button>

                    <div className="ml-auto flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(
                              window.location.href,
                            );
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          } catch {
                            // ignore
                          }
                        }}
                        aria-label="Copiar link da demo"
                      >
                        {copied ? "Link copiado" : "Copiar link"}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("liveDemo.preview")} &mdash; {demoLocale}
                    </p>
                  </div>

                  <motion.div
                    key={demoLocale + itemCount}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    {/* Greeting */}
                    <div className="rounded-lg bg-secondary/50 p-4">
                      <p className="mb-1 text-xs text-muted-foreground">
                        {msgs.greeting}
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {interpolate(msgs.greetingName, { name })}
                      </p>
                    </div>

                    {/* Welcome message */}
                    <p className="leading-relaxed text-foreground/80">
                      {msgs.welcomeMessage}
                    </p>

                    {/* Formatting grid */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-border p-3">
                        <div className="mb-1 flex items-center gap-1.5">
                          {/* Calendar icon placeholder */}
                          <span className="inline-block h-3.5 w-3.5 bg-primary rounded-full mr-1.5" />
                          <p className="text-xs text-muted-foreground">
                            {msgs.dateLabel}
                          </p>
                        </div>
                        <p className="font-mono text-sm text-foreground">
                          {demoDate}
                        </p>
                      </div>
                      <div className="rounded-lg border border-border p-3">
                        <div className="mb-1 flex items-center gap-1.5">
                          {/* Hash icon placeholder */}
                          <span className="inline-block h-3.5 w-3.5 bg-primary rounded-full mr-1.5" />
                          <p className="text-xs text-muted-foreground">
                            {msgs.numberLabel}
                          </p>
                        </div>
                        <p className="font-mono text-sm text-foreground">
                          {demoNumber}
                        </p>
                      </div>
                    </div>

                    {/* Pluralization */}
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                      <div className="mb-1 flex items-center gap-1.5">
                        {/* Users icon placeholder */}
                        <span className="inline-block h-3.5 w-3.5 bg-primary rounded-full mr-1.5" />
                        <p className="text-xs text-muted-foreground">
                          {msgs.itemCountLabel}
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-primary">
                        {pluralResult}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
