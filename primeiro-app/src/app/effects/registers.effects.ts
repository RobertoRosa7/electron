import { Injectable } from '@angular/core'
import { Actions, ofType, Effect } from '@ngrx/effects'
import { Store } from '@ngrx/store';
import { forkJoin, from, Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import * as actions from '../actions/registers.actions'
import { IndexdbService } from '../services/indexedbs.service';


@Injectable()
export class RegistersEffect {
  constructor(
    private _st: Store,
    private _act: Actions,
    private _idb: IndexdbService
  ) {
  }
  @Effect()
  public init$: Observable<Actions> = this._act.pipe(
    ofType(actions.actionsTypes.INIT),
    mergeMap(() => this._idb.getAll()),
    map(payload => actions.GET_REGISTERS({ payload })),
    catchError(err => of(err))
  )

  @Effect()
  public addRegisters$: Observable<Actions> = this._act.pipe(
    ofType(actions.actionsTypes.ADD_REGISTERS),
    map(({ payload }: any) => {
      this.saveRegisters(payload).then(() => this._st.dispatch(actions.INIT()))
      return actions.SET_REGISTERS({ payload })
    }),
    catchError(err => of(err))
  )

  public saveRegisters(payload: any): Promise<any> {
    return new Promise(resolve => setTimeout(() => this._idb.create({ ...payload, status: 'done' }).subscribe(e => resolve(e)), 2000))
  }

}