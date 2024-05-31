import { createLazyFileRoute } from "@tanstack/react-router";
import { Login } from "../../../pages/auth/login/login";

export const Route = createLazyFileRoute("/auth/login/")({
  component: () => <Login />,
});
