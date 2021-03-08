import { Injectable } from '@angular/core'
import { Actions, ofType, Effect } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import * as actions from '../actions/dashboard.actions'
import { IndexdbService } from '../services/indexedbs.service'
import { SET_ERRORS, GET_STATUS_CODE, SET_STATUS_CODE } from '../actions/errors.actions'
import { DashboardService } from '../services/dashboard.service'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class DashboardEffect {
  constructor(
    private _action: Actions,
    private _indexedb: IndexdbService,
    private _dashboardService: DashboardService
  ) {
  }

  @Effect()
  public init$: Observable<Actions> = this._action.pipe(
    ofType(actions.actionsTypes.INIT_DASHBOARD),
    mergeMap(() => this._dashboardService.fetchConsolidado().pipe(catchError(e => of(e)))),
    map((payload) => {
      if (payload instanceof HttpErrorResponse) {
        const source = { ...payload, source: 'calc_consolidado' }
        return SET_ERRORS({ payload: source })
      } else {
        return actions.GET_TOTALS({ payload })
      }
    }),
    catchError(err => of(err))
  )

  @Effect()
  public getStatusCodes$: Observable<Actions> = this._action.pipe(
    ofType(GET_STATUS_CODE),
    mergeMap(() => this._indexedb.getById('status_code_id')),
    mergeMap((status_code) => {
      if (status_code) {
        return [SET_STATUS_CODE({ payload: status_code.status_code })]
      } else {
        return this._dashboardService.getStatusCode().pipe(
          map((status_code: any) => {
            if (status_code) this._indexedb.create({ id: 'status_code_id', status_code })
            return SET_STATUS_CODE({ payload: status_code })
          }),
          catchError(e => {
            const source = { ...e, source: 'status_code' }
            return [SET_ERRORS({ payload: source })]
          })
        )
      }
    }),
    catchError(err => of(err))
  )

  @Effect()
  public fetchEvolucao$: Observable<Actions> = this._action.pipe(
    ofType(actions.FETCH_EVOLUCAO),
    mergeMap(() => this._dashboardService.fetchEvocucao().pipe(catchError(e => of(e)))),
    map((payload: any) => {
      if (payload instanceof HttpErrorResponse) {
        const source = { ...payload, source: 'fetch_evolucao' }
        return SET_ERRORS({ payload: source })
      } else {
        return actions.SET_EVOLUCAO({ payload })
      }
    }),
    catchError(e => of(e))
  )

  @Effect()
  public fetchEvolucaoDespesas$: Observable<Actions> = this._action.pipe(
    ofType(actions.FETCH_EVOLUCAO_DESPESAS),
    mergeMap(() => this._dashboardService.fetchEvocucaoDespesas().pipe(catchError(e => of(e)))),
    map((payload: any) => {
      if (payload instanceof HttpErrorResponse) {
        const source = { ...payload, source: 'fetch_evolucao_despesas' }
        return SET_ERRORS({ payload: source })
      } else {
        return actions.SET_EVOLUCAO_DESPESAS({ payload })
      }
    }),
    catchError(e => of(e))
  )

  @Effect()
  public fetchEvolucaoDetail$: Observable<Actions> = this._action.pipe(
    ofType(actions.FETCH_EVOLUCAO_DETAIL),
    mergeMap(({ payload }) => this._dashboardService.fetchEvocucaoDetail(payload).pipe(catchError(e => of(e)))),
    map((payload: any) => {
      if (payload instanceof HttpErrorResponse) {
        const source = { ...payload, source: 'fetch_evolucao_detail' }
        return SET_ERRORS({ payload: source })
      } else {
        return actions.SET_EVOLUCAO_DETAIL({ payload })
      }
    }),
    catchError(e => of(e))
  )

  @Effect()
  public devMode$: Observable<Actions> = this._action.pipe(
    ofType(actions.GET_DEV_MODE),
    mergeMap(({ payload }) => this._dashboardService.setDevMode(payload).pipe(catchError(e => of(e)))),
    map((payload: any) => {
      if (payload instanceof HttpErrorResponse) {
        const source = { ...payload, source: 'dev_mode' }
        return SET_ERRORS({ payload: source })
      } else {
        return actions.SET_DEV_MODE({ payload })
      }
    }),
    catchError(e => of(e))
  )
}
