import React from 'react'
import type { FC } from 'react'
import type { RoutePattern, Route } from '../types'
import type { Logger, Maybe } from '@ssr/core'

type PrefetchOptions = { enabled: false } | { enabled: true; delay: number }

export type RouterContextProps = {
  getRoute: (routePattern: RoutePattern) => Maybe<Route<FC>>
  navigate: (path: string, data?: Maybe<Record<string, unknown>>) => void
  debug?: boolean
  prefetch?: PrefetchOptions
  logger: Logger
}

export const initialRouterContext = {
  getRoute: () => null,
  navigate: () => null,
  logger: () => null,
  debug: false,
  prefetch: { enabled: false },
} as unknown as RouterContextProps

export const RouterContext =
  React.createContext<RouterContextProps>(initialRouterContext)
