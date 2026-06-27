import { create } from "zustand";

interface WishlistState {
  items: string[]; // product IDs
}

export const useWishlistStore = create<WishlistState>(() => ({
  items: [],
}));