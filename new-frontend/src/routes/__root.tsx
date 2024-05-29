import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components/sidebar/sidebar";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="content">
        <Sidebar />
        <Outlet />
      </div>
    </>
  ),
});
