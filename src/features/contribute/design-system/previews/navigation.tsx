"use client";

import { Github, Globe, Menu, Search } from "lucide-react";
import type { ReactNode } from "react";

export const navigationPreviews: Record<
  string,
  { preview: ReactNode; code: string }
> = {
  navbar: {
    preview: (
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-primary">
              {"<VB />"}
            </span>
            <nav className="hidden items-center gap-2 sm:flex">
              <span className="rounded-md px-2 py-1 text-xs text-primary">
                Home
              </span>
              <span className="rounded-md px-2 py-1 text-xs text-muted-foreground">
                Content
              </span>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <Globe className="h-3.5 w-3.5 text-muted-foreground" />
            <Menu className="h-3.5 w-3.5 text-muted-foreground sm:hidden" />
          </div>
        </div>
      </div>
    ),
    code: `{/* Navbar is rendered in layout.tsx */}
<Navbar />

{/* It includes: */}
<NavLogo />
<DesktopNav />   {/* navGroups + submenus */}
<NavActions />   {/* search, language, mobile toggle */}
<MobileNav />    {/* mobile drawer */}`,
  },

  globalSearch: {
    preview: (
      <div className="flex items-center justify-center">
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary">
          <Search className="h-4 w-4" />
          <span>Search...</span>
          <kbd className="ml-4 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono">
            Ctrl+K
          </kbd>
        </button>
      </div>
    ),
    code: `{/* GlobalSearch uses Fuse.js for fuzzy matching */}
<GlobalSearch />

{/* Triggered by Ctrl+K or clicking the search button */}
{/* Uses Dialog + Input + search-data.ts */}`,
  },

  skipLink: {
    preview: (
      <div className="flex items-center justify-center">
        <span className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg">
          Skip to content
        </span>
      </div>
    ),
    code: `{/* SkipLink is rendered in layout.tsx */}
<SkipLink />

{/* Visible only on keyboard focus (Tab) */}
{/* Links to #main */}`,
  },

  footer: {
    preview: (
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-border bg-background/50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-primary">{"<VB />"}</span>
            <span className="text-[10px] text-muted-foreground">© 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <Github className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </div>
      </div>
    ),
    code: `{/* Footer is rendered in layout.tsx */}
<Footer />

{/* Includes: branding, copyright, social links */}`,
  },
};
