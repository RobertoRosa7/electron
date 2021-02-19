import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as actionDashboard from '../../../actions/dashboard.actions'
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public cards: any[] = [
    {
      title: 'Consolidado',
      icon: 'account_balance',
      value: 0,
      type: 'consolidado'
    },
    {
      title: 'Credito',
      icon: 'account_balance',
      value: 0,
      type: 'incoming'
    },
    {
      title: 'Debito',
      icon: 'account_balance',
      value: 0,
      type: 'outcoming'
    }
  ]

  constructor(
    private _store: Store,
    private _snackbar: MatSnackBar
  ) {
    this._store.dispatch(actionDashboard.INIT())
  }

  public ngOnInit(): void {
    this._store.select(({ dashboard }: any) => ({ ...dashboard }))
      .subscribe(dash => {
        this.cards.forEach(value => {
          switch (value.type) {
            case 'incoming':
              value.value = dash.total_credit
              break
            case 'outcoming':
              value.value = dash.total_debit
              break
            case 'consolidado':
              value.value = dash.total_consolidado
              break
          }
        })
      })

    this._store.select(({ http_error }: any) =>
      http_error.errors.filter((e: any) => e.source === 'calc_consolidado')).subscribe(err => {
        if (err.length > 0) {
          const pay = err[0]
          console.log(pay)
          this._snackbar.open('Erro ao calcular consolidado', 'ok', { duration: 3000 })
        }
      })
  }

}
