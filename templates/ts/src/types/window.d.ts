import type { PageData } from 'express-ssr'

declare global {
  interface Window {
    __SSR__: PageData
    isHydrated: boolean
  }
}
