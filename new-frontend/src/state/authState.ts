import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthState = create(
  persist(
    (set: (partialState: Partial<State>) => void, get: () => State) => ({
      id: 0,
      setUser(id: number) {
        set({ id });
      },
      getUser(): number {
        return get().id;
      },
    }),
    {
      name: "todos-storage",
      getStorage: () => localStorage,
    }
  )
);

export interface State {
  id: number;
  setUser: (id: number) => void;
  getUser: () => number;
}

export type AuthContext = ReturnType<typeof useAuthState>;
