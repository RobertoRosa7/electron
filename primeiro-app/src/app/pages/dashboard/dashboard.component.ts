import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IpcService } from 'src/app/services/ipc.service';

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
    private _router: Router,
    private _ipcService: IpcService
  ) {
  }

  public ngOnInit(): void {
    this._ipcService.send('get', JSON.stringify({
      collection_dashboard: 'collection_dashboard',
      method: "POST",
      payload: []
    }))

    this._ipcService.on('got', (event: Electron.IpcMessageEvent, message: any) => {
      console.log(message)
    })
  }

  public onSubmit(): void {
    // this._router.navigate(['dashboard/result-search', { search: this.searchTerms }])
    this._ipcService.send('post', JSON.stringify({
      collection_dashboard: 'collection_dashboard',
      method: "POST",
      payload: this.searchTerms
    }))

    this._ipcService.on('posted', (event: Electron.IpcMessageEvent, message: any) => {
      console.log(message)
    })
    this.searchTerms = ''
  }
}
