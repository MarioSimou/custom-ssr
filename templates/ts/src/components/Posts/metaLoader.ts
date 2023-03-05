import { MetaLoader } from 'express-ssr/server'

export const metaLoader: MetaLoader = () => [
  { type: 'title', content: 'Posts' },
]
