"use client";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      variant="default"
      size="icon"
      className={`fixed bottom-6 right-6 z-50 rounded-full shadow-lg transition-opacity duration-300 bg-primary text-white hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/50 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)" }}
    >
      <ArrowUp size={20} />
    </Button>
  );
}
