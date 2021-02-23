import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ActionsSubject, Store } from '@ngrx/store'
import { IpcService } from 'src/app/services/ipc.service'
import * as actionsErrors from '../../actions/errors.actions'
import * as actionsRegister from '../../actions/registers.actions'
import { MatSnackBar } from '@angular/material/snack-bar'
import { filter } from 'rxjs/operators'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'


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
  public consolidado: number = 0
  public isMobile: boolean = false

  constructor(
    protected _ipcService?: IpcService,
    protected _store?: Store,
    protected _snackbar?: MatSnackBar,
    protected _as?: ActionsSubject,
    protected _breakpoint?: BreakpointObserver
  ) {
    this._breakpoint?.observe([Breakpoints.XSmall]).subscribe(result => this.isMobile = !!result.matches)
    this._store?.dispatch(actionsRegister.INIT({ payload: { days: 7 } }))
    this._store?.dispatch(actionsErrors.GET_STATUS_CODE())
    this._store?.dispatch(actionsRegister.GET_TAB({ payload: 'read' }))
  }

  public ngOnInit(): void {
    this._ipcService?.send('get', JSON.stringify({
      collection_dashboard: 'collection_dashboard',
      method: "POST",
      payload: []
    }))

    this._ipcService?.on('got', (_: Electron.IpcMessageEvent, message: any) => {
      console.log(message)
    })

    this._store?.select(({ http_error, registers }: any) =>
      ({ http_error, consolidado: registers.consolidado })).subscribe(state => {
        this.consolidado = state.consolidado.total_consolidado

        if (state.http_error.error) {
          state.http_error.errors.forEach((e: any) => this.handleError(e))
        }
      })

    this._as?.pipe(filter(a => a.type === actionsErrors.actionsTypes.SET_SUCCESS))
      .subscribe(({ payload }: any) => {
        const name: string = this.fetchNames(payload)
        this._snackbar?.open(`${name}`, 'Ok', { duration: 3000 })
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
    const name: string = this.fetchNames(error.source)
    this._snackbar?.open(`Error: ${name} code: ${error.status}`, 'Ok', { duration: 3000 })
  }

  public formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 }).format(valor)
  }

  private fetchNames(name: string): string {
    switch (name) {
      case 'fetch_registers':
        return 'Registros carregados'
      case 'update_register':
        return 'Registro atualizado'
      case 'delete_register':
        return 'Registro excluído'
      case 'new_register':
        return 'Novo registro'
      case 'status_code':
        return 'Status code: '
      default:
        return ''
    }
  }
}
