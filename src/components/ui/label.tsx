"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Label acessível para campos de formulário.
 * Segue o padrão visual do design system com suporte a `htmlFor`.
 */
export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
}
