import { createReducer, on } from "@ngrx/store";
import * as actions from '../actions/registers.actions'

const initializeState = {
  all: []
}

const registersReducers = createReducer(
  initializeState,
  on(actions.SET_REGISTERS, (states, { payload }) => ({ ...states, all: states.all.concat(payload) })),
  on(actions.GET_REGISTERS, (states, { payload }) => ({ ...states, all: payload })),
)

export function reducer(state: any, action: any) {
  return registersReducers(state, action)
}