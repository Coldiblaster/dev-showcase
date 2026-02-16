"use client";

import { motion, useInView } from "framer-motion";
import {
  AtSign,
  CheckCircle2,
  FileText,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { CardBlur } from "@/components/ui/card-blur";
import { Input } from "@/components/ui/input";

export function ContactSection() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contato de ${formState.name}`);
    const body = encodeURIComponent(
      `Nome: ${formState.name}\nEmail: ${formState.email}\n\nMensagem:\n${formState.message}`,
    );
    window.open(
      `mailto:vbastazin@gmail.com?subject=${subject}&body=${body}`,
      "_blank",
    );
    setSent(true);
    setTimeout(() => setSent(false), 4000);
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
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, name: e.target.value }))
                    }
                    placeholder={t("namePlaceholder")}
                  />
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
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    placeholder={t("emailPlaceholder")}
                  />
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
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    placeholder={t("messagePlaceholder")}
                    className="resize-none rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                  />
                </div>

                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {sent ? (
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
