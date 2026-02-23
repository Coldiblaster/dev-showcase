"use client";

import dynamic from "next/dynamic";

/**
 * Agrupamento de todos os overlays/widgets que dependem exclusivamente
 * de APIs de browser (localStorage, window, usePathname).
 * dynamic com ssr:false só pode ser usado em Client Components.
 */

const FloatingActionMenu = dynamic(
  () =>
    import("@/components/floating-action-menu").then(
      (m) => m.FloatingActionMenu,
    ),
  { ssr: false },
);

const MobileActionBar = dynamic(
  () => import("@/components/mobile-action-bar").then((m) => m.MobileActionBar),
  { ssr: false },
);

const ChatWidget = dynamic(
  () => import("@/components/chat/chat-widget").then((m) => m.ChatWidget),
  { ssr: false },
);

const TerminalEasterEgg = dynamic(
  () => import("@/components/terminal").then((m) => m.TerminalEasterEgg),
  { ssr: false },
);

export function ClientOverlays() {
  return (
    <>
      <FloatingActionMenu />
      <ChatWidget />
      <MobileActionBar />
      <TerminalEasterEgg />
    </>
  );
}
