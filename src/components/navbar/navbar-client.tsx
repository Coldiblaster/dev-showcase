"use client";

import { useCallback, useState } from "react";

import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { NavActions } from "./nav-actions";
import { NavLogo } from "./nav-logo";

interface NavbarClientProps {
  badgePaths: Record<string, "popular" | "trending">;
}

export function NavbarClient({ badgePaths }: NavbarClientProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <NavLogo />
        <DesktopNav badgePaths={badgePaths} />
        <NavActions isMobileOpen={isMobileOpen} onMobileToggle={toggleMobile} />
      </nav>

      <MobileNav
        isOpen={isMobileOpen}
        onClose={closeMobile}
        badgePaths={badgePaths}
      />
    </header>
  );
}
