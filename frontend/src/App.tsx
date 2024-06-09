import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useAuthState } from "./state/authState";
import { routeTree } from "./routeTree.gen";
import { NotFound } from "./components/notFound/notFound";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
  routeTree,
  context: { auth: undefined! },
  defaultNotFoundComponent: () => <NotFound />,
});

function App() {
  const state = useAuthState();
  return <RouterProvider router={router} context={{ auth: state }} />;
}
export default App;
