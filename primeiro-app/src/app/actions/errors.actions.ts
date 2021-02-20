import { createAction, props } from '@ngrx/store'
import { StatusCode } from '../models/models'

export enum actionsTypes { 
  SET_ERRORS = '[SET_ERRORS]',
  SET_STATUS_CODE = '[SET_STATUS_CODE]',
  GET_STATUS_CODE = '[GET_STATUS_CODE]',
}

export const SET_ERRORS = createAction(actionsTypes.SET_ERRORS, props<{ payload: any }>())
export const GET_STATUS_CODE = createAction(actionsTypes.GET_STATUS_CODE)
export const SET_STATUS_CODE = createAction(actionsTypes.SET_STATUS_CODE, props<{ payload: any }>())