import { createAction, props } from '@ngrx/store'

export enum actionsTypes {
  ADD_REGISTERS = '[ADD_REGISTERS]',
  SET_REGISTERS = '[SET_REGISTERS]',
  GET_REGISTERS = '[GET_REGISTERS]'
}

export const ADD_REGISTERS = createAction(actionsTypes.ADD_REGISTERS, props<{ payload: any }>())
export const SET_REGISTERS = createAction(actionsTypes.SET_REGISTERS, props<{ payload: any }>())
export const GET_REGISTERS = createAction(actionsTypes.GET_REGISTERS)