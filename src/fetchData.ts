type FetchDataError = {
  success: false
  status: number
  message: string
}
type FetchDataSuccess<TData> = {
  success: true
  status: number
  data: TData
}

export const fetchData = async <TData>(
  url: string
): Promise<FetchDataError | FetchDataSuccess<TData>> => {
  const res = await fetch(url)
  if (res.status !== 200) {
    const error = await res.json()
    const message = String(error)
    return { success: false, status: res.status, message }
  }
  const data: TData = await res.json()
  return { success: true, status: res.status, data }
}
