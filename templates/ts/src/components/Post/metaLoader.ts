import type { MetaLoader } from 'express-ssr/server'
import type { PageData } from './dataLoader'

export const metaLoader: MetaLoader<PageData> = data => [
  { type: 'title', content: data.post.title },
  {
    type: 'name',
    name: 'viewport',
    content: 'width=device-width,initial-scale=1',
  },
  { type: 'opengraph', property: 'og:title', content: data.post.title },
]
