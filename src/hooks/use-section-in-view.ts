import { useInView } from "framer-motion";
import { useRef } from "react";

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
export function useSectionInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}
