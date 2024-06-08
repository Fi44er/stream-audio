import { createFileRoute, redirect } from "@tanstack/react-router";
import { Profile } from "../../pages/profile/profile";
import { checkAuthState } from "../../util/checkAuthState";

export const Route = createFileRoute("/profile/")({
  beforeLoad: ({ context }) => {
    const { getUser } = context.auth;
    if (!checkAuthState(getUser())) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: () => <Profile />,
});
