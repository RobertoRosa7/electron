import { createReducer, on } from "@ngrx/store";
import * as actions from '../actions/dashboard.actions'

const initializeState = {
  consolidado: {
    total_credit: 0,
    total_debit: 0,
    total_consolidado: 0
  }
}

const registersReducers = createReducer(
  initializeState,
  on(actions.GET_TOTALS, (states, { payload }) => ({ ...states, consolidado: payload })),
)

export function reducerDashboard(state: any, action: any) {
  return registersReducers(state, action)
}