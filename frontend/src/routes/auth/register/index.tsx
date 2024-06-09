import { createFileRoute, redirect } from "@tanstack/react-router";
import { Register } from "../../../pages/auth/register/register";
import { checkAuthState } from "../../../util/checkAuthState";

export const Route = createFileRoute("/auth/register/")({
  beforeLoad: ({ context }) => {
    const { getUser } = context.auth;
    if (checkAuthState(getUser())) {
      throw redirect({
        to: "/profile",
      });
    }
  },
  component: () => <Register />,
});
