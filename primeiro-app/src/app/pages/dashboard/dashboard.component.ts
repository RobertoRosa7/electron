import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store'
import * as actionDashboard from '../../actions/dashboard.actions'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public menuList: any[] = [
    {
      link: '/',
      name: 'Home',
      icon: 'home'
    },
    {
      link: '/dashboard',
      name: 'Dashboard',
      icon: 'dashboard'
    },
    {
      link: '/dashboard/registers',
      name: 'Cadastro',
      icon: 'create'
    },
    {
      link: '/dashboard/settings',
      name: 'Configurações',
      icon: 'settings'
    },
  ]
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

  public searchTerms: string | number

  constructor(
    private _store: Store,
    private _router: Router
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
  }

  public onSubmit(): void {
    this._router.navigate(['dashboard/result-search', { search: this.searchTerms }])
    this.searchTerms = ''
  }
}
