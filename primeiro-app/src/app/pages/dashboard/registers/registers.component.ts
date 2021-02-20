import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Register, User } from '../../../models/models'
import { Store } from '@ngrx/store'
import * as actionsRegister from '../../../actions/registers.actions'
import { MatDialog } from '@angular/material/dialog'
import { DialogFormIncomingComponent } from 'src/app/components/dialog-form-incoming/dialog-form-incoming.component'
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component'
import { DashboardComponent } from '../dashboard.component'

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})

export class RegistersComponent extends DashboardComponent implements OnInit, AfterViewInit {
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
    protected _store: Store,
    protected _snackbar: MatSnackBar,
    protected _dialog: MatDialog
  ) {
    super()
    // this._store.dispatch(actionsRegister.INIT())
    this._store.dispatch(actionsRegister.GET_TAB({ payload: 'read' }))
  }

  public ngOnInit(): void {
    this._store.select(({ registers }: any) => registers.tab).subscribe(tab => this.tab = tab)
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
      edit: false,
      user: this.user_temp,
      description: event.description || 'Sem descrição'
    }

    this._store.dispatch(actionsRegister.ADD_REGISTERS({ payload }))
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
          this._store.dispatch(actionsRegister.UPDATE_REGISTER({ payload: newpayload }))
        }
      })
  }

  public del(event: Event, payload: Register): void {
    event.stopPropagation()
    this._dialog.open(DialogConfirmComponent, { data: payload })
      .beforeClosed().subscribe(response => {
        if (response) {
          this._store.dispatch(actionsRegister.DELETE_REGISTERS({ payload }))
        }
      })
  }
}
