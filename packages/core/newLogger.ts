export type LoggerOptions = {
  debug?: boolean
}

export type Logger = ReturnType<typeof newLogger>

export const newLogger = ({ debug }: LoggerOptions) => {
  const toMessage = (e: unknown) => {
    if (typeof e === 'string') {
      return e
    }
    if (e instanceof Error) {
      return e.message
    }
    if (e instanceof Object) {
      return JSON.stringify(e)
    }
    return String(e)
  }
  const format = (e: unknown) =>
    `[${new Date().toLocaleString()}]: ${toMessage(e)}`

  const info = (e: unknown) => debug && console.info(format(e))
  const warn = (e: unknown) => console.warn(format(e))
  const error = (e: unknown) => console.error(format(e))

  return {
    info,
    warn,
    error,
  }
}
