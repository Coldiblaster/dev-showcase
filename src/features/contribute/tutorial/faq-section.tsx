"use client";

import { HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items: FaqItem[];
}

/** Seção de FAQ expansível com Accordion, usada dentro de cada step. */
export function FaqSection({ items }: FaqSectionProps) {
  const t = useTranslations("tutorialPage.faq");

  if (!items.length) return null;

  return (
    <div className="rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-2">
        <HelpCircle className="h-4 w-4 text-primary/60" />
        <h3 className="text-sm font-semibold text-foreground/80">
          {t("title")}
        </h3>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border-border/30"
          >
            <AccordionTrigger className="py-3 text-left text-sm hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
