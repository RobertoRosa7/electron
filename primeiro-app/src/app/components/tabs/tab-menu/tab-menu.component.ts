import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actionsRegisters from '../../../actions/registers.actions'

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class TabMenuComponent implements OnInit {
  @Input() public label: string
  @Input() public icon: string
  @Input() public target: string = 'read'

  public tabActive: boolean

  constructor(
    private _store: Store
  ) { }

  ngOnInit(): void {
    this._store.select(({ registers }: any) => registers.tab).subscribe(tab => this.tabActive = !!(tab === this.target))
  }

  public selectedTab(): void {
    this._store.dispatch(actionsRegisters.GET_TAB({ payload: this.target }))
  }
}
