export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function setLocaleCookie(name: string, locale: string) {
  // Secure attribute only when running on HTTPS is not easily detectable here,
  // so keep SameSite=Lax and Path=/ which is safe for most cases.
  document.cookie = `${name}=${encodeURIComponent(locale)}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax;`;
}

export function getLocaleCookie(name: string): string | null {
  try {
    const match = document.cookie
      .split(";")
      .map((s) => s.trim())
      .find((s) => s.startsWith(`${name}=`));
    if (!match) return null;
    return decodeURIComponent(match.split("=")[1] || "");
  } catch {
    return null;
  }
}

export function clearLocaleCookie(name: string) {
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax;`;
}
