import { MainLayout } from './MainLayout'

type PostProps = {
  post: Post
}
export const Post = ({ post }: PostProps) => {
  return (
    <MainLayout>
      <article>
        <h1>{post.title}</h1>
      </article>
    </MainLayout>
  )
}
