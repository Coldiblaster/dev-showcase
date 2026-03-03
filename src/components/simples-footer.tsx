"use client";

import { motion } from "framer-motion";
import { GithubIcon } from "lucide-react";

export function SimpleFooter() {
  return (
    <footer className="mt-20 mb-10 flex w-full items-center justify-center flex-col gap-1">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        className="text-sm text-muted-foreground font-mono"
      >
        Made w/ <span className="text-[#1E323B]">♥</span> by{" "}
        <span className="font-semibold">Gabriela Bastazin</span>
      </motion.p>

      <motion.a
        href="https://github.com/gabrielabastazin"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        whileHover={{ scale: 1.07 }}
        className="text-xs font-mono text-muted-foreground underline-offset-2 hover:underline hover:text-foreground flex items-center gap-2"
      >
        <GithubIcon className="w-4 h-4" />
        github.com/gabrielabastazin
      </motion.a>
    </footer>
  );
}
