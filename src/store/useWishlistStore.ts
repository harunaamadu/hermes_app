import { create } from "zustand";

interface WishlistState {
  items: string[]; // product IDs
  itemCount: () => number;
}

export const useWishlistStore = create<WishlistState>((_set, get) => ({
  items: [],
  itemCount: () => get().items.length,
}));