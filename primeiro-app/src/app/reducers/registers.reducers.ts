import { createReducer, on } from "@ngrx/store";
import * as actions from '../actions/registers.actions'

const INITIAL_STATE = {
  all: [],
  tab: '',
  visible: {},
  consolidado: {},
  msg: '',
  total: 0
}

const registersReducers = createReducer(
  INITIAL_STATE,
  on(actions.SET_REGISTERS, (states, { payload }) => ({ ...states, all: states.all.concat(payload) })),
  on(actions.GET_REGISTERS, (states, { payload }) => ({
    ...states,
    all: payload.data.results,
    consolidado: payload.data.consolidado,
    msg: payload.msg,
    total: payload.data.total
  })),
  on(actions.GET_TAB, (states, { payload }) => ({ ...states, tab: payload })),
  on(actions.SET_SHOWTAB, (states, { payload }) => ({ ...states, visible: payload })),
  on(actions.SET_UPDATE, (states, { payload }) => {
    const stateUpdated: any = [...states.all]
    stateUpdated[stateUpdated.findIndex((r: any) => r._id.$oid === payload._id.$oid)] = payload
    return { ...states, all: stateUpdated }
  }),
)

export function reducer(state: any, action: any) {
  return registersReducers(state, action)
}