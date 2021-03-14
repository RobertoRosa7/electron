import { createAction, props } from '@ngrx/store'

export enum actionsTypes {
  CREATE_USER = '[CREATE_USER]',
  CREATED_USER = '[CREATED_USER]',


  GET_USER = '[GET_USER]',
  SET_USER = '[SET_USER]',

  SIGNIN = '[SIGNIN]',
  LOGGED_USER = '[LOGGED_USER]',

  SET_USER_LOGGED = '[SET_USER_LOGGED'
}

export const CREATE_USER = createAction(actionsTypes.CREATE_USER, props<{ payload: any }>())
export const CREATED_USER = createAction(actionsTypes.CREATED_USER, props<{ payload: any }>())

export const GET_USER = createAction(actionsTypes.GET_USER)
export const SET_USER = createAction(actionsTypes.SET_USER, props<{ payload: any }>())
export const SET_USER_LOGGED = createAction(actionsTypes.SET_USER_LOGGED, props<{ payload: any }>())
export const LOGGED_USER = createAction(actionsTypes.LOGGED_USER, props<{ payload: any }>())

export const SIGNIN = createAction(actionsTypes.SIGNIN, props<{ payload: any }>())