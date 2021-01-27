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
      icon: '',
      value: 0,
      color: 'primary'
    },
    {
      title: 'Saída',
      icon: '',
      value: 0
    },
    {
      title: 'Consolidado',
      icon: '',
      value: 0
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
