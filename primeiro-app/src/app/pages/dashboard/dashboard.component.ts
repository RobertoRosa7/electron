import { Component, OnInit } from '@angular/core';

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
      value: 29.99,
    },
    {
      title: 'Saída',
      icon: 'money_off',
      value: -23.99
    },
    {
      title: 'Consolidado',
      icon: 'account_balance',
      value: 0
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
