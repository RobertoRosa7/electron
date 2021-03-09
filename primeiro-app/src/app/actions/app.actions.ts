import { createAction, props } from '@ngrx/store'

export enum actionsTypes { 
  ONLINE = '[ONLINE]'
}

export const ONLINE = createAction(actionsTypes.ONLINE)