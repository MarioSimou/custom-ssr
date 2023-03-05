import type { Data, Metadata } from '@ssr/core'
import type { Request, Response } from 'express'
export type { PageData, Metadata } from '@ssr/core'

export type DataLoaderContext<TParams> = {
  req: Request<TParams>
  res: Response
}

export type DataLoader<TData extends Data = Data, TParams = unknown> = (
  ctx: DataLoaderContext<TParams>
) => Promise<TData>

export type MetaLoader<TData = unknown> = (data: TData) => Metadata
