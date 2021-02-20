import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends DashboardComponent implements OnInit {
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
    protected _store: Store,
    protected _snackbar: MatSnackBar
  ) {
    super()
  }

  public ngOnInit(): void {
    this._store.select(({ registers }: any) => registers.consolidado)
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
  }

}
