"use client";

export type DividerVariant = "default" | "simple" | "minimal";

export interface DividerProps {
  className?: string;
  /** Visual style of the divider. Default: "default" */
  variant?: DividerVariant;
}

/** Decorative divider with variants — bakery / editorial feel */
export function Divider({ className = "", variant = "default" }: DividerProps) {
  if (variant === "minimal") {
    return (
      <div
        className={`flex items-center justify-center gap-2 py-5 ${className}`}
        aria-hidden
      >
        <span className="size-1.5 rounded-full bg-border" />
        <span className="size-1.5 rounded-full bg-accent-gold/80" />
        <span className="size-1.5 rounded-full bg-border" />
      </div>
    );
  }

  if (variant === "simple") {
    return (
      <div
        className={`flex items-center justify-center gap-3 py-6 ${className}`}
        aria-hidden
      >
        <span className="h-px w-12 sm:w-16 bg-border rounded-full opacity-80" />
        <span className="flex gap-1.5">
          <span className="size-1.5 rounded-full bg-accent-gold" />
          <span className="size-1.5 rounded-full bg-border" />
          <span className="size-1.5 rounded-full bg-accent-gold" />
        </span>
        <span className="h-px w-12 sm:w-16 bg-border rounded-full opacity-80" />
      </div>
    );
  }

  /* default: double lines, dots, ticks */
  return (
    <div
      className={`flex items-center justify-center gap-4 py-8 ${className}`}
      aria-hidden
    >
      <span className="h-px w-16 sm:w-20 bg-border rounded-full opacity-80" />
      <span className="h-px w-px bg-border rounded-full opacity-60" />
      <span className="flex gap-2 items-center">
        <span className="size-2 rounded-full bg-accent-gold/90" />
        <span className="size-1.5 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-accent-gold/90" />
      </span>
      <span className="h-px w-px bg-border rounded-full opacity-60" />
      <span className="h-px w-16 sm:w-20 bg-border rounded-full opacity-80" />
    </div>
  );
}
