"use client";

import { Menu, Search, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "../theme-toggle";
import { NavDrawer } from "../nav-drawer";
import { CartIcon } from "../cart-icon";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/order", label: "Order" },
  { href: "/about", label: "About" },
] as const;

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <header className="font-heading relative sticky top-0 z-30 border-b border-border bg-surface/90 backdrop-blur-md">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-accent-gold/50 pointer-events-none" aria-hidden />
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* Mobile: menu (left) */}
          <div className="flex shrink-0 md:hidden">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="rounded-lg p-2 text-foreground hover:bg-background transition-colors"
            >
              <Menu className="size-6" />
            </button>
          </div>

          {/* Desktop: brand (left) | Mobile: spacer for centering */}
          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mr-0 flex shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg"
              aria-label="Home"
            >
              <span className="relative flex h-9 w-36 items-center justify-center overflow-hidden rounded-md bg-brand-deep/10">
                {/* Replace with brand.png when provided; fallback shows until then */}
                <img
                  src="/brand.png"
                  alt="Dwija Bake Studio"
                  className="h-full w-full object-contain object-center"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) (fallback as HTMLElement).style.display = "flex";
                  }}
                />
                <span
                  className="hidden items-center justify-center text-sm font-semibold text-brand-deep"
                  style={{ display: "none" }}
                >
                  Brand
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop: nav links (middle) */}
          <nav
            aria-label="Main"
            className="hidden md:flex flex-1 justify-center gap-1"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-heading rounded-lg px-4 py-2 text-foreground hover:bg-background transition-colors font-medium tracking-wide"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop: actions (right) | Mobile: search + cart (right) */}
          <div className="flex shrink-0 items-center gap-5">
            <div className="flex items-center gap-1">
              <Link
                href="/search"
                aria-label="Search"
                className="rounded-lg p-2 text-foreground hover:bg-background transition-colors"
              >
                <Search className="size-5 sm:size-5" />
              </Link>
              {/* Login: desktop only (mobile has it in drawer) */}
              <Link
                href="/login"
                aria-label="Login"
                className="hidden md:flex rounded-lg p-2 text-foreground hover:bg-background transition-colors"
              >
                <User className="size-5" />
              </Link>
              <CartIcon count={2} />
            </div>
            <div className="hidden md:block ml-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
