import { createAction, props } from '@ngrx/store'

export enum actionsTypes { SET_ERRORS = '[SET_ERRORS]' }

export const SET_ERRORS = createAction(actionsTypes.SET_ERRORS, props<{ payload: any }>())