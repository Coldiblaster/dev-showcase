"use client";

import { motion, useInView } from "framer-motion";
import {
  AlertCircle,
  AtSign,
  CheckCircle2,
  FileText,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MessageCircle,
  Send,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { CardBlur } from "@/components/ui/card-blur";
import { Input } from "@/components/ui/input";

type FormStatus = "idle" | "sending" | "sent" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactSection() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (formState.name.trim().length < 2) {
      newErrors.name = t("validationName");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      newErrors.email = t("validationEmail");
    }

    if (formState.message.trim().length < 10) {
      newErrors.message = t("validationMessage");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formState, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("sending");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("sent");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const whatsappLink = `https://wa.me/5518988111220?text=${encodeURIComponent("Ola! Vi seu portfolio e gostaria de conversar.")}`;

  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com/Coldiblaster" },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/vbastazin/",
    },
  ];

  const isSending = status === "sending";

  return (
    <section id="contact" className="relative px-6 py-32" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16 text-center">
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
            className="mx-auto max-w-xl text-pretty leading-relaxed text-muted-foreground"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="grid gap-10 md:grid-cols-5">
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
                <h3 className="text-lg font-semibold text-foreground">
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
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, name: e.target.value }))
                    }
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
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
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
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    placeholder={t("messagePlaceholder")}
                    className={`resize-none rounded-xl border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 ${
                      errors.message
                        ? "border-destructive"
                        : "border-border"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

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
            className="flex flex-col gap-5 md:col-span-2"
          >
            {/* WhatsApp CTA */}
            <CardBlur>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366]/10">
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    WhatsApp
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t("whatsappHint")}
                  </p>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  className="w-full gap-2 bg-[#25D366] text-white hover:bg-[#20bd5a]"
                >
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t("whatsappButton")}
                  </a>
                </Button>
              </motion.div>
            </CardBlur>

            {/* Email direto */}
            <CardBlur>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {t("directEmail")}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t("directEmailHint")}
                  </p>
                </div>
              </div>
              <a
                href="mailto:vbastazin@gmail.com"
                className="inline-block font-mono text-sm text-primary transition-colors hover:text-primary/80"
              >
                vbastazin@gmail.com
              </a>
            </CardBlur>

            {/* Social */}
            <CardBlur>
              <p className="mb-4 text-sm font-medium text-foreground">
                {t("social")}
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </CardBlur>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
