import { createAction, props } from '@ngrx/store'

export enum actionsTypes {
  INIT = '[INIT]',
  ADD_REGISTERS = '[ADD_REGISTERS]',
  SET_REGISTERS = '[SET_REGISTERS]',
  GET_REGISTERS = '[GET_REGISTERS]',
  GET_TAB = '[GET_TAB]',
  GET_SHOWTAB = '[GET_SHOWTAB]',
  SET_SHOWTAB = '[SET_SHOWTAB]',
  DELETE_REGISTERS = '[DELETE_REGISTERS]'
}
export const INIT = createAction(actionsTypes.INIT)
export const ADD_REGISTERS = createAction(actionsTypes.ADD_REGISTERS, props<{ payload: any }>())

export const SET_REGISTERS = createAction(actionsTypes.SET_REGISTERS, props<{ payload: any }>())
export const SET_SHOWTAB = createAction(actionsTypes.SET_SHOWTAB, props<{ payload: any }>())

export const GET_REGISTERS = createAction(actionsTypes.GET_REGISTERS, props<{ payload: any }>())
export const GET_TAB = createAction(actionsTypes.GET_TAB, props<{ payload: any }>())
export const GET_SHOWTAB = createAction(actionsTypes.GET_SHOWTAB, props<{ payload: any }>())

export const DELETE_REGISTERS = createAction(actionsTypes.DELETE_REGISTERS, props<{ payload: any }>())