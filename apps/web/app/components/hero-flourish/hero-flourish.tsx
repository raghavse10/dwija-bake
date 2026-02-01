"use client";

type HeroFlourishProps = {
  className?: string;
};

/** Ornamental line with a small flourish — editorial / bakery title treatment */
export function HeroFlourish({ className = "" }: HeroFlourishProps) {
  return (
    <div className={`flex justify-center ${className}`} aria-hidden>
      <svg
        viewBox="0 0 120 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-28 sm:w-32 text-border"
      >
        <path d="M0 6h44" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" />
        <path d="M76 6h44" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" />
        <circle cx="60" cy="6" r="2" fill="var(--color-accent-gold)" />
      </svg>
    </div>
  );
}
