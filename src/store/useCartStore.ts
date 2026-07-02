import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, ProductVariant } from "@/types/product";

export interface CartLine {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

interface CartState {
  items: CartLine[];

  /** Adds `qty` units. If the same product+variant is already in the cart, increments its quantity instead of duplicating the line. */
  addItem: (product: Product, selectedVariant?: ProductVariant, qty?: number) => void;
  /** Removes a line entirely, regardless of quantity. */
  removeItem: (productId: string, variantValue?: string) => void;
  /** Sets an exact quantity; quantities <= 0 remove the line. */
  updateQuantity: (productId: string, variantValue: string | undefined, quantity: number) => void;
  clear: () => void;

  itemCount: () => number;
  /** Sum of price x quantity across all lines, in the catalog's base currency (USD). Convert for display via useCurrency()/CurrencyFormatter -- never reformat this value directly. */
  subtotalInBase: () => number;
}

function sameLine(
  line: CartLine,
  productId: string,
  variantValue: string | undefined,
) {
  return (
    line.product.id === productId &&
    line.selectedVariant?.value === variantValue
  );
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, selectedVariant, qty = 1) => {
        set((state) => {
          const existing = state.items.find((line) =>
            sameLine(line, product.id, selectedVariant?.value),
          );

          if (existing) {
            return {
              items: state.items.map((line) =>
                line === existing
                  ? { ...line, quantity: line.quantity + qty }
                  : line,
              ),
            };
          }

          return {
            items: [...state.items, { product, selectedVariant, quantity: qty }],
          };
        });
      },

      removeItem: (productId, variantValue) => {
        set((state) => ({
          items: state.items.filter(
            (line) => !sameLine(line, productId, variantValue),
          ),
        }));
      },

      updateQuantity: (productId, variantValue, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantValue);
          return;
        }
        set((state) => ({
          items: state.items.map((line) =>
            sameLine(line, productId, variantValue)
              ? { ...line, quantity }
              : line,
          ),
        }));
      },

      clear: () => set({ items: [] }),

      itemCount: () => get().items.reduce((sum, line) => sum + line.quantity, 0),

      subtotalInBase: () =>
        get().items.reduce(
          (sum, line) => sum + line.product.price * line.quantity,
          0,
        ),
    }),
    {
      name: "hermes_cart",
      // Cart lines carry a full Product snapshot (price/name/image at time
      // of adding) rather than just an id -- this is what keeps the cart
      // working the same way regardless of whether products come from
      // Sanity, mock data, or (previously) Prisma. If the price changes in
      // Sanity after something's already in the cart, the cart still shows
      // what the shopper saw when they added it; re-add to refresh it.
      partialize: (state) => ({ items: state.items }),
    },
  ),
);