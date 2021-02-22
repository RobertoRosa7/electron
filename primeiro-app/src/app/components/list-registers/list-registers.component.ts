import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Register } from 'src/app/models/models';

@Component({
  selector: 'app-list-registers',
  templateUrl: './list-registers.component.html',
  styleUrls: ['./list-registers.component.scss']
})
export class ListRegistersComponent implements OnInit {
  @Input() public item: any
  @Output() public send = new EventEmitter()
  
  public isMobile: boolean

  constructor(
    private _breakpoint: BreakpointObserver
  ) { 
    this._breakpoint.observe([Breakpoints.XSmall]).subscribe(result => this.isMobile = !!result.matches)
  }

  ngOnInit(): void {
  }

  public edit(event: Event, payload: Register): void {
    this.send.emit({ event, payload, action: 'edit' })
  }

  public del(event: Event, payload: Register): void {
    this.send.emit({ event, payload, action: 'del' })
  }
  public formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 }).format(valor)
  }
}
