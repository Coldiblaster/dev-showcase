"use client";

import Script from "next/script";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

interface RecaptchaContextValue {
  executeRecaptcha: (action: string) => Promise<string | null>;
  isLoaded: boolean;
}

const RecaptchaContext = createContext<RecaptchaContextValue>({
  executeRecaptcha: async () => null,
  isLoaded: false,
});

export function useRecaptcha() {
  return useContext(RecaptchaContext);
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const readyRef = useRef(false);

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string | null> => {
      if (!SITE_KEY || !readyRef.current) return null;
      try {
        return await window.grecaptcha.execute(SITE_KEY, { action });
      } catch {
        console.error("[reCAPTCHA] Failed to execute");
        return null;
      }
    },
    [],
  );

  if (!SITE_KEY) {
    return (
      <RecaptchaContext.Provider value={{ executeRecaptcha, isLoaded: false }}>
        {children}
      </RecaptchaContext.Provider>
    );
  }

  return (
    <RecaptchaContext.Provider value={{ executeRecaptcha, isLoaded }}>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
        strategy="afterInteractive"
        onLoad={() => {
          window.grecaptcha.ready(() => {
            readyRef.current = true;
            setIsLoaded(true);
          });
        }}
      />
      {children}
    </RecaptchaContext.Provider>
  );
}
