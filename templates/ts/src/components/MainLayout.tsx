import React from 'react'
import { Link } from 'express-ssr/browser'

type MainLayoutProps = {
  children: React.ReactNode
}
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <header>
        <nav>
          <Link href="/posts">Posts</Link>
          <Link href="/about">About</Link>
          <Link href="/contact-us">Contact us</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
