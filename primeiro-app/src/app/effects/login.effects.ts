import { Injectable } from '@angular/core'
import { Actions, ofType, Effect } from '@ngrx/effects'
import { forkJoin, Observable, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { SET_ERRORS, SET_SUCCESS } from '../actions/errors.actions'
import { HttpErrorResponse } from '@angular/common/http'
import * as actionsApp from '../actions/login.actions'
import { LoginService } from '../services/login.service'
import { Store } from '@ngrx/store'


@Injectable()
export class LoginEffect {

  constructor(
    private _action: Actions,
    private _loginService: LoginService,
    private _store: Store
  ) {
  }

  @Effect()
  public createUser$: Observable<Actions> = this._action.pipe(
    ofType(actionsApp.CREATE_USER),
    mergeMap(({ payload }) => this._loginService.signup(payload).pipe(catchError(e => of(e)))),
    map((payload) => {
      if (payload instanceof HttpErrorResponse) {
        const source = { ...payload, source: 'create_user' }
        return SET_ERRORS({ payload: source })
      } else {
        return actionsApp.SET_USER({ payload: true })
      }
    }),
    catchError(err => of(err))
  )

  @Effect()
  public signin$: Observable<Actions> = this._action.pipe(
    ofType(actionsApp.SIGNIN),
    mergeMap(({ payload }) => forkJoin([
      this._loginService.signin(payload).pipe(catchError(e => of(e))),
      of(payload)
    ])),
    map(([response, payload]) => {
      if (response instanceof HttpErrorResponse) {
        const source = { ...response, source: 'signin' }
        return SET_ERRORS({ payload: source })
      } else {
        this._store.dispatch(SET_SUCCESS({ payload: 'login' }))
        return actionsApp.SET_USER_LOGGED({ payload: { ...response, keep_connect: payload.keep_connect } })
      }
    }),
    catchError(err => of(err))
  )
}