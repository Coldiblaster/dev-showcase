import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Mapeamento de breakpoints para classes Tailwind de largura máxima. */
export const MAX_WIDTH_MAP = {
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
} as const;

export type MaxWidth = keyof typeof MAX_WIDTH_MAP;
