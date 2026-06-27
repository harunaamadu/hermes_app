"use client";

import { useCurrency } from "@/components/providers/CurrencyProvider";

interface CurrencyFormatterProps {
  /** Amount stored in the catalog's base currency (USD) — never pass an already-converted value. */
  amountInBase: number;
  className?: string;
}

/**
 * Lowest-level currency display primitive in the app. Converts + formats a
 * base-currency amount into the user's active currency via useCurrency().
 *
 * Render through this anywhere a price or money amount appears — PriceTag,
 * cart totals, checkout summaries, inline promo copy — rather than calling
 * useCurrency() directly in each component. Keeps loading/fallback behavior
 * (and any future formatting changes) consistent everywhere in one place.
 */
export default function CurrencyFormatter({ amountInBase, className }: CurrencyFormatterProps) {
  const { format, loading } = useCurrency();

  if (loading) {
    return (
      <span
        aria-hidden
        className={`inline-block h-[1em] w-12 animate-pulse rounded bg-current/10 align-middle ${className ?? ""}`}
      />
    );
  }

  return <span className={className}>{format(amountInBase)}</span>;
}