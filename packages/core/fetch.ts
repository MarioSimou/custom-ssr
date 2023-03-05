import type { PageData, Data } from './types'
import {
  ApiResponse,
  newSuccessfulApiResponse,
  newErrorApiResponse,
} from './http'

export const fetchData = async <TData>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<TData>> => {
  const res = await fetch(url, options)
  if (res.status !== 200) {
    const error = await res.json()
    const message = String(error)
    return newErrorApiResponse(message)
  }
  const data: TData = await res.json()
  return newSuccessfulApiResponse(data)
}

export const fetchPageData = async <TData extends Data = Data>(
  url: string,
  options?: RequestInit
) => fetchData<PageData<TData>>(url, options)
