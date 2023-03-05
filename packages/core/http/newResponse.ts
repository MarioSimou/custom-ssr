import type { ApiResponseError, ApiResponseSuccess } from './types'
import { toError } from './toError'

export const newErrorApiResponse = (message: unknown): ApiResponseError => ({
  success: false,
  message: toError(message).message,
})

export const newSuccessfulApiResponse = <TData>(
  data: TData
): ApiResponseSuccess<TData> => ({
  success: true,
  data,
})
