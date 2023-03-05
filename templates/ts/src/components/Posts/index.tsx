import { MainLayout } from '../MainLayout'
import type { PageData } from './dataLoader'
import { Link, useRouter } from 'express-ssr/browser'

export const Posts = ({ posts }: PageData) => {
  const { navigate } = useRouter()
  return (
    <MainLayout>
      <article>
        <h1>Posts</h1>

        <button onClick={() => navigate('/about')}>
          Take me to about page
        </button>
        {posts.length > 0 && (
          <ul>
            {posts.map(post => {
              return (
                <li key={post.id}>
                  <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </li>
              )
            })}
          </ul>
        )}
      </article>
    </MainLayout>
  )
}

export default Posts
