type Maybe<TData> = TData | undefined
type Data = Record<string, unknown>

type Post = {
  id: number
  title: string
  body: string
  userId: number
}
