import type { DataLoader } from 'express-ssr/server'

export type PageData = { description: string }

export const dataLoader: DataLoader<PageData> = async () => {
  return {
    description: 'lorem ipsum',
  }
}
