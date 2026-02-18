"use client";

import { motion, useInView } from "framer-motion";
import {
  AlertCircle,
  AtSign,
  CheckCircle2,
  FileText,
  Loader2,
  Mail,
  Send,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { CardBlur } from "@/components/ui/card-blur";
import { Input } from "@/components/ui/input";

import { ContactSidebar } from "./contact-sidebar";
import { useContactForm } from "./use-contact-form";

/** Seção de contato com formulário e reCAPTCHA. */
export function ContactSection() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { formState, status, errors, isSending, updateField, handleSubmit } =
    useContactForm({
      validationName: t("validationName"),
      validationEmail: t("validationEmail"),
      validationMessage: t("validationMessage"),
    });

  return (
    <section id="contact" className="relative px-6 py-16 md:py-32" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-2 inline-block font-mono text-sm text-primary"
          >
            {"// "}
            {t("subtitle")}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-5 md:gap-10">
          {/* Form - takes 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3"
          >
            <CardBlur className="md:p-8">
              <div className="mb-6 flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <h3 className="text-base font-semibold text-foreground md:text-lg">
                  {t("formTitle")}
                </h3>
              </div>

              {/* Success feedback */}
              {status === "sent" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-primary">
                      {t("sent")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("sentDescription")}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Error feedback */}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                  <div>
                    <p className="text-sm font-semibold text-destructive">
                      {t("errorTitle")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("errorDescription")}
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Honeypot */}
                <div
                  className="absolute -left-[9999px] opacity-0"
                  aria-hidden="true"
                >
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formState.website}
                    onChange={(e) => updateField("website", e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="flex items-center gap-1.5 text-sm font-medium text-foreground"
                  >
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    {t("nameLabel")}
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    disabled={isSending}
                    value={formState.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder={t("namePlaceholder")}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="flex items-center gap-1.5 text-sm font-medium text-foreground"
                  >
                    <AtSign className="h-3.5 w-3.5 text-muted-foreground" />
                    {t("emailFieldLabel")}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    disabled={isSending}
                    value={formState.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="flex items-center gap-1.5 text-sm font-medium text-foreground"
                  >
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    {t("messageLabel")}
                  </label>
                  <textarea
                    id="message"
                    required
                    disabled={isSending}
                    rows={4}
                    value={formState.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    placeholder={t("messagePlaceholder")}
                    className={`resize-none rounded-xl border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 ${
                      errors.message ? "border-destructive" : "border-border"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">{errors.message}</p>
                  )}
                </div>

                <p className="text-[11px] leading-relaxed text-muted-foreground/60">
                  {t("recaptchaNotice")}{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-muted-foreground"
                  >
                    {t("recaptchaPrivacy")}
                  </a>
                  {t("recaptchaAnd")}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-muted-foreground"
                  >
                    {t("recaptchaTerms")}
                  </a>
                  {t("recaptchaGoogle")}
                </p>

                <motion.div whileTap={isSending ? {} : { scale: 0.98 }}>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSending}
                    className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("sending")}
                      </>
                    ) : status === "sent" ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        {t("sent")}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {t("sendButton")}
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardBlur>
          </motion.div>

          {/* Sidebar - takes 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2"
          >
            <ContactSidebar />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
