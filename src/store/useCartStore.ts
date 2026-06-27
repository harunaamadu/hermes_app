import { create } from "zustand";

interface CartItem {
  id: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  itemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}));