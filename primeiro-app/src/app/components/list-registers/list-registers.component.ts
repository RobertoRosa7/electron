import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Store } from '@ngrx/store'
import { Register } from 'src/app/models/models'
import * as actionsRegisters from '../../actions/registers.actions'

@Component({
  selector: 'app-list-registers',
  templateUrl: './list-registers.component.html',
  styleUrls: ['./list-registers.component.scss']
})
export class ListRegistersComponent implements OnInit {
  @Input() public item: Register
  @Output() public send = new EventEmitter()

  public isMobile: boolean
  private categories: string[] = []
  constructor(
    private _breakpoint: BreakpointObserver,
    private _store: Store
  ) {
    this._breakpoint.observe([Breakpoints.XSmall]).subscribe(result => this.isMobile = !!result.matches)
  }

  ngOnInit(): void {
    this._store.select(({ registers }: any) => registers.categories).subscribe(cat => this.categories = cat)
  }

  public edit(event: Event, payload: Register): void {
    this.send.emit({ event, payload, action: 'edit' })
  }

  public del(event: Event, payload: Register): void {
    this.send.emit({ event, payload, action: 'del' })
  }

  public details(payload: Register) {
    this.send.emit({ payload, action: 'details' })
  }

  public formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 }).format(valor)
  }

  public returnIcon(text: string): string {
    // console.log(this.categories.filter(i => i == text)[0])
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
