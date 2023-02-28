export type HtmlData<TData> = {
  pageProps: TData
}

type HtmlProps<TData> = {
  children: React.ReactNode
  title: string
  data: HtmlData<TData>
}

export const Html = <TData,>({ children, title, data }: HtmlProps<TData>) => {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
      </head>
      <body>
        <div id="root">{children}</div>
        <script type="application/javascript" src="/public/client.js" />
        <script
          type="application/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.__SERVER_DATA__=${JSON.stringify(data)}`,
          }}
        />
      </body>
    </html>
  )
}
