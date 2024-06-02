/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RoomRoomidImport } from './routes/room/$roomid'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const ProfileIndexLazyImport = createFileRoute('/profile/')()
const AuthRegisterIndexLazyImport = createFileRoute('/auth/register/')()
const AuthLoginIndexLazyImport = createFileRoute('/auth/login/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ProfileIndexLazyRoute = ProfileIndexLazyImport.update({
  path: '/profile/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/profile/index.lazy').then((d) => d.Route))

const RoomRoomidRoute = RoomRoomidImport.update({
  path: '/room/$roomid',
  getParentRoute: () => rootRoute,
} as any)

const AuthRegisterIndexLazyRoute = AuthRegisterIndexLazyImport.update({
  path: '/auth/register/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/auth/register/index.lazy').then((d) => d.Route),
)

const AuthLoginIndexLazyRoute = AuthLoginIndexLazyImport.update({
  path: '/auth/login/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/auth/login/index.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/room/$roomid': {
      id: '/room/$roomid'
      path: '/room/$roomid'
      fullPath: '/room/$roomid'
      preLoaderRoute: typeof RoomRoomidImport
      parentRoute: typeof rootRoute
    }
    '/profile/': {
      id: '/profile/'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/login/': {
      id: '/auth/login/'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/register/': {
      id: '/auth/register/'
      path: '/auth/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthRegisterIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  RoomRoomidRoute,
  ProfileIndexLazyRoute,
  AuthLoginIndexLazyRoute,
  AuthRegisterIndexLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/room/$roomid",
        "/profile/",
        "/auth/login/",
        "/auth/register/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/room/$roomid": {
      "filePath": "room/$roomid.tsx"
    },
    "/profile/": {
      "filePath": "profile/index.lazy.tsx"
    },
    "/auth/login/": {
      "filePath": "auth/login/index.lazy.tsx"
    },
    "/auth/register/": {
      "filePath": "auth/register/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
