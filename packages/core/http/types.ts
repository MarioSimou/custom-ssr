export type ApiResponseSuccess<TData> = {
  success: true
  data: TData
}
export type ApiResponseError = {
  success: false
  message: string
}

export type ApiResponse<TData> = ApiResponseSuccess<TData> | ApiResponseError
