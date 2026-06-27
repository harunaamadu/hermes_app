import { create } from "zustand";

interface User {
  name: string;
}

interface UserState {
  user: User | null;
}

export const useUserStore = create<UserState>(() => ({
  user: null,
}));