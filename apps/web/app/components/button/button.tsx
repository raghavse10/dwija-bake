"use client";

import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-gold text-brand-deep hover:opacity-90 active:opacity-95 border border-transparent",
  secondary:
    "bg-surface text-foreground border-2 border-border hover:border-accent-gold/50 hover:bg-pink-mist dark:hover:bg-pink-burgundy/20 active:opacity-90 transition-all",
  outline:
    "bg-transparent text-foreground border border-border hover:bg-surface active:opacity-90",
  ghost:
    "bg-transparent text-foreground border border-transparent hover:bg-surface active:opacity-90",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-sm",
  md: "px-4 py-2 text-sm font-medium rounded-md",
  lg: "px-8 py-3.5 text-base font-medium rounded-xl",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders full width. */
  fullWidth?: boolean;
  /** When set, renders as <a> instead of <button>. */
  href?: string;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      disabled,
      children,
      href,
      ...props
    },
    ref
  ) => {
    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}`.trim();

    if (href != null) {
      return (
        <a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={disabled ? undefined : href}
          aria-disabled={disabled}
          className={classes}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.RefObject<HTMLButtonElement>}
        type="button"
        disabled={disabled}
        className={classes}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
