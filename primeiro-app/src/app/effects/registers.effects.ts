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
    private _store: Store,
    private _action: Actions,
    private _indexedb: IndexdbService
  ) {
  }
  @Effect()
  public init$: Observable<Actions> = this._action.pipe(
    ofType(actions.actionsTypes.INIT),
    mergeMap(() => this._indexedb.getById('collection_registers')),
    map(payload => {
      if (payload) {
        return actions.GET_REGISTERS({ payload: payload.registers })
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

  public saveRegisters(payload: any): Promise<any> {
    return new Promise(resolve => {
      this._indexedb.getById('collection_registers').subscribe(registers => {
        if (!registers) {
          const state = { id: 'collection_registers', registers: [] }
          setTimeout(() => this._indexedb.create({ ...state, registers: [...state.registers, { ...payload, status: 'done' }] }).subscribe(e => resolve(e)), 2000)
        } else {
          setTimeout(() => this._indexedb.update({ ...registers, registers: [...registers.registers, { ...payload, status: 'done' }] }).subscribe(e => resolve(e)), 2000)
        }
      })
    })
  }

}