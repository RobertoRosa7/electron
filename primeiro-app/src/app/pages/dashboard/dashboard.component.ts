import { Component, OnInit, DoCheck, KeyValueDiffers } from '@angular/core'
import { Router } from '@angular/router'
import { ActionsSubject, Store } from '@ngrx/store'
import { IpcService } from 'src/app/services/ipc.service'
import * as actionsErrors from '../../actions/errors.actions'
import * as actionsRegister from '../../actions/registers.actions'
import * as actionsDashboard from '../../actions/dashboard.actions'
import { MatSnackBar } from '@angular/material/snack-bar'
import { filter } from 'rxjs/operators'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { ScrollService } from 'src/app/services/scroll.service'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, DoCheck {
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
      name: 'Registros',
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
  public json: any
  public scroll: number
  public buttonToTop: boolean
  public type: string
  public value: number
  public showErrors: boolean = false
  public isActive: string = ''
  public differ: any

  constructor(
    protected _ipcService?: IpcService,
    protected _store?: Store,
    protected _snackbar?: MatSnackBar,
    protected _as?: ActionsSubject,
    protected _breakpoint?: BreakpointObserver,
    protected _scrollService?: ScrollService,
    protected _router?: Router,
    protected _differs?: KeyValueDiffers,
    protected _dialog?: MatDialog
  ) {
    this._router?.events.subscribe((u: any) => this.isActive = u.url)
    this._breakpoint?.observe([Breakpoints.XSmall]).subscribe(result => this.isMobile = !!result.matches)
    this._store?.dispatch(actionsDashboard.INIT_DASHBOARD())
    this._store?.dispatch(actionsRegister.INIT({ payload: { days: 7 } }))
    this._store?.dispatch(actionsErrors.GET_STATUS_CODE())
    this._store?.dispatch(actionsRegister.GET_TAB({ payload: 'read' }))
    this.differ = this._differs?.find({}).create()
  }

  public ngOnInit(): void {
    this._ipcService?.send('get', JSON.stringify({
      collection_dashboard: 'collection_dashboard',
      method: "POST",
      payload: []
    }))

    // this._ipcService?.on('got', (_: Electron.IpcMessageEvent, message: any) => {
    //   console.log(message)
    // })

    this._store?.select(({ http_error, registers, dashboard }: any) =>
      ({ http_error, consolidado: dashboard.consolidado, all: registers.all })).subscribe(state => {
        this.consolidado = state.consolidado.total_consolidado
        if (state.http_error.errors) {
          state.http_error.errors.forEach((e: any) => this.handleError(e))
        }
      })

    this._as?.pipe(filter(a => a.type === actionsErrors.actionsTypes.SET_SUCCESS))
      .subscribe(({ payload }: any) => {
        const name: string = this.fetchNames(payload)
        this._snackbar?.open(`${name}`, 'Ok', { duration: 3000 })
      })

    this._scrollService?.getScrollAsStream().subscribe(per => this.buttonToTop = (per >= 30))
  }

  public ngDoCheck() {
    const change = this.differ.diff(this)
    if (change) {
      change.forEachChangedItem((item: any) => {
        if (item.key === 'isActive') {
          this._store?.dispatch(actionsRegister.GET_TAB({ payload: 'read' }))
        }
      })
    }
  }
  public onSubmit(): void {
    // this._router.navigate(['dashboard/result-search', { search: this.searchTerms }])
    if (this.searchTerms != '') {
      this._ipcService?.send('search', JSON.stringify({
        collection_dashboard: 'collection_registers',
        search: this.searchTerms
      }))
      this._ipcService?.on('searched', (_: Electron.IpcMessageEvent, message: any) => {
        console.log(message)
      })
    }
    this.searchTerms = ''
  }

  public handleError(error: any): void {
    this.showErrors = true
    const name: string = this.fetchNames(error.source)
    this.notification(`Error: ${name} code: ${error.status}`)
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
      case 'fetch_evolucao_detail':
        return 'ao carregar gráfico'
      default:
        return ''
    }
  }

  public goToTop() {
    window.scrollTo(0, 0)
  }

  public returnClass(): string {
    if (this.consolidado > 0) {
      return 'cards-money cards-money-on'
    } else if (this.consolidado > 0 && this.type === 'outcoming') {
      return 'cards-money cards-debit'
    } else if (this.consolidado < 0) {
      return 'cards-money cards-money-off'
    } else {
      return 'cards-money'
    }
  }

  public notification(str: string, time: number = 3000): void {
    this._snackbar?.open(str, 'ok', { duration: time })
  }

  public openDialog(component: any, data: MatDialogConfig = {}) {
    const settings: MatDialogConfig = { ...data, panelClass: 'dialog-default' }
    return this._dialog?.open(component, settings)
  }
  
}
