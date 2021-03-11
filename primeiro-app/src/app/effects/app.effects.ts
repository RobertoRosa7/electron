import { Injectable } from '@angular/core'
import { Actions, ofType, Effect } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { SET_ERRORS } from '../actions/errors.actions'
import { HttpErrorResponse } from '@angular/common/http'
import * as actionsApp from '../actions/app.actions'
import { AppService } from '../services/app.service'


@Injectable()
export class AppEffect {

  constructor(
    private _action: Actions,
    private _appService: AppService
  ) {
  }

  @Effect()
  public online$: Observable<Actions> = this._action.pipe(
    ofType(actionsApp.ONLINE),
    mergeMap(() => this._appService.isOnline().pipe(catchError(e => of(e)))),
    map((payload) => {
      console.log(payload)
      if (payload instanceof HttpErrorResponse) {
        const source = { ...payload, source: 'offline' }
        return SET_ERRORS({ payload: source })
      } else {
        return actionsApp.SET_ONLINE({ payload: true })
      }
    }),
    catchError(err => of(err))
  )
}