import "@testing-library/jest-dom";

import { vi } from "vitest";

process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000";

// NOTE: don't stub `fetch` globally here — MSW needs the real fetch implementation
// to intercept requests during tests. Stubbing it caused API mocks to be ignored.

// Mock global para Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  useParams: () => ({}),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
  notFound: vi.fn(),
}));

// Mock next/font/google
vi.mock("next/font/google", () => ({
  IBM_Plex_Sans: () => ({
    className: "mock-ibm-plex-sans",
    style: { fontFamily: "IBM Plex Sans" },
  }),
}));

// JSDOM polyfills para scroll
Object.defineProperty(HTMLElement.prototype, "scrollTo", {
  value: function (options: ScrollToOptions | number, y?: number) {
    if (typeof options === "object") {
      this.scrollTop = options.top || 0;
      this.scrollLeft = options.left || 0;
    } else {
      this.scrollTop = y || 0;
      this.scrollLeft = options || 0;
    }
    // Disparar evento scroll
    this.dispatchEvent(new Event("scroll", { bubbles: true }));
  },
  writable: true,
  configurable: true,
});

Object.defineProperty(HTMLElement.prototype, "scrollBy", {
  value: function (options: ScrollToOptions | number, y?: number) {
    if (typeof options === "object") {
      this.scrollTop += options.top || 0;
      this.scrollLeft += options.left || 0;
    } else {
      this.scrollTop += y || 0;
      this.scrollLeft += options || 0;
    }
    // Disparar evento scroll
    this.dispatchEvent(new Event("scroll", { bubbles: true }));
  },
  writable: true,
  configurable: true,
});
