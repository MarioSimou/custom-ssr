import { PageData } from '@ssr/core'

declare global {
  interface Window {
    __SSR__: PageData
  }
}
