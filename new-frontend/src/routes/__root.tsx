import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components/sidebar/sidebar";
import { State } from "../state/authState";

interface IRouterContext {
  auth: State;
}

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: () => (
    <>
      <div className="content">
        <Sidebar />
        <Outlet />
      </div>
    </>
  ),
});
