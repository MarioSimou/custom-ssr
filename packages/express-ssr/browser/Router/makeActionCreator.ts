type Action<TType extends string, TPayload> = {
  type: TType
  payload: TPayload
}
type OnlyTypeAction<TType extends string> = {
  type: TType
}

type ActionCreator = {
  <TType extends string, TPayload>(type: TType): (
    payload: TPayload
  ) => Action<TType, TPayload>
  <TType extends string>(type: TType): () => OnlyTypeAction<TType>
}
// @ts-ignore
export const makeActionCreator: ActionCreator = (type: string) => {
  return function (payload?: unknown) {
    if (payload) {
      return { type, payload }
    }
    return { type }
  }
}
