import { MainLayout } from './MainLayout'
import { Link } from 'react-router-dom'

type PostsOrops = {
  posts: Post[]
}

export const Posts = ({ posts }: PostsOrops) => {
  return (
    <MainLayout>
      <article>
        <h1>Posts</h1>
        {posts.length > 0 && (
          <ul>
            {posts.map(post => {
              return (
                <li key={post.id}>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </li>
              )
            })}
          </ul>
        )}
      </article>
    </MainLayout>
  )
}
