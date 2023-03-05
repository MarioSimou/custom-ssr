import { fetchData } from '~/misc/fetchData'
import type { DataLoader } from 'express-ssr/server'

export type PageData = {
  post: Post
}

export const dataLoader: DataLoader<PageData, { id: string }> = async ({
  req,
}) => {
  const { id } = req.params
  const result = await fetchData<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  )
  if (result.success === false) {
    throw result
  }

  const { data: post } = result
  return { post }
}
