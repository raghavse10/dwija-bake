"use client";

import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
  /** When true, renders gold L-shaped corner accents */
  cornerAccent?: boolean;
}

export function Card({
  children,
  className = "",
  cornerAccent = false,
}: CardProps) {
  return (
    <div
      className={`relative rounded-lg border border-border bg-surface/80 backdrop-blur-sm p-8 sm:p-10 shadow-[0_4px_24px_-4px_rgba(89,41,53,0.08)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.2)] ${className}`.trim()}
    >
      {cornerAccent && (
        <>
          <span
            className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-accent-gold/60 rounded-tl-md"
            aria-hidden
          />
          <span
            className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-accent-gold/60 rounded-tr-md"
            aria-hidden
          />
          <span
            className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-accent-gold/60 rounded-bl-md"
            aria-hidden
          />
          <span
            className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-accent-gold/60 rounded-br-md"
            aria-hidden
          />
        </>
      )}
      {children}
    </div>
  );
}
