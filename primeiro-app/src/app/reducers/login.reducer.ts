import { createReducer, on } from "@ngrx/store"
import * as actions from '../actions/login.actions'

const INITIAL_STATES = {
  user: {}
}

const appReducer = createReducer(
  INITIAL_STATES,
  on(actions.SET_USER, (states, { payload }) => ({ ...states, user: payload })),
)

export function reducerLogin(state: any, action: any) {
  return appReducer(state, action)
}