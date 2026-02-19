"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

/**
 * Link de voltar que usa o histórico do navegador quando disponível,
 * caindo no href fornecido como fallback (acesso direto / nova aba).
 */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mb-8 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      {label}
    </Link>
  );
}
