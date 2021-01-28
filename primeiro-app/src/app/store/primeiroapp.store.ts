
import { ActionReducerMap } from '@ngrx/store'
import { reducer } from '../reducers/registers.reducers'

export const PrimeiroAppStore: ActionReducerMap<any> = {
  registers: reducer,
}