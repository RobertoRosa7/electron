import { createAction, props } from '@ngrx/store'

export enum actionsTypes {
  INIT_DASHBOARD = '[INIT_DASHBOARD]',
  GET_TOTALS = '[GET_TOTALS]',
  DARK_MODE = '[DARK_MODE]',
  FETCH_EVOLUCAO = '[FETCH_EVOLUCAO]',
  FETCH_EVOLUCAO_DETAIL = '[FETCH_EVOLUCAO_DETAIL]',
  SET_EVOLUCAO = '[SET_EVOLUCAO]',
  SET_EVOLUCAO_DETAIL = '[SET_EVOLUCAO_DETAIL]',
}

export const INIT_DASHBOARD = createAction(actionsTypes.INIT_DASHBOARD)
export const FETCH_EVOLUCAO = createAction(actionsTypes.FETCH_EVOLUCAO)
export const FETCH_EVOLUCAO_DETAIL = createAction(actionsTypes.FETCH_EVOLUCAO_DETAIL, props<{ payload: any }>())
export const GET_TOTALS = createAction(actionsTypes.GET_TOTALS, props<{ payload: any }>())
export const DARK_MODE = createAction(actionsTypes.DARK_MODE, props<{ payload: any }>())
export const SET_EVOLUCAO = createAction(actionsTypes.SET_EVOLUCAO, props<{ payload: any }>())
export const SET_EVOLUCAO_DETAIL = createAction(actionsTypes.SET_EVOLUCAO_DETAIL, props<{ payload: any }>())
