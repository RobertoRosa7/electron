import { createReducer, on } from "@ngrx/store";
import { SET_ERRORS } from '../actions/errors.actions'

const initializeState = {
  errors: []
}

const registersReducers = createReducer(
  initializeState,
  on(SET_ERRORS, (states, { payload }) => ({ ...states, errors: states.errors.concat(payload) }))
)

export function reducerErrors(state: any, action: any) {
  return registersReducers(state, action)
}