import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

interface WishlistState {
  /** Full product snapshots, not just ids, so the dashboard wishlist section and header can render name/image/price without a refetch. */
  items: Product[];

  add: (product: Product) => void;
  remove: (productId: string) => void;
  toggle: (product: Product) => void;
  has: (productId: string) => boolean;
  clear: () => void;

  itemCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (product) => {
        set((state) =>
          state.items.some((p) => p.id === product.id)
            ? state
            : { items: [...state.items, product] },
        );
      },

      remove: (productId) => {
        set((state) => ({
          items: state.items.filter((p) => p.id !== productId),
        }));
      },

      toggle: (product) => {
        const exists = get().has(product.id);
        if (exists) get().remove(product.id);
        else get().add(product);
      },

      has: (productId) => get().items.some((p) => p.id === productId),

      clear: () => set({ items: [] }),

      itemCount: () => get().items.length,
    }),
    {
      name: "hermes_wishlist",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);