import { MainLayout } from '../MainLayout'
import type { PageData } from './dataLoader'

export const Post = ({ post }: PageData) => {
  return (
    <MainLayout>
      <article>
        <h1>{post.title}</h1>
      </article>
    </MainLayout>
  )
}

export default Post
