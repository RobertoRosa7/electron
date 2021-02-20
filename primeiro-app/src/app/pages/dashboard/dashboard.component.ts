import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IpcService } from 'src/app/services/ipc.service';
import * as actionsErrors from '../../actions/errors.actions'
import * as actionDashboard from '../../actions/dashboard.actions'
import { MatSnackBar } from '@angular/material/snack-bar';

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
    protected _ipcService?: IpcService,
    protected _store?: Store,
    protected _snackbar?: MatSnackBar
  ) {
    this._store?.dispatch(actionDashboard.INIT())
    this._store?.dispatch(actionsErrors.GET_STATUS_CODE())
  }

  public ngOnInit(): void {
    this._ipcService?.send('get', JSON.stringify({
      collection_dashboard: 'collection_dashboard',
      method: "POST",
      payload: []
    }))

    this._ipcService?.on('got', (event: Electron.IpcMessageEvent, message: any) => {
      console.log(message)
    })

    this._store?.select(({ http_error }: any) => http_error.errors).subscribe(err => {
      if (err.length > 0) {
        err.forEach((e: any) => this.handleError(e))
      }
    })
  }

  public onSubmit(): void {
    // this._router.navigate(['dashboard/result-search', { search: this.searchTerms }])
    if (this.searchTerms != '') {
      this._ipcService?.send('search', JSON.stringify({
        collection_dashboard: 'collection_registers',
        search: this.searchTerms
      }))
      this._ipcService?.on('searched', (event: Electron.IpcMessageEvent, message: any) => {
        console.log(message)
      })
    }
    this.searchTerms = ''
  }

  public handleError(error: any): void {
    let name: string = ''
    switch (error.source) {
      case 'fetch_registers':
        name = 'Registros carregados'
        break
      case 'update_register':
        name = 'Registro atualizado'
        break
      case 'delete_register':
        name = 'Registro excluído'
        break
      case 'new_register':
        name = 'Novo registro'
        break
      case 'status_code':
        name = 'Status code: ' + error.status
        break
    }

    this._snackbar?.open(`Error - ${name}`, 'Ok', { duration: 3000 })
  }

  public formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 }).format(valor)
  }
}
