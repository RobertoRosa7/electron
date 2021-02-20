import { createReducer, on } from "@ngrx/store";
import * as actions from '../actions/errors.actions'

const INITIAL_STATES = {
  errors: [],
  status_code: []
}

const errorsReducers = createReducer(
  INITIAL_STATES,
  on(actions.SET_ERRORS, (states, { payload }) => ({ ...states, errors: states.errors.concat(payload) })),
  on(actions.SET_STATUS_CODE, (states, { payload }) => ({ ...states, status_code: payload }))
)

export function reducerErrors(state: any, action: any) {
  return errorsReducers(state, action)
}