"use client";

import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import type { PerfScoreKey } from "./types";
import { useLighthouseMetrics } from "./use-lighthouse-metrics";
import { useViewportMode } from "./use-viewport-mode";
import { PerformanceWidgetHeader } from "./widget-header";
import { PerformanceWidgetLoading } from "./widget-loading";
import { PerformanceWidgetScores } from "./widget-scores";
import { PerformanceWidgetVitals } from "./widget-vitals";

/** Margem mínima (px) para o widget permanecer visível no viewport */
const VIEWPORT_PADDING = 16;
/** Largura mínima visível do widget para considerar "dentro da tela" */
const MIN_VISIBLE_WIDTH = 100;
/** Altura mínima visível do widget */
const MIN_VISIBLE_HEIGHT = 48;

const POSITION_STORAGE_KEY = "perf-widget-position";

/** Posição padrão: canto superior direito (não sobrepõe terminal bottom-left nem FAB bottom-right). */
function getDefaultPosition(): { x: number; y: number } {
  if (typeof window === "undefined") return { x: 24, y: 24 };
  const x = Math.max(
    VIEWPORT_PADDING,
    window.innerWidth - 320 - VIEWPORT_PADDING,
  );
  const y = VIEWPORT_PADDING;
  return { x, y };
}

function clampToViewport(pos: { x: number; y: number }): {
  x: number;
  y: number;
} {
  if (typeof window === "undefined") return pos;
  const maxX = window.innerWidth - MIN_VISIBLE_WIDTH;
  const maxY = window.innerHeight - MIN_VISIBLE_HEIGHT;
  return {
    x: Math.round(Math.max(VIEWPORT_PADDING, Math.min(pos.x, maxX))),
    y: Math.round(Math.max(VIEWPORT_PADDING, Math.min(pos.y, maxY))),
  };
}

function loadStoredPosition(): { x: number; y: number } {
  if (typeof window === "undefined") return getDefaultPosition();
  try {
    const raw = localStorage.getItem(POSITION_STORAGE_KEY);
    if (!raw) return getDefaultPosition();
    const parsed = JSON.parse(raw) as { x: number; y: number };
    if (typeof parsed.x === "number" && typeof parsed.y === "number") {
      return clampToViewport(parsed);
    }
  } catch {
    // ignore
  }
  return getDefaultPosition();
}

const SCORE_KEYS: PerfScoreKey[] = [
  "performance",
  "accessibility",
  "bestPractices",
  "seo",
];

