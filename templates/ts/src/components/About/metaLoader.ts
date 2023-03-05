import type { MetaLoader } from 'express-ssr/server'

export const metaLoader: MetaLoader = () => [
  { type: 'title', content: 'About' },
]
