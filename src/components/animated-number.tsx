"use client";

import { useInView, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
}

/**
 * Número animado com contagem progressiva ao entrar no viewport.
 *
 * Usa Framer Motion spring para uma animação suave.
 *
 * @param value - Valor final do número
 * @param suffix - Sufixo após o número (ex: "+", "%")
 *
 * @example
 * ```tsx
 * <AnimatedNumber value={42} suffix="+" />
 * ```
 */
export function AnimatedNumber({ value, suffix = "" }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  const springValue = useSpring(0, {
    duration: 2000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