export function PerformanceWidget() {
  const t = useTranslations("performanceWidget");
  const pathname = usePathname();
  const viewportMode = useViewportMode();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  /** Posição inicial fixa para evitar hydration mismatch; ajustada no efeito no cliente. */
  const [position, setPosition] = useState({ x: 24, y: 24 });
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPosition(loadStoredPosition());
  }, []);

  useEffect(() => {
    const onResize = () => {
      setPosition((prev) => clampToViewport(prev));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const dragControls = useDragControls();
  const viewportForStrategy = viewportMode;
  const { metrics, loading, reload, source } = useLighthouseMetrics(
    open,
    viewportForStrategy,
  );

  const scoreLabels = useMemo(
    () => SCORE_KEYS.map((k) => t(`scores.${k}`)),
    [t],
  );
  const getScoreLabel = useCallback((k: PerfScoreKey) => t(`scores.${k}`), [t]);
  const getVitalLabel = useCallback(
    (k: string) => t(`vitals.${k}` as "vitals.FCP"),
    [t],
  );
  const getVitalDescription = useCallback(
    (k: string) => t(`vitalsDescription.${k}` as "vitalsDescription.LCP"),
    [t],
  );

  const handleDragStart = useCallback(() => {}, []);
  const handleDragEnd = useCallback(
    (_: MouseEvent, info: { offset: { x: number; y: number } }) => {
      setPosition((prev) => {
        const next = clampToViewport({
          x: prev.x + info.offset.x,
          y: prev.y + info.offset.y,
        });
        try {
          localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    [],
  );
  const handleHeaderPointerDown = useCallback(
    (e: React.PointerEvent) => dragControls.start(e),
    [dragControls],
  );

  const handleMinimize = useCallback(() => {
    setMinimized((m) => !m);
  }, []);

  // Abrir widget via FAB ou outro disparo (evento customizado); sempre expandido ao abrir
  useEffect(() => {
    const onOpen = () => {
      setMinimized(false);
      setOpen(true);
    };
    window.addEventListener("open-performance-widget", onOpen);
    return () => window.removeEventListener("open-performance-widget", onOpen);
  }, []);

  // Quando fechado: não renderiza nada (acesso só pelo botão de ação). Barra minimizada só aparece após o usuário minimizar.
  if (!open) return null;

  return (
    <div
      ref={constraintsRef}
      className="fixed inset-0 z-50 pointer-events-none"
    >
      <motion.div
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0.05}
        dragConstraints={constraintsRef}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ position: "absolute", left: 0, top: 0 }}
        initial={{ x: position.x, y: position.y }}
        animate={{ x: position.x, y: position.y }}
        className="pointer-events-auto w-max"
        aria-label={t("panelAriaLabel")}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key="widget"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cn(
              "overflow-hidden border bg-card shadow-lg max-w-[calc(100vw-2rem)]",
              minimized
                ? "w-auto min-w-0 rounded-md border-primary/40 px-1 py-0.5 shadow-primary/10"
                : "w-[272px] rounded-xl border-border shadow-2xl shadow-black/40 sm:w-72 sm:rounded-2xl md:w-[340px]",
            )}
          >
            <PerformanceWidgetHeader
              title={t("title")}
              viewportLabel={
                viewportMode === "desktop"
                  ? t("viewportDesktop")
                  : t("viewportMobile")
              }
              reloadLabel={t("reloadLabel")}
              reloadHint={t("reloadHint")}
              minimizeLabel={t("minimizeLabel")}
              closeLabel={t("closeLabel")}
              loading={loading}
              minimized={minimized}
              onReload={reload}
              onMinimize={handleMinimize}
              onClose={() => setOpen(false)}
              onPointerDown={handleHeaderPointerDown}
              compact={minimized}
              pillLabel={t("pillLabel")}
              expandLabel={t("expandLabel")}
            />

            <AnimatePresence>
              {!minimized && (
                <motion.div
                  key={pathname ?? "initial"}
                  role="region"
                  aria-label={t("panelAriaLabel")}
                  aria-busy={loading}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {loading ? (
                    <PerformanceWidgetLoading
                      loadingPrompt={t("loadingPrompt")}
                      analyzingText={t("analyzing")}
                      analyzingMinimizeHint={t("analyzingMinimizeHint")}
                      scoreLabels={scoreLabels}
                    />
                  ) : metrics ? (
                    <div className="space-y-3 p-3 sm:space-y-4 sm:p-4">
                      <PerformanceWidgetScores
                        scores={metrics.scores}
                        scoresLabel={t("scoresLabel")}
                        getScoreLabel={getScoreLabel}
                      />
                      <div className="border-t border-border" />
                      <PerformanceWidgetVitals
                        vitals={metrics.vitals}
                        webVitalsLabel={t("webVitalsLabel")}
                        getVitalShortLabel={getVitalLabel}
                        getVitalDescription={getVitalDescription}
                      />
                      <div className="border-t border-border pt-1.5 sm:pt-2">
                        <p
                          className="font-mono text-[10px] text-muted-foreground sm:text-xs"
                          title={t("footerSourceHint")}
                        >
                          {t("footerLighthouse")}
                          {source
                            ? ` · ${source === "fallback" ? t("footerFallback") : t("footerCache24h")}`
                            : ""}{" "}
                          ·{" "}
                          {metrics.collectedAt
                            ? new Date(metrics.collectedAt).toLocaleTimeString(
                                undefined,
                                { hour: "2-digit", minute: "2-digit" },
                              )
                            : "–"}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
