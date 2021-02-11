import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  public searchTerms: string | number

  constructor(
    private _router: Router
  ) {
  }

  public ngOnInit(): void {
    
  }

  public onSubmit(): void {
    this._router.navigate(['dashboard/result-search', { search: this.searchTerms }])
    this.searchTerms = ''
  }
}
