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

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})

export class RegistersComponent implements OnInit, AfterViewInit {
  public ELEMENT_DATA: Register[] = []

  private user_temp: User = {
    name: 'Anominous',
    email: 'anonimous@gmail.com',
    created_at: new Date('26-01-1987').getTime(),
    id: this._utils.generateUid(),
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
  }

  public ngOnInit(): void {
    this._store.select(({ registers }: any) => [...registers.all]).subscribe(register => {
      this.ELEMENT_DATA = register
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
      this.dataSource.sort = this.sort
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
      id: this._utils.generateUid(),
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
    console.log('edit: ', payload)
    this._dialog.open(DialogFormIncomingComponent, { data: payload })
  }

  public del(event: Event, payload: Register): void {
    event.stopPropagation()
    this._dialog.open(DialogConfirmComponent, { data: payload, width: '450px' })
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
