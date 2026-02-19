/**
 * Cookie de consentimento para analytics (LGPD/GDPR).
 * Valores: "accepted" = analytics ativados, "rejected" = apenas essenciais.
 * Ausência do cookie = banner deve ser exibido (não rastrear até escolha).
 */

export const COOKIE_CONSENT_NAME = "devshowcase_cookie_consent";
export const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export type ConsentStatus = "accepted" | "rejected" | null;

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  try {
    const match = document.cookie
      .split(";")
      .map((s) => s.trim())
      .find((s) => s.startsWith(`${name}=`));
    if (!match) return null;
    return decodeURIComponent(match.split("=")[1] ?? "");
  } catch {
    return null;
  }
}

function setCookie(name: string, value: string, maxAge: number): void {
  if (typeof document === "undefined") return;
  const secure =
    typeof location !== "undefined" && location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

/**
 * Retorna o status atual de consentimento (apenas no client).
 */
export function getConsent(): ConsentStatus {
  const raw = getCookie(COOKIE_CONSENT_NAME);
  if (raw === "accepted" || raw === "rejected") return raw;
  return null;
}

/**
 * Define o consentimento e persiste no cookie.
 */
export function setConsent(status: "accepted" | "rejected"): void {
  setCookie(COOKIE_CONSENT_NAME, status, COOKIE_CONSENT_MAX_AGE);
}

/**
 * Indica se analytics (Vercel + tracking próprio) podem ser executados.
 */
export function hasAnalyticsConsent(): boolean {
  return getConsent() === "accepted";
}
