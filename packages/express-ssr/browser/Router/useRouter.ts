import React from 'react'
import { calcIsServer } from '../../calcIsServer'
import { initialRouterContext, RouterContext } from './RouterContext'

const ErrComponentNotWrapped = new Error(
  `Please wrap your component within 'RouterProvider'`
)

export const useRouter = () => {
  if (calcIsServer()) {
    return initialRouterContext
  }

  const ctx = React.useContext(RouterContext)
  if (!ctx) {
    throw ErrComponentNotWrapped
  }
  return ctx
}
