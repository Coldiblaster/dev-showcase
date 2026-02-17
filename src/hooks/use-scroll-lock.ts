"use client";

import { useEffect, useRef } from "react";

/**
 * Trava o scroll do body enquanto `active` for `true`.
 *
 * Usa a técnica `position: fixed` + `top: -scrollY` para
 * funcionar corretamente no iOS Safari. Ao desativar,
 * restaura a posição de scroll original.
 */
export function useScrollLock(active: boolean) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!active) return;

    const html = document.documentElement;
    const body = document.body;
    scrollYRef.current = window.scrollY;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollYRef.current);
    };
  }, [active]);
}
