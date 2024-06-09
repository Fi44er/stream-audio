import { createLazyFileRoute } from "@tanstack/react-router";
import { Index } from "../pages/index/index";

export const Route = createLazyFileRoute("/")({
  component: () => <Index />,
});
