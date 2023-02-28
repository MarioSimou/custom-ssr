import { Posts } from './components/Posts'
import { Post } from './components/Post'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

if (window?.__SERVER_DATA__?.pageProps) {
  const { pageProps } = window?.__SERVER_DATA__

  hydrateRoot(
    container,
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts {...pageProps} />} />
        <Route path="/posts/:id" element={<Post {...pageProps} />} />
      </Routes>
    </BrowserRouter>
  )
}
