import { Injectable } from '@angular/core'
import { Actions, ofType, Effect } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { forkJoin, from, Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators'
import * as actions from '../actions/registers.actions'
import { IndexdbService } from '../services/indexedbs.service'
import { SET_ERRORS } from '../actions/errors.actions'
import { DashboardService } from '../services/dashboard.service'
import { Register } from '../models/models'

@Injectable()
export class RegistersEffect {
  constructor(
    private _store: Store,
    private _action: Actions,
    private _indexedb: IndexdbService,
    private _dashboardService: DashboardService
  ) {
  }
  @Effect()
  public init$: Observable<Actions> = this._action.pipe(
    ofType(actions.actionsTypes.INIT),
    mergeMap(() => this._dashboardService.fetchRegisters()),
    map((payload: Register[]) => {
      if (payload) {
        return actions.GET_REGISTERS({ payload })
      } else {
        return actions.GET_REGISTERS({ payload: [] })
      }
    }),
    catchError(err => of(err))
  )

  @Effect()
  public addRegisters$: Observable<Actions> = this._action.pipe(
    ofType(actions.actionsTypes.ADD_REGISTERS),
    map(({ payload }: any) => {
      this.saveRegisters(payload).then(() => this._store.dispatch(actions.INIT()))
      return actions.SET_REGISTERS({ payload })
    }),
    catchError(err => of(err))
  )

  @Effect()
  public deleteRegisters$: Observable<Actions> = this._action.pipe(
    ofType(actions.actionsTypes.DELETE_REGISTERS),
    mergeMap(({ payload }: any) => this._dashboardService.deleteRegister(payload).pipe(map((payload: Register) => {
      if (payload) return actions.GET_REGISTERS({ payload })
      else return actions.GET_REGISTERS({ payload: [] })
    }))),
    catchError(err => of(err))
  )

  public saveRegisters(payload: Register): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => this._dashboardService.newRegister(payload).subscribe(res => resolve(res)), 1000)
    })
  }

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
    mergeMap(({ payload }: any) => this._dashboardService.updateRegister(payload).pipe(map(() => actions.SET_UPDATE({ payload })))),
    catchError(err => of(err))
  )

}