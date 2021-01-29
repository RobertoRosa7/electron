import { Injectable } from '@angular/core'
import { Actions, ofType, Effect } from '@ngrx/effects'
import { Store } from '@ngrx/store';
import { forkJoin, from, Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import * as actions from '../actions/dashboard.actions'
import { IndexdbService } from '../services/indexedbs.service';


@Injectable()
export class DashboardEffect {
  constructor(
    private _store: Store,
    private _action: Actions,
    private _indexedb: IndexdbService
  ) {
  }

  @Effect()
  public init$: Observable<Actions> = this._action.pipe(
    ofType(actions.actionsTypes.INIT),
    mergeMap(() => forkJoin([this._indexedb.getById('collection_dashboard'), from(this.buildTotals())])),
    mergeMap(([collection, totals]) => {
      this.saveTotals(collection)
      return [actions.GET_TOTALS({ payload: totals })]
    }),
    catchError(err => of(err))
  )

  private saveTotals(collection: any): Promise<any> {
    return new Promise(async resolve => {
      if (collection) {
        this._indexedb.update({ id: 'collection_dashboard', totals: await this.buildTotals() }).subscribe(() => resolve(true))
      } else {
        this._indexedb.create({ id: 'collection_dashboard', totals: await this.buildTotals() }).subscribe(() => resolve(true))
      }
    })
  }

  private buildTotals(): Promise<any> {
    const payloads: any = {
      total_credit: 0,
      total_debit: 0,
      total_consolidado: 0
    }
    return new Promise(resolve => {
      this._indexedb.getById('collection_registers').subscribe(collection => {
        if (collection) {
          collection.registers.forEach((value: any) => {
            switch (value.type) {
              case 'incoming':
                payloads.total_credit += value.value
                break
              case 'outcoming':
                payloads.total_debit += value.value
                break
            }
          })
          payloads.total_consolidado += (payloads.total_credit - payloads.total_debit)
          resolve(payloads)
        } else {
          resolve(payloads)
        }
      })
    })
  }
}