import { createReducer, on } from "@ngrx/store";
import * as actions from '../actions/dashboard.actions'

const INITIAL_STATES = {
  consolidado: {
    total_credit: 0,
    total_debit: 0,
    total_consolidado: 0
  },
  error: true
}

const dashboardReducers = createReducer(
  INITIAL_STATES,
  on(actions.GET_TOTALS, (states, { payload }) => ({ ...states, consolidado: payload, error: false })),
)

export function reducerDashboard(state: any, action: any) {
  return dashboardReducers(state, action)
}