import { AfterViewInit, Component, OnInit, DoCheck, KeyValueDiffers, ViewChild, ElementRef } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Register, User } from '../../../models/models'
import { Store } from '@ngrx/store'
import * as actionsRegister from '../../../actions/registers.actions'
import { MatDialog } from '@angular/material/dialog'
import { DashboardComponent } from '../dashboard.component'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { MatSelectChange } from '@angular/material/select'
import { AngularCreatePdfService } from 'angular-create-pdf'

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})

export class RegistersComponent extends DashboardComponent implements OnInit, AfterViewInit, DoCheck {
  @ViewChild('extrato') public extrato: ElementRef

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
  public totalDespesa: number = 0
  public totalReceita: number = 0
  public aPagar: number = 0
  public aReceber: number = 0
  public totalPercent: number = 0
  public totalGeral: number = 0
  public dateNow: Date = new Date()
  public isNegative: boolean = false
  public all_days_period: number = 0
  public days: number = 0;

  public user_temp: User = {
    name: 'Roberto Rosa',
    email: 'roberto.rosa7@gmail.com',
    created_at: (new Date('2003-10-01').getTime() / 1000),
    edit: false,
    credit_card: { brand: 'visa' },
    cpf: 36212891869
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
    protected _differs: KeyValueDiffers,
    protected _createPdf: AngularCreatePdfService,
  ) {
    super()
    _breakpointObserver.observe([Breakpoints.XSmall]).subscribe(result => this.isMobile = !!result.matches)
    this.differ = this._differs.find({}).create();
  }

  public ngOnInit(): void {
    this._store.select(({ registers, dashboard }: any) => ({
      all: [...registers.all],
      tab: registers.tab,
      total: registers.total,
      despesas: registers.total_despesas,
      receita: registers.total_receita,
      a_pagar: dashboard.consolidado.a_pagar,
      a_receber: dashboard.consolidado.a_receber,
      total_credit: dashboard.consolidado.total_credit,
      total_debit: dashboard.consolidado.total_debit,
      all_days_period: registers.all_days_period
    })).subscribe(state => {
      this.tab = state.tab
      this.total = state.total
      this.totalDespesa = state.despesas
      this.totalReceita = state.receita
      this.aPagar = state.a_pagar
      this.aReceber = state.a_receber
      this.ELEMENT_ORDER = state.all
      this.totalPercent = ((state.total_debit / state.total_credit) * 100) >= 100 ? 100 : (state.total_debit / state.total_credit) * 100
      this.totalGeral = (this.totalReceita - this.totalDespesa)
      this.all_days_period = state.all_days_period

      if (this.filterByDays !== 'todos') this.days = parseInt(this.filterByDays)
      if (this.totalGeral < 0) {
        this.isNegative = true
        this.totalGeral = Math.abs(this.totalGeral)
      } else {
        this.isNegative = false
      }

      this.orderby ? this.makingOrdering(this.orderby) : this.ELEMENT_DATA = this.classificar(state.all)
      this.logo = './assets/' + this.getTheme()
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

  public orderbyChange(event: MatSelectChange): void {
    this.makingOrdering(event.value)
  }

  public inOutComingChange(event: MatSelectChange): void {
    this.makingInOutComing(event.value)
  }

  public filterByDaysChange(event: MatSelectChange): void {
    const payload: any = {}
    if (event.value === 'todos') {
      this.days = this.all_days_period
      payload['todos'] = event.value
    } else {
      this.days = parseInt(event.value)
      payload['days'] = parseInt(event.value)
    }
    this._store.dispatch(actionsRegister.INIT({ payload }))
  }

  private makingInOutComing(value: string): void {
    this._store.select(({ registers }: any) => [...registers.all]).subscribe(registers => {
      if (value === 'all') {
        this.ELEMENT_DATA = this.classificar(registers)
      } else if (value === 'pending') {
        this.ELEMENT_DATA = this.classificar(registers.filter(v =>
          (v.status === 'pendente a pagar' || v.status === 'pendente a receber')))
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
          return this.cleanText(b.category) < this.cleanText(a.category) ? 1 : -1
        case 'Categoria - decrescente':
          return this.cleanText(b.category) > this.cleanText(a.category) ? 1 : -1
        case 'Valor + crescente':
          return a.value - b.value
        case 'Valor - decrescente':
          return b.value - a.value
        case 'Descrição + crescente':
          return this.cleanText(a.description) > this.cleanText(b.description) ? 1 : -1
        case 'Descrição - decrescente':
          return this.cleanText(a.description) < this.cleanText(b.description) ? 1 : -1
        default:
          return 0
      }
    })
    this.ELEMENT_DATA = this.classificar(t)
  }

  public classificar(lista: any) {
    return lista.map((i: any) =>
      ({ ...i, month: new Date(i.created_at * 1000) })).reduce((prev: any, current: any) => {
        let index = prev.findIndex((i: any) => new Date(i.month).getMonth() == new Date(current.month).getMonth())
        if (index < 0) {
          index = prev.length
          prev.push({ month: current.month, lista: [] })
        }
        prev[index].lista.push(current)
        return prev
      }, []).map((item: any) => ({ ...item, month: new Date(item.month).getTime() }))
  }

  public downloadPdf(el: any): void {
    // setTimeout(() => this._createPdf.createPdf(el, `extrato${new Date().toLocaleDateString()}`), 200)
  }
  public imprimir() {
    window.print()
  }
}
