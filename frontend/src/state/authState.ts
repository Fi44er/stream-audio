import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IStateLogin } from "../pages/Auth/login/types/types";

export const useAuthState = create(
  persist(
    (set: (partialState: Partial<State>) => void, get: () => State) => ({
      user: {
        email: "",
        password: "",
        passwordRepeat: "",
      },
      setUser(user: IStateLogin) {
        set({ user });
      },
      getUser(): IStateLogin {
        return get().user;
      },
    }),
    {
      name: "todos-storage",
      getStorage: () => sessionStorage,
    }
  )
);

interface State {
  user: IStateLogin;
  setUser: (user: IStateLogin) => void;
  getUser: () => IStateLogin;
}
