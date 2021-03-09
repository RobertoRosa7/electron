import { createReducer, on } from "@ngrx/store";

const INITIAL_STATES = {
  online: false
}

const appReducer = createReducer(
  INITIAL_STATES,
)

export function reducerApp(state: any, action: any) {
  return appReducer(state, action)
}