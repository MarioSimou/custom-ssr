import React from 'react'
import { useRouter } from '../index'
import debounce from 'lodash.debounce'
import { prefetch as plainPrefetch } from './prefetch'

export type LinkProps = {
  children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const Link = ({ children, href, onClick, ...rest }: LinkProps) => {
  const { navigate, prefetch: prefetchOptions, logger } = useRouter()
  const prefetch = debounce(
    plainPrefetch,
    prefetchOptions.enabled ? prefetchOptions.delay : 250
  )

  const onClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate(href)

    if (onClick) {
      onClick(e)
    }
  }

  const onMouseOver = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { href } = e.currentTarget

    if (prefetchOptions.enabled === false) {
      return
    }

    const prefetchResult = await prefetch(href)
    if (prefetchResult && prefetchResult.success === false) {
      logger.warn(prefetchResult.message)
    }
  }

  return (
    <a href={href} {...rest} onMouseOver={onMouseOver} onClick={onClickLink}>
      {children}
    </a>
  )
}
