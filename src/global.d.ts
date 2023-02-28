interface Window {
  __SERVER_DATA__: Maybe<any>
}

type Maybe<TData> = TData | undefined
type Post = {
  id: number
  title: string
  body: string
  userId: number
}
