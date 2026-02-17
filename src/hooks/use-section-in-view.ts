import { useInView } from "framer-motion";
import { type RefObject, useRef } from "react";

const INTERSECTION_MARGIN = "-80px";

interface UseSectionInViewReturn {
  ref: RefObject<HTMLElement | null>;
  isInView: boolean;
}

/**
 * Hook para detectar quando uma seção entra no viewport.
 *
 * Usa Intersection Observer via framer-motion para detectar visibilidade.
 * Retorna ref para anexar ao elemento e estado isInView.
 *
 * @returns Objeto com ref e isInView
 *
 * @example
 * ```tsx
 * const { ref, isInView } = useSectionInView();
 * return <section ref={ref}>{isInView && "Visível!"}</section>;
 * ```
 */
export function useSectionInView(): UseSectionInViewReturn {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: INTERSECTION_MARGIN });
  return { ref, isInView };
}
