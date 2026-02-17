"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { CardBlur } from "@/components/ui/card-blur";
import { buildWhatsAppLink, PERSONAL } from "@/lib/constants";

const socials = [
  { icon: Github, label: "GitHub", href: PERSONAL.github },
  { icon: Linkedin, label: "LinkedIn", href: PERSONAL.linkedin },
];

/** Sidebar de contato com WhatsApp, email direto e redes sociais. */
export function ContactSidebar() {
  const t = useTranslations("contact");
  const whatsappLink = buildWhatsAppLink();

  return (
    <div className="flex flex-col gap-5 md:col-span-2">
      {/* WhatsApp CTA */}
      <CardBlur>
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366]/10">
            <MessageCircle className="h-5 w-5 text-[#25D366]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">WhatsApp</h3>
            <p className="text-xs text-muted-foreground">{t("whatsappHint")}</p>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            asChild
            className="w-full gap-2 bg-[#25D366] text-white hover:bg-[#20bd5a]"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
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
          href={`mailto:${PERSONAL.email}`}
          className="inline-block font-mono text-sm text-primary transition-colors hover:text-primary/80"
        >
          {PERSONAL.email}
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
    </div>
  );
}
