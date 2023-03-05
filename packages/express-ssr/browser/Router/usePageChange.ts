import React, { FC } from 'react'
import type { Route } from '../types'
import {
  fetchPageData,
  HEADER_X_PAGE_CHANGE,
  EVENT_PAGE_CHANGE,
  Logger,
} from '@ssr/core'

export const usePageChange = <TRoutes>(
  routes: TRoutes,
  setRoute: (route: Route<FC>) => void,
  logger: Logger
) => {
  React.useEffect(() => {
    const listener: EventListener = async () => {
      const { pathname } = window.location
      const fetchPageDataResult = await fetchPageData(pathname, {
        headers: { [HEADER_X_PAGE_CHANGE]: 'true' },
      })

      if (fetchPageDataResult.success === false) {
        return logger.error(fetchPageDataResult.message)
      }
      const { routePattern, data, metadata } = fetchPageDataResult.data
      const { Component } = routes[routePattern]

      window.__SSR__ = { routePattern, data, metadata }
      return setRoute({ Component, data, metadata })
    }

    window.addEventListener(EVENT_PAGE_CHANGE, listener)
    return () => window.removeEventListener(EVENT_PAGE_CHANGE, listener)
  }, [])

  return undefined
}
