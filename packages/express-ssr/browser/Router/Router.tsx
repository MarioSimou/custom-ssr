import React, { FC } from 'react'
import type { AnyRoutes, Route } from '../types'
import { usePageChange } from './usePageChange'
import { setRouteActionCreator, routerReducer } from './routerReducer'
import { RouterContext, RouterContextProps } from './RouterContext'
import { newLogger, EVENT_PAGE_CHANGE } from '@ssr/core'
import type { Maybe } from '@ssr/core'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { processMetadata } from '../../server/Metadata'

const ErrInitialRouteNotSet = new Error('failed to set initial route')

export type RouterProps<TRoutes extends AnyRoutes> = {
  routes: TRoutes
} & Pick<RouterContextProps, 'debug' | 'prefetch'>

export const Router = <TRoutes extends AnyRoutes>({
  routes,
  debug,
  prefetch = { enabled: false },
}: RouterProps<TRoutes>) => {
  const [{ currentRoute }, dispatch] = React.useReducer(routerReducer, {
    currentRoute: undefined,
  })
  const logger = newLogger({ debug })

  const setRoute = (route: Route<FC>) => dispatch(setRouteActionCreator(route))
  const getRoute = (routePattern: string): Maybe<Route<FC>> =>
    routes[routePattern]
  const navigate = (pathname: string, state: Record<string, unknown> = {}) => {
    if (debug) {
      logger.info(
        `navigating from '${window.location.pathname}' to '${pathname}'`
      )
    }

    window.history.pushState(state, '', pathname)
    window.dispatchEvent(new CustomEvent(EVENT_PAGE_CHANGE, state))
  }
  usePageChange(routes, setRoute, logger)

  if (!currentRoute) {
    const { data, routePattern, metadata } = window.__SSR__
    const { Component } = getRoute(routePattern) ?? { Component: undefined }
    if (!Component) {
      throw ErrInitialRouteNotSet
    }

    setRoute({ Component, data, metadata })
    return null
  }

  const { Component, data, metadata } = currentRoute

  return (
    <HelmetProvider>
      <RouterContext.Provider
        value={{ getRoute, navigate, debug, prefetch, logger }}
      >
        <Helmet>{processMetadata(metadata)}</Helmet>
        <Component {...data} />
      </RouterContext.Provider>
    </HelmetProvider>
  )
}
