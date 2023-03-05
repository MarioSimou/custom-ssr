import { hydrateRoot } from 'react-dom/client'
import { Router } from 'express-ssr/browser'
import { Posts } from './components/Posts'
import { Post } from './components/Post'
import { About } from './components/About'
import { ContactUs } from './components/ContactUs'

const container = document.getElementById('root') as HTMLElement

hydrateRoot(
  container,
  <Router
    // prefetch={{
    //   enabled: true,
    //   delay: 1000,
    // }}
    routes={{
      '/posts': {
        Component: Posts,
      },
      '/posts/[id]': {
        Component: Post,
      },
      '/about': {
        Component: About,
      },
      '/contact-us': {
        Component: ContactUs,
      },
    }}
  />
)
