"use client";

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { useLocaleStore } from "@/store/useLocaleStore";
import { convertAmount, formatPrice } from "@/lib/currency";
import { ExchangeRates } from "@/types/currency";

interface CurrencyContextValue {
  rates: ExchangeRates | null;
  loading: boolean;
  /** Set when live rates couldn't be fetched and we've fallen back to 1:1 — show this to the user if you display prices prominently. */
  error: string | null;
  /** Converts a base-currency (USD) amount into the user's active currency. Use `format` instead unless you need the raw number. */
  convert: (amountInBase: number) => number;
  /** Converts + formats in one call. This is the function nearly every component should use. */
  format: (amountInBase: number) => string;
  refresh: () => void;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

// Used while rates are loading or if the fetch fails — keeps prices rendering
// (unconverted, in USD) rather than crashing or showing blank values.
const FALLBACK_RATES: ExchangeRates = {
  base: "USD",
  rates: { USD: 1 },
  fetchedAt: 0,
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const currency = useLocaleStore((s) => s.currency);
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/exchange-rates");
      if (!res.ok) throw new Error("Failed to load exchange rates");
      const data: ExchangeRates = await res.json();
      setRates(data);
    } catch (err) {
      console.error("[CurrencyProvider]", err);
      setError("Showing approximate prices — live exchange rates are unavailable right now.");
      setRates((prev) => prev ?? FALLBACK_RATES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
    // Long-lived tabs (someone leaves Hermes open overnight) shouldn't drift
    // on stale rates — refresh on the same hourly cadence as the API cache.
    const interval = setInterval(fetchRates, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [fetchRates]);

  const activeRates = rates ?? FALLBACK_RATES;

  const convert = useCallback(
    (amountInBase: number) => convertAmount(amountInBase, activeRates.base, currency.code, activeRates),
    [activeRates, currency.code],
  );

  const format = useCallback(
    (amountInBase: number) => formatPrice(convert(amountInBase), currency.code),
    [convert, currency.code],
  );

  return (
    <CurrencyContext.Provider value={{ rates, loading, error, convert, format, refresh: fetchRates }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a <CurrencyProvider> — add it to your root layout.tsx");
  }
  return ctx;
}