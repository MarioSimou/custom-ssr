import express from 'express'
import { Html } from '~/components/Html'
import type { HtmlData } from '~/components/Html'
import { Posts } from '~/components/Posts'
import { Post } from '~/components/Post'
import { renderToString } from 'react-dom/server'
import path from 'path'
import { cwd } from 'process'
import { StaticRouter } from 'react-router-dom/server'
import { fetchData } from '~/fetchData'

const app = express()
const port = process.env.PORT || 3000
const getPath = (...args: string[]) => path.resolve(cwd(), ...args)

app.use('/public', express.static(getPath('dist')))

app.get('/', async (req, res) => {
  const url = req.url

  const result = await fetchData<Post[]>(
    'https://jsonplaceholder.typicode.com/posts?_limit=10'
  )

  if (result.success === false) {
    return res.status(result.status).send(result.message)
  }

  const posts = result.data
  const data: HtmlData<{ posts: Post[] }> = { pageProps: { posts } }

  const html = renderToString(
    <StaticRouter location={url}>
      <Html title="Posts" data={data}>
        <Posts posts={posts} />
      </Html>
    </StaticRouter>
  )
  return res.send(html)
})

app.get('/posts/:id', async (req, res) => {
  const { id: postId } = req.params
  const url = req.url

  if (!postId) {
    return res.status(404).send('Post not found')
  }

  const result = await fetchData<Post>(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  )

  if (result.success === false) {
    return res.status(result.status).send(result.message)
  }

  const post = result.data
  const data: HtmlData<{ post: Post }> = { pageProps: { post } }

  const html = renderToString(
    <StaticRouter location={url}>
      <Html title="Post" data={data}>
        <Post post={post} />
      </Html>
    </StaticRouter>
  )
  return res.send(html)
})

app.listen(port, () => console.log(`The app listens on port :${port}`))
