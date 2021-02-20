import { createReducer, on } from "@ngrx/store";
import * as actions from '../actions/errors.actions'

const initializeState = {
  errors: [],
  status_codes: []
}

const registersReducers = createReducer(
  initializeState,
  on(actions.SET_ERRORS, (states, { payload }) => ({ ...states, errors: states.errors.concat(payload) })),
  on(actions.SET_STATUS_CODE, (states, { payload }) => ({ ...states, status_code: payload }))
)

export function reducerErrors(state: any, action: any) {
  return registersReducers(state, action)
}