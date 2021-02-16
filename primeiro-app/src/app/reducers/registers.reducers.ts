import { createReducer, on } from "@ngrx/store";
import * as actions from '../actions/registers.actions'
import { SET_ERRORS } from '../actions/errors.actions'

const initializeState = {
  all: [],
  tab: 'read'
}

const registersReducers = createReducer(
  initializeState,
  on(actions.SET_REGISTERS, (states, { payload }) => ({ ...states, all: states.all.concat(payload) })),
  on(actions.GET_REGISTERS, (states, { payload }) => ({ ...states, all: payload })),
  on(actions.GET_TAB, (states, { payload }) => ({ ...states, tab: payload })),
  on(SET_ERRORS, (states, { payload }) => ({ ...states, errors: payload }))
)

export function reducer(state: any, action: any) {
  return registersReducers(state, action)
}