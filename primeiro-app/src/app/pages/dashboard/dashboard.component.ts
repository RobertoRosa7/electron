import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import * as actionDashboard from '../../actions/dashboard.actions'
import * as actionRegisters from '../../actions/registers.actions'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public cards: any[] = [
    {
      title: 'Entrada',
      icon: 'monetization_on',
      value: 0,
      type: 'incoming'
    },
    {
      title: 'Saída',
      icon: 'money_off',
      value: 0,
      type: 'outcoming'
    },
    {
      title: 'Consolidado',
      icon: 'account_balance',
      value: 0,
      type: 'consolidado'
    }
  ]
  constructor(
    private _store: Store
  ) {
    this._store.dispatch(actionDashboard.INIT())
  }

  public ngOnInit(): void {
    this._store.select(({ dashboard }: any) => ({ ...dashboard }))
      .subscribe(dash => {
        console.log(dash)
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
  }

}
