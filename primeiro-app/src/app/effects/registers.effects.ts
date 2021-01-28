import { Injectable } from '@angular/core'
import { Actions, ofType, Effect } from '@ngrx/effects'
import { Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import * as actions from '../actions/registers.actions'


@Injectable()
export class RegistersEffect {
  constructor(
    private _st: Store,
    private _act: Actions
  ) {
  }

  @Effect()
  public addRegisters$: Observable<Actions> = this._act.pipe(
    ofType(actions.actionsTypes.ADD_REGISTERS),
    map(({ payload }: any) => actions.SET_REGISTERS({ payload })),
    catchError(err => of(err))
  )
}