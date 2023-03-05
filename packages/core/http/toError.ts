export const toError = (e: unknown) => {
  if (e instanceof Error) {
    return e
  }
  if (typeof e === 'string') {
    return new Error(e)
  }
  return new Error(String(e))
}
