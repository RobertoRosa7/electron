import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Register, User } from '../../../models/models'
import { Store } from '@ngrx/store'
import * as actions from '../../../actions/registers.actions'
import { UtilsService } from 'src/app/utils/utis.service'
import { MatDialog } from '@angular/material/dialog'
import { DialogFormIncomingComponent } from 'src/app/components/dialog-form-incoming/dialog-form-incoming.component'
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component'
import { filter, map } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})

export class RegistersComponent implements OnInit, AfterViewInit {
  public ELEMENT_DATA: Register[] = []
  public tab: string = ''

  private user_temp: User = {
    name: 'Anominous',
    email: 'anonimous@gmail.com',
    created_at: new Date('10-01-2003').getTime(),
    edit: false,
    credit_card: { brand: 'visa' }
  }

  public displayedColumns: string[] = ['position', 'category', 'value', 'created_at', 'actions']
  public dataSource: any

  @ViewChild(MatSort) public sort: MatSort

  constructor(
    private _snackbar: MatSnackBar,
    private _store: Store,
    private _utils: UtilsService,
    private _dialog: MatDialog
  ) {
    this._store.dispatch(actions.INIT())
    this._store.dispatch(actions.GET_TAB({ payload: 'read' }))

  }

  public ngOnInit(): void {
    this._store.select(({ registers }: any) => [...registers.all]).subscribe(register => {
      this.ELEMENT_DATA = register
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
      this.dataSource.sort = this.sort
    })

    this._store.select(({ registers }: any) => registers.tab).subscribe(tab => this.tab = tab)
    this._store.select(({ http_error }: any) =>
      http_error.errors.filter((e: any) => e.source === 'fetch_registers')).subscribe(err => {
        if (err.length > 0) {
          const pay = err[0]
          console.log(pay)
          this._snackbar.open('Erro ao buscar registros', 'ok', { duration: 3000 })
        }
      })
  }

  public ngAfterViewInit(): void { }

  public listeningEventForm(event: Register): void {
    const payload: Register = {
      position: ((this.ELEMENT_DATA.length - 1) < 0) ? 1 : (this.ELEMENT_DATA.length + 1),
      category: event.category || 'Outros',
      created_at: event.created_at,
      type: event.type,
      value: event.value,
      status: 'pending',
      brand: event.brand || this.user_temp.credit_card?.brand,
      edit: false,
      user: this.user_temp,
      description: event.description || 'Sem descrição'
    }

    this._store.dispatch(actions.ADD_REGISTERS({ payload }))
    this._snackbar.open(`Registro de "${event.type === 'incoming' ? 'Entrada' : 'Saída'}" foi criado com sucesso.`, 'Ok', { duration: 3000 })
  }

  public openDetails(event: Event, payload: Register): void {
    event.stopPropagation()
    console.log('open details: ', payload)
  }

  public edit(event: Event, payload: Register): void {
    event.stopPropagation()
    this._dialog.open(DialogFormIncomingComponent, { data: { ...payload, edit: true } })
      .beforeClosed().subscribe(res => {
        if (res) {
          const newpayload = { ...payload, value: res.value, created_at: new Date(res.date).getTime() }
          this._store.dispatch(actions.UPDATE_REGISTER({ payload: newpayload }))
          // this._snackbar.open(`Registro de "${payload.category}" foi excluído com sucesso.`, 'Ok', { duration: 3000 })
        }
      })
  }

  public del(event: Event, payload: Register): void {
    event.stopPropagation()
    this._dialog.open(DialogConfirmComponent, { data: payload })
      .beforeClosed().subscribe(response => {
        if (response) {
          this._store.dispatch(actions.DELETE_REGISTERS({ payload }))
          this._snackbar.open(`Registro de "${payload.category}" foi excluído com sucesso.`, 'Ok', { duration: 3000 })
        }
      })
  }

  public formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 }).format(valor)
  }

}
