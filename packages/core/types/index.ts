export type Maybe<TData> = TData | undefined
export type Data = Record<string, unknown>

type TitleMetatag = { type: 'title'; content: string }
type CharsetMetatag = { type: 'charSet'; content: 'utf-8' }
type HttpEquivMetatag = {
  type: 'httpEquiv'
  httpEquiv: string
  content: string
}
type NameMetatag = { type: 'name'; name: string; content: string }
type OpengraphMetatag = {
  type: 'opengraph'
  property: `og:${string}`
  content: string
}

type Metatag =
  | TitleMetatag
  | CharsetMetatag
  | HttpEquivMetatag
  | NameMetatag
  | OpengraphMetatag

export type Metadata = Metatag[]

export type PageData<TData extends Data = Data> = {
  data?: TData
  metadata: Metadata
  routePattern: string
}
