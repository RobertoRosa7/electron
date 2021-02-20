import { Injectable } from '@angular/core'
import { Actions, ofType, Effect } from '@ngrx/effects'
import { Observable, of, forkJoin } from 'rxjs'
import { catchError, delay, map, mergeMap } from 'rxjs/operators'
import * as actions from '../actions/registers.actions'
import { SET_ERRORS } from '../actions/errors.actions'
import { DashboardService } from '../services/dashboard.service'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class RegistersEffect {
  constructor(
    private _action: Actions,
    private _dashboardService: DashboardService
  ) {
  }
  @Effect()
  public init$: Observable<Actions> = this._action.pipe(
    ofType(actions.actionsTypes.INIT),
    mergeMap(() => this._dashboardService.fetchRegisters().pipe(catchError(e => of(e)))),
    map((payload) => {
      if (!payload) return actions.GET_REGISTERS({ payload: [] })

      if (payload instanceof HttpErrorResponse) {
        const source = { ...payload, source: 'fetch_registers' }
        return SET_ERRORS({ payload: source })
      } else {
        return actions.GET_REGISTERS({ payload })
      }
    }),
    catchError(err => of(err))
  )

  @Effect()
  public addedRegister$: Observable<Actions> = this._action.pipe(
    ofType(actions.ADDED_REGISTERS),
    mergeMap(({ payload }) => this._dashboardService.newRegister(payload).pipe(
      delay(1000),
      catchError(e => of(e))
    )),
    map(response => {
      if (response instanceof HttpErrorResponse) {
        const source = { ...response, source: 'new_register' }
        return SET_ERRORS({ payload: source })
      } else {
        return actions.INIT()
      }
    }),
    catchError(e => of(e))
  )

  @Effect()
  public addRegisters$: Observable<Actions> = this._action.pipe(
    ofType(actions.actionsTypes.ADD_REGISTERS),
    mergeMap(({ payload }) => [
      actions.ADDED_REGISTERS({ payload }),
      actions.SET_REGISTERS({ payload }),
    ]),
    catchError(err => of(err))
  )

  @Effect()
  public deleteRegisters$: Observable<Actions> = this._action.pipe(
    ofType(actions.actionsTypes.DELETE_REGISTERS),
    mergeMap(({ payload }: any) => this._dashboardService.deleteRegister(payload).pipe(catchError(e => of(e)))),
    map(payload => {
      if (!payload) return actions.GET_REGISTERS({ payload: [] })
      if (payload instanceof HttpErrorResponse) {
        const source = { ...payload, source: 'delete_register' }
        return SET_ERRORS({ payload: source })
      } else {
        console.log('delete register: ', payload)
        return actions.GET_REGISTERS({ payload })
      }
    }),
    catchError(err => of(err))
  )

  @Effect()
  public showTab$: Observable<Actions> = this._action.pipe(
    ofType(actions.actionsTypes.GET_SHOWTAB),
    map(({ payload }: any) => {
      const showtabs: any = {}
      payload.forEach((e: any) => showtabs[e] = true)
      return actions.SET_SHOWTAB({ payload: showtabs })
    }),
    catchError(err => of(err))
  )

  @Effect()
  public updateRegister$: Observable<Actions> = this._action.pipe(
    ofType(actions.actionsTypes.UPDATE_REGISTER),
    mergeMap(({ payload }: any) => forkJoin([
      this._dashboardService.updateRegister(payload).pipe(catchError(e => of(e))),
      of(payload)
    ])),
    map(([response, payload]) => {
      if (response instanceof HttpErrorResponse) {
        const source = { ...response, source: 'update_register' }
        return SET_ERRORS({ payload: source })
      } else {
        return actions.SET_UPDATE({ payload })
      }
    }),
    catchError(err => of(err))
  )

}