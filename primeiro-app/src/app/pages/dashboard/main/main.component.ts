import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Store } from '@ngrx/store'
import { Register } from 'src/app/models/models'
import { DashboardComponent } from '../dashboard.component'
import * as actionsDashboard from '../../../actions/dashboard.actions'
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
  public ELEMENT_DATA: Register[] = []
  public EVOLUCAO_DATA: any = {}

  constructor(
    protected _store: Store,
    protected _snackbar: MatSnackBar
  ) {
    super()
  }

  public ngOnInit(): void {
    const teste = [
      { "dia": 1, "desc": "Nigth", "mes": 1 },
      { "dia": 1, "Descricao": "Brilha", "mes": 1 },
      { "dia": 2, "desc": "Urna", "mes": 2 },
      { "dia": 3, "Descricao": "Covas", "mes": 1 },
      { "dia": 2, "desc": "Mario Corvas", "mes": 1 },
      { "dia": 4, "Desc": "Estrelas", "mes": 2 },
      { "dia": 4, "Desc": "Estrelas", "mes": 2 },
      { "dia": 4, "Desc": "Estrelas", "mes": 2 },
      { "dia": 4, "Desc": "Estrelas", "mes": 2 },
    ]

    const t = teste.reduce(function (prev: any, current: any) {
      var index = prev.findIndex((j: any) => j.dia == current.dia && j.mes == current.mes)
      if (index < 0) {
        index = prev.length
        prev.push({
          dia: current.dia,
          mes: current.mes,
          lista: []
        })
      }
      prev[index].lista.push(current)
      return prev
    }, []).map((item: any) => item)

    this._store.select(({ registers, dashboard }: any) => ({
      all: [...registers.all], consolidado: dashboard.consolidado
    }))
      .subscribe(state => {
        this.ELEMENT_DATA = state.all.splice(0, 5)
        this.cards.forEach(value => {
          switch (value.type) {
            case 'incoming':
              value.value = state.consolidado.total_credit || 0
              break
            case 'outcoming':
              value.value = state.consolidado.total_debit || 0
              break
            case 'consolidado':
              value.value = state.consolidado.total_consolidado || 0
              break
          }
        })
      })
  }

}
