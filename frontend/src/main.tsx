/* eslint-disable react-hooks/rules-of-hooks */
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RouterProvider, createRouter} from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {useAuth} from './hooks/useAuth';
import './index.css';
import {routeTree} from './routeTree.gen';

const router = createRouter({
	routeTree,
	context: {authentication: undefined!},

});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
const queryClient = new QueryClient();
const authentication = useAuth();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} context={{authentication}} />
		</QueryClientProvider>
	</React.StrictMode>,
);
