import { AfterViewInit, Component, OnInit, DoCheck, KeyValueDiffers } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Register, User } from '../../../models/models'
import { Store } from '@ngrx/store'
import * as actionsRegister from '../../../actions/registers.actions'
import * as actionsDashboard from '../../../actions/dashboard.actions'
import { MatDialog } from '@angular/material/dialog'
import { DialogFormIncomingComponent } from 'src/app/components/dialog-form-incoming/dialog-form-incoming.component'
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component'
import { DashboardComponent } from '../dashboard.component'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { MatSelectChange } from '@angular/material/select'
import { DialogsComponent } from 'src/app/components/dialogs/dialogs.component'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})

export class RegistersComponent extends DashboardComponent implements OnInit, AfterViewInit, DoCheck {
  public ELEMENT_DATA: Register[] = []
  public ELEMENT_ORDER: any[] = []
  public tab: string = ''
  public inOutComing: string = 'all'
  public filterByDays: string = '7'
  public dataSource: any
  public isMobile: boolean
  public orderby: string = 'Data - decrescente'
  public total: number = 0
  public detail: Register
  public differ: any
  private onlyComing: string = ''
  public evolucaoDetail: any

  private user_temp: User = {
    name: 'Anominous',
    email: 'anonimous@gmail.com',
    created_at: (new Date('2003-10-01').getTime() / 1000),
    edit: false,
    credit_card: { brand: 'visa' }
  }

  public displayedColumns: string[] = [
    'Valor + crescente',
    'Valor - decrescente',
    'Data + crescente',
    'Data - decrescente',
    'Categoria + crescente',
    'Categoria - decrescente',
    'Descrição + crescente',
    'Descrição - decrescente',
  ]

  constructor(
    protected _store: Store,
    protected _snackbar: MatSnackBar,
    protected _dialog: MatDialog,
    protected _breakpointObserver: BreakpointObserver,
    protected _differs: KeyValueDiffers
  ) {
    super()
    _breakpointObserver.observe([Breakpoints.XSmall]).subscribe(result => this.isMobile = !!result.matches)
    this.differ = this._differs.find({}).create();
  }

  public ngOnInit(): void {
    this._store.select(({ registers }: any) => ({
      all: [...registers.all],
      tab: registers.tab,
      total: registers.total,
    })).subscribe(state => {
        this.tab = state.tab
        this.total = state.total
        this.ELEMENT_ORDER = state.all
        this.orderby ? this.makingOrdering(this.orderby) : this.ELEMENT_DATA = this.classificar(state.all)
      })
  }

  public ngAfterViewInit(): void { }

  public ngDoCheck() {
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem((item: any) => {
        if (item.key === 'total') {
          this.notification(`Total de registros: ${this.total}`)
        }
        if (item.key === 'onlyComing') {
          let text = this.onlyComing == 'incoming' ? 'Somente entrada' : 'Somente saída'
          this.notification(text)
        }
      })
    }
  }

  public listeningEventForm(event: Register): void {
    const payload: Register = {
      position: ((this.ELEMENT_DATA.length - 1) < 0) ? 1 : (this.ELEMENT_DATA.length + 1),
      category: event.category || 'Outros',
      created_at: event.created_at,
      updated_at: event.created_at,
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

  // public edit(_: Event, payload: Register): void {
  //   this._dialog.open(DialogFormIncomingComponent, { data: { ...payload, edit: true }, maxWidth: 600 })
  //     .beforeClosed().subscribe(res => {
  //       if (res) {
  //         this._store.dispatch(actionsRegister.UPDATE_REGISTER({
  //           payload: {
  //             ...payload,
  //             value: res.value,
  //             created_at: (new Date(res.date).getTime() / 1000),
  //             description: res.description,
  //             category: res.category
  //           }
  //         }))
  //       }
  //     })
  // }

  // public del(_: Event, payload: Register): void {
  //   this._dialog.open(DialogConfirmComponent, { data: payload })
  //     .beforeClosed().subscribe(response => {
  //       if (response) {
  //         this._store.dispatch(actionsRegister.DELETE_REGISTERS({ payload }))
  //       }
  //     })
  // }

  // public details(_: Event, payload: any): void {
  //   console.log(payload)
  //   this.openDialog(DialogsComponent, { data: { type: payload.action, data: payload.payload } })
  // }

  // public receivedPayload(payload: any) {
  //   switch (payload.action) {
  //     case 'edit':
  //       // this.edit(payload.event, payload.payload)
  //       break
  //     case 'del':
  //       // this.del(payload.event, payload.payload)
  //       break
  //     case 'details':
  //       // this.details(payload.event, payload)
  //       break
  //   }
  // }

  public orderbyChange(event: MatSelectChange): void {
    this.makingOrdering(event.value)
  }

  public inOutComingChange(event: MatSelectChange): void {
    this.makingInOutComing(event.value)
  }

  public filterByDaysChange(event: MatSelectChange): void {
    const payload: any = {}
    event.value === 'todos' ? payload['todos'] = event.value : payload['days'] = parseInt(event.value)
    this._store.dispatch(actionsRegister.INIT({ payload }))
  }

  private makingInOutComing(value: string): void {
    this._store.select(({ registers }: any) => [...registers.all]).subscribe(registers => {
      if (value === 'all') {
        this.ELEMENT_DATA = this.classificar(registers)
      } else {
        this.ELEMENT_DATA = this.classificar(registers.filter(v => v.type === value))
        this.onlyComing = value
      }
    })
  }

  private makingOrdering(value: string, registers?: Register[]): void {
    if (registers) this.ELEMENT_ORDER = registers
    const t = this.ELEMENT_ORDER.sort((a: any, b: any) => {
      switch (value) {
        case 'Data + crescente':
          return a.created_at - b.created_at
        case 'Data - decrescente':
          return b.created_at - a.created_at
        case 'Categoria + crescente':
          return b.category < a.category ? 1 : -1
        case 'Categoria - decrescente':
          return b.category > a.category ? 1 : -1
        case 'Valor + crescente':
          return a.value - b.value
        case 'Valor - decrescente':
          return b.value - a.value
        case 'Descrição + crescente':
          return a.description > b.description ? 1 : -1
        case 'Descrição - decrescente':
          return a.description < b.description ? 1 : -1
        default:
          return 0
      }
    })
    this.ELEMENT_DATA = this.classificar(t)
  }

  public classificar(lista: any) {
    return lista.map((i: any) =>
      ({ ...i, month: new Date(i.created_at * 1000) })).reduce((prev: any, current: any) => {
        var index = prev.findIndex((i: any) => new Date(i.month).getMonth() == new Date(current.month).getMonth())
        if (index < 0) {
          index = prev.length
          prev.push({ month: current.month, lista: [] })
        }
        prev[index].lista.push(current)
        return prev
      }, []).map((item: any) => ({ ...item, month: new Date(item.month).getTime() }))
  } 
}
