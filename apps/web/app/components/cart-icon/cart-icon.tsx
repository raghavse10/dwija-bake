"use client";

import { ShoppingBag, ShoppingBasket, ShoppingCart } from "lucide-react";
import Link from "next/link";

type CartIconProps = {
  count?: number;
};

function getCartIcon(count: number) {
  if (count <= 2) return ShoppingBag;
  if (count <= 5) return ShoppingBasket;
  return ShoppingCart;
}

export function CartIcon({ count = 0 }: CartIconProps) {
  const showBadge = count > 0;
  const displayCount = count > 9 ? "9+" : String(count);
  const isTwoChars = displayCount === "9+";
  const Icon = getCartIcon(count);

  return (
    <Link
      href="/cart"
      aria-label={showBadge ? `Cart (${count} items)` : "Cart"}
      className="relative rounded-lg p-2 text-foreground hover:bg-background transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      <Icon className="size-5" />
      {showBadge && (
        <span
          className={`absolute font-body -top-0.5 -right-0.5 flex h-4.5 w-4.5 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent font-semibold text-white md:h-5 md:w-5 dark:bg-accent-gold dark:text-brand-deep ${
            isTwoChars ? "text-[0.55rem] md:text-[0.65rem]" : "text-[0.75rem] md:text-[0.8rem]"
          }`}
          aria-hidden
        >
          {displayCount}
        </span>
      )}
    </Link>
  );
}
