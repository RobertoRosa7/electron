import { Injectable } from '@angular/core'
import { Actions, ofType, Effect } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { forkJoin, from, Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators'
import * as actions from '../actions/dashboard.actions'
import { IndexdbService } from '../services/indexedbs.service'
import { SET_ERRORS } from '../actions/errors.actions'
import { Consolidado, Register } from '../models/models'
import { DashboardService } from '../services/dashboard.service'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class DashboardEffect {
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
}