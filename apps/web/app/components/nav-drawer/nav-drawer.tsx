"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/order", label: "Order" },
  { href: "/about", label: "About" },
] as const;

type NavDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function NavDrawer({ open, onClose }: NavDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        role="presentation"
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer panel */}
      <aside
        aria-label="Navigation menu"
        aria-hidden={!open}
        className={`fixed left-0 top-0 z-50 h-full w-[min(85vw,20rem)] border-r border-border bg-surface shadow-xl transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border p-4">
            <span className="text-sm font-medium text-muted">Menu</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-lg p-2 text-foreground hover:bg-background transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className="rounded-lg px-4 py-3 text-foreground hover:bg-background transition-colors font-medium"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-border p-4 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={onClose}
              className="rounded-lg px-4 py-3 text-foreground hover:bg-background transition-colors font-medium flex items-center gap-2"
            >
              Login
            </Link>
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="text-sm text-muted">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
