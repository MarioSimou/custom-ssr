import type { FC } from 'react'
import type { Metadata } from '@ssr/core'

export type RoutePattern = string
export type Route<TComponent extends FC> = {
  Component: TComponent
  data?: Parameters<FC>['0']
  metadata?: Metadata
}
export type AnyRoutes = Record<RoutePattern, Route<FC>>

export type ValueOfRoutes<TRoutes extends AnyRoutes> = {
  [TRoutePattern in keyof TRoutes]: TRoutes[TRoutePattern]
}[keyof TRoutes]
