import { fetchData } from '~/misc/fetchData'
import type { DataLoader } from 'express-ssr/server'

export type PageData = { posts: Post[] }

export const dataLoader: DataLoader<PageData> = async () => {
  const result = await fetchData<Post[]>(
    'https://jsonplaceholder.typicode.com/posts?_limit=10'
  )
  if (result.success === false) {
    throw result
  }
  const { data: posts } = result

  return { posts }
}
