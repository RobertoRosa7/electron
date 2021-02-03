import { createReducer, on } from "@ngrx/store";
import * as actions from '../actions/dashboard.actions'
import { SET_ERRORS } from '../actions/errors.actions'

const initializeState = {
  total_credit: 0,
  total_debit: 0,
  total_consolidado: 0
}

const registersReducers = createReducer(
  initializeState,
  on(actions.GET_TOTALS, (states, { payload }) => ({
    ...states,
    total_credit: payload.total_credit,
    total_debit: payload.total_debit,
    total_consolidado: payload.total_consolidado
  })),
  on(SET_ERRORS, (states, { payload }) => ({ ...states, errors: payload }))
)

export function reducerDashboard(state: any, action: any) {
  return registersReducers(state, action)
}