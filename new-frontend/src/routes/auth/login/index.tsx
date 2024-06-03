import { createFileRoute, redirect } from "@tanstack/react-router";
import { Login } from "../../../pages/auth/login/login";
import { checkAuthState } from "../../../util/checkAuthState";

export const Route = createFileRoute("/auth/login/")({
  beforeLoad: ({ context }) => {
    const { getUser } = context.auth;
    if (checkAuthState(getUser())) {
      throw redirect({
        to: "/profile",
      });
    }
  },
  component: () => <Login />,
});
