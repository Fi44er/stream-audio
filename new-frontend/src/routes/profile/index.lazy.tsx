import { createLazyFileRoute } from "@tanstack/react-router";
import { Profile } from "../../pages/profile/profile";

export const Route = createLazyFileRoute("/profile/")({
  component: () => <Profile />,
});
