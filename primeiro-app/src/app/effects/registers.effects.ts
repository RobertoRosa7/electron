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
  // buscando indexedb
  // @Effect()
  // public init$: Observable<Actions> = this._action.pipe(
  //   ofType(actions.actionsTypes.INIT),
  //   mergeMap(() => this._indexedb.getById('collection_registers')),
  //   map(payload => {
  //     if (payload) {
  //       return actions.GET_REGISTERS({ payload: payload.registers })
  //     } else {
  //       return actions.GET_REGISTERS({ payload: [] })
  //     }
  //   }),
  //   catchError(err => of(err))
  // )

  // buscando do backend
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
    mergeMap(({ payload }: any) => this._indexedb.getById('collection_registers').pipe(map((registers) => this.removeItemFromIndexedb(registers, payload)))),
    mergeMap((payload: any) => {
      this._indexedb.update(payload)
      return [actions.INIT()]
    }),
    catchError(err => of(err))
  )

  public saveRegisters(payload: Register): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => this._dashboardService.newRegister(payload).subscribe(res => resolve(res)), 1000)
      // this._indexedb.getById('collection_registers').subscribe(registers => {
      //   if (!registers) {
      //     const state = { id: 'collection_registers', registers: [] }
      //     setTimeout(() => this._indexedb.create({ ...state, registers: [...state.registers, { ...payload, status: 'done' }] }).subscribe(e => resolve(e)), 2000)
      //   } else {
      //     setTimeout(() => this._indexedb.update({ ...registers, registers: [...registers.registers, { ...payload, status: 'done' }] }).subscribe(e => resolve(e)), 2000)
      //   }
      // })
    })
  }

  private removeItemFromIndexedb(registers: any, payload: any) {
    const newPayload = [...registers.registers]
    const index = newPayload.findIndex((i: any) => i.id === payload.id)
    if (index >= 0) newPayload.splice(index, 1)

    return { ...registers, registers: newPayload }
  }

}