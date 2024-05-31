import { createLazyFileRoute } from "@tanstack/react-router";
import { Register } from "../../../pages/auth/register/register";

export const Route = createLazyFileRoute("/auth/register/")({
  component: () => <Register />,
});
