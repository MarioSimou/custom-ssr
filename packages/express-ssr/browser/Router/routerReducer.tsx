import { FC } from 'react'
import { makeActionCreator } from './makeActionCreator'
import type { Route } from '../types'

const SET_ROUTE = 'SET_ROUTE'

export const setRouteActionCreator = makeActionCreator<
  typeof SET_ROUTE,
  Route<FC>
>(SET_ROUTE)

export type Action = ReturnType<typeof setRouteActionCreator>

type State = {
  currentRoute?: Route<FC>
}

export const routerReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_ROUTE': {
      return { ...state, currentRoute: action.payload }
    }
    default: {
      return state
    }
  }
}
