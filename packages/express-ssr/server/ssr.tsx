import { getPage } from './getPage'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { parseUrl, ParseUrlResult } from './parseUrl'
import { Html } from './Html'
import type { Request, RequestHandler } from 'express'
import {
  HEADER_X_PAGE_CHANGE,
  HEADER_X_PAGE_PREFETCH,
  HEADER_CACHE_CONTROL,
  HEADER_CONTENT_TYPE,
  MIME_TEXT_HTML,
  newLogger,
  StatusBadRequest,
  StatusNotFound,
  newErrorApiResponse,
} from '@ssr/core'
import type { Metadata } from './types'
import type { Maybe, Data } from '@ssr/core'
import { HelmetProvider } from 'react-helmet-async'

const mutateRequest = (
  req: Request,
  parseParams: Extract<ParseUrlResult, { success: true }>
) => {
  if (parseParams.type === 'dynamic') {
    req.params = parseParams.params
  }
  return req
}

export type SSROptions = {
  clientEntrypoint?: string
  debug?: boolean
  headers?: Record<string, string> | Headers
}

const defaultHeaders = {
  [HEADER_CACHE_CONTROL]: `max-age=120, stale-while-revalidate=59, immutable`,
}

export const ssr = (options: SSROptions): RequestHandler => {
  const {
    clientEntrypoint = '/public/client-entrypoint.js',
    debug,
    headers = defaultHeaders,
  } = options
  const logger = newLogger({ debug })
  logger.info(`default client entrypoint is '${clientEntrypoint}'`)

  return async (req, res) => {
    const parseUrlResult = await parseUrl(req.url)
    logger.info(parseUrlResult)

    if (parseUrlResult.success === false) {
      return res
        .status(StatusBadRequest)
        .json(newErrorApiResponse(parseUrlResult.message))
    }

    const { filepath, routePattern } = parseUrlResult
    const getPageResult = await getPage(filepath)

    if (getPageResult.success === false) {
      return res
        .status(StatusNotFound)
        .json(newErrorApiResponse(getPageResult.message))
    }

    mutateRequest(req, parseUrlResult)

    const { Component, dataLoader, metaLoader } = getPageResult.data

    let data: Maybe<Data>
    if (dataLoader) {
      data = await dataLoader({
        req,
        res,
      })
    }

    let metadata: Metadata = []
    if (metaLoader) {
      metadata = metaLoader(data)
    }

    const isPageTransition = Boolean(req.get(HEADER_X_PAGE_CHANGE))
    const isPagePrefetch = Boolean(req.get(HEADER_X_PAGE_PREFETCH))

    if (isPageTransition || isPagePrefetch) {
      res.set(headers)
      return res.json({ data, routePattern, metadata })
    }

    const helmetProvider = {}
    const html = renderToString(
      <HelmetProvider context={helmetProvider}>
        <Html
          clientEntrypoint={clientEntrypoint}
          routePattern={routePattern}
          data={data}
          metadata={metadata}
        >
          {React.createElement(Component, data)}
        </Html>
      </HelmetProvider>
    )

    res.set(HEADER_CONTENT_TYPE, MIME_TEXT_HTML)
    return res.send(html)
  }
}
