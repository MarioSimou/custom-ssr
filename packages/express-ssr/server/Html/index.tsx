import type { Metadata as Meta } from '@ssr/core'
import { Metadata } from '../Metadata'

type HtmlProps = {
  children: React.ReactNode
  clientEntrypoint: string
  data?: unknown
  metadata?: Meta
  routePattern: string
}

export const Html = ({
  children,
  clientEntrypoint,
  data = {},
  routePattern,
  metadata,
}: HtmlProps) => {
  return (
    <html lang="en">
      <head>
        <Metadata metadata={metadata} />
      </head>
      <body>
        <div id="root">{children}</div>
        <script
          type="application/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.__SSR__=${JSON.stringify({
              routePattern,
              metadata: [],
              data,
            })}`,
          }}
        />
        <script type="application/javascript" src={clientEntrypoint} />
      </body>
    </html>
  )
}
