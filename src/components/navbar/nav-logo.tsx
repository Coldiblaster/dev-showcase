"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import Link from "next/link";

export function NavLogo() {
  return (
    <Link href="/" aria-label="Ir para a página inicial">
      <motion.div
        className="flex items-center gap-2 text-foreground"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Code2 className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-mono text-sm font-bold tracking-tight">
          {"<VB />"}
        </span>
      </motion.div>
    </Link>
  );
}
