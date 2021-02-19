import { createReducer, on } from "@ngrx/store";
import * as actions from '../actions/registers.actions'
import { SET_ERRORS } from '../actions/errors.actions'
import { Register } from "../models/models";

const INITIAL_STATE = {
  all: [],
  tab: '',
  visible: {}
}

const registersReducers = createReducer(
  INITIAL_STATE,
  on(actions.SET_REGISTERS, (states, { payload }) => ({ ...states, all: states.all.concat(payload) })),
  on(actions.GET_REGISTERS, (states, { payload }) => ({ ...states, all: payload })),
  on(actions.GET_TAB, (states, { payload }) => ({ ...states, tab: payload })),
  on(actions.SET_SHOWTAB, (states, { payload }) => ({ ...states, visible: payload })),
  on(actions.SET_UPDATE, (states, { payload }) => {
    const teste = states.all.map((re: Register) => {
      if (re._id.$oid === payload._id.$oid) {
        Object.assign({ ...re }, payload)
      }
      return re
    })
    console.log(teste)
    return states
  }),
  on(SET_ERRORS, (states, { payload }) => ({ ...states, errors: payload }))
)

export function reducer(state: any, action: any) {
  return registersReducers(state, action)
}