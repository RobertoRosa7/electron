import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Register } from 'src/app/models/models'
import * as actionsRegister from '../../actions/registers.actions'
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component'
import { DialogFormIncomingComponent } from '../dialog-form-incoming/dialog-form-incoming.component'
import { DialogsComponent } from '../dialogs/dialogs.component'

@Component({
  selector: 'app-list-registers',
  templateUrl: './list-registers.component.html',
  styleUrls: ['./list-registers.component.scss']
})
export class ListRegistersComponent implements OnInit {
  @Input() public item: Register
  @Output() public send = new EventEmitter()

  public isMobile: boolean

  constructor(
    private _breakpoint: BreakpointObserver,
    private _store: Store,
    private _dialog: MatDialog
  ) {
    this._breakpoint.observe([Breakpoints.XSmall]).subscribe(result => this.isMobile = !!result.matches)
  }

  ngOnInit(): void {
  }

  public edit(_: Event, payload: Register): void {
    this._dialog.open(DialogFormIncomingComponent, { data: { ...payload, edit: true }, panelClass: 'dialog-default' })
      .beforeClosed().subscribe(res => {
        if (res) {
          this._store.dispatch(actionsRegister.UPDATE_REGISTER({
            payload: {
              ...payload,
              value: res.value,
              created_at: (new Date(res.date).getTime() / 1000),
              description: res.description,
              category: res.category
            }
          }))
        }
      })
  }

  public del(_: Event, payload: Register): void {
    this._dialog.open(DialogConfirmComponent, { data: payload, panelClass: 'dialog-default' })
      .beforeClosed().subscribe(response => {
        if (response) {
          this._store.dispatch(actionsRegister.DELETE_REGISTERS({ payload }))
        }
      })
  }

  public details(_: Event, payload: any): void {
    this._dialog.open(DialogsComponent, { data: { type: 'details', data: payload }, panelClass: 'dialog-default' })
  }

  public formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 }).format(valor)
  }


  public returnIcon(text: string): string {
    switch (this.cleanText(text)) {
      case 'alimentacao':
        return 'restaurant'
      case 'transporte':
        return 'train'
      case 'banco':
        return 'account_balance'
      case 'trabalho':
        return 'work_outline'
      case 'vestuario':
        return 'checkroom'
      case 'outros':
        return 'drag_indicator'
      case 'pessoal':
        return 'perm_identity'
      case 'internet':
        return 'swap_vert'
      case 'agua_e_luz':
        return 'payment'
      default:
        return ''
    }
  }

  public cleanText(text: string | undefined = ''): string {
    return text.toLowerCase().replace(' ', '_').replace('&', 'e').replace('á', 'a').replace('ã', 'a')
      .replace('ç', 'c').replace('õ', 'o')
  }
}
