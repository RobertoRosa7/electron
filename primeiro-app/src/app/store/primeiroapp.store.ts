
import { ActionReducerMap } from '@ngrx/store'
import { reducer } from '../reducers/registers.reducers'
import { reducerDashboard } from '../reducers/dashboard.reducers'


export const PrimeiroAppStore: ActionReducerMap<any> = {
  registers: reducer,
  dashboard: reducerDashboard
}