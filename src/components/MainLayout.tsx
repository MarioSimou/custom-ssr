import React from 'react'
import { Link } from 'react-router-dom'

type MainLayoutProps = {
  children: React.ReactNode
}
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
