"use client";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const SCROLL_THRESHOLD = 200;

export function ScrollTopButton() {
  const t = useTranslations("global");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      aria-label={t("scrollToTop")}
      onClick={scrollToTop}
      variant="default"
      size="icon"
      className={`fab-floating fixed bottom-[4.5rem] right-4 z-40 h-10 w-10 rounded-full shadow-md transition-all duration-300 bg-primary/80 text-primary-foreground hover:bg-primary hover:opacity-100 focus:outline-none md:bottom-24 md:right-6 md:h-14 md:w-14 md:bg-primary ${visible ? "opacity-70 md:opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <ArrowUp size={16} className="text-primary-foreground md:size-[22px]" />
    </Button>
  );
}
