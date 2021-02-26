import { createAction, props } from '@ngrx/store'

export enum actionsTypes {
  INIT = '[INIT]',
  GET_TOTALS = '[GET_TOTALS]',
  DARK_MODE = '[DARK_MODE]'
}

export const INIT = createAction(actionsTypes.INIT)
export const GET_TOTALS = createAction(actionsTypes.GET_TOTALS, props<{ payload: any }>())
export const DARK_MODE = createAction(actionsTypes.DARK_MODE, props<{ payload: any }>())
