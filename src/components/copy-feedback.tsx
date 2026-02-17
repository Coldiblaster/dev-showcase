"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

interface CopyFeedbackContextValue {
  showFeedback: () => void;
}

const CopyFeedbackContext = createContext<CopyFeedbackContextValue>({
  showFeedback: () => {},
});

export function useCopyFeedback() {
  return useContext(CopyFeedbackContext);
}

/**
 * Provider global que exibe um mini-toast animado quando algo é copiado.
 * Adicione no layout e use `useCopyFeedback().showFeedback()` após copiar.
 */
export function CopyFeedbackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("global");
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const showFeedback = useCallback(() => {
    setVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), 1500);
  }, []);

  return (
    <CopyFeedbackContext.Provider value={{ showFeedback }}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-20 left-1/2 z-100 -translate-x-1/2"
          >
            <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-background/95 px-4 py-2 shadow-lg backdrop-blur-sm">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {t("copied")}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CopyFeedbackContext.Provider>
  );
}
