// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export const useAuthStore = create<any>(persist((get, set) => ({
//   id: null,
//   setUser(): number {
//     return get().id;
//   },
// }), {
//     name: "todos-storage",
//     getStorage: () => sessionStorage,
//   }));

// interface State {
//   id: number | null;
//   setUser(): number;
// }

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
      getStorage: () => sessionStorage,
    }
  )
);

interface State {
  id: number;
  setUser: (id: number) => void;
  getUser: () => number;
}
