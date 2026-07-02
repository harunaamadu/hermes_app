"use client";

import { client } from "@/sanity/lib/client";
import { useEffect, useRef, useState } from "react";

interface UseSanityRealtimeOptions<T> {
  /** The query whose *result set* you want to keep in sync, e.g. allProductsQuery. */
  query: string;
  /** The lighter-weight query passed to client.listen() — usually `*[_type == "product"]`. */
  listenQuery: string;
  params?: Record<string, unknown>;
  initialData: T;
  /** Skip subscribing (e.g. while Sanity isn't configured). */
  enabled?: boolean;
}

/**
 * Keeps a list of documents live: seeds from server-rendered `initialData`,
 * then opens a realtime subscription (Sanity's Listen API, an SSE
 * connection — no polling) and refetches the full projected query whenever
 * any matching document is created, patched, or deleted by anyone, in any
 * tab, anywhere. This is what powers "no refresh needed" on both the
 * storefront and the dashboard catalog tables.
 */
export function useSanityRealtime<T>({
  query,
  listenQuery,
  params = {},
  initialData,
  enabled = true,
}: UseSanityRealtimeOptions<T>) {
  const [data, setData] = useState<T>(initialData);
  const [isLive, setIsLive] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    const refetch = () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      // Multiple mutations often land in the same batch (e.g. bulk edit) —
      // debounce so we issue one refetch instead of one per document.
      debounceRef.current = setTimeout(async () => {
        try {
          const fresh = await client
            .withConfig({ useCdn: false })
            .fetch<T>(query, params);
          if (!cancelled) setData(fresh);
        } catch (error) {
          console.error("[sanity] realtime refetch failed:", error);
        }
      }, 250);
    };

    const subscription = client.listen(listenQuery, params).subscribe({
      next: refetch,
      error: (error) => {
        console.error("[sanity] realtime subscription error:", error);
        setIsLive(false);
      },
    });
    setIsLive(true);

    return () => {
      cancelled = true;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      subscription.unsubscribe();
      setIsLive(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- query/listenQuery/params are expected to be stable per call site
  }, [enabled]);

  return { data, isLive, setData };
}