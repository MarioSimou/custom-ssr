import { fetchPageData, HEADER_X_PAGE_PREFETCH } from '@ssr/core'

export const prefetch = async (endpoint: string) => {
  return await fetchPageData(endpoint, {
    headers: {
      [HEADER_X_PAGE_PREFETCH]: 'true',
      Link: `${endpoint}; rel="prefetch"`,
    },
  })
}
