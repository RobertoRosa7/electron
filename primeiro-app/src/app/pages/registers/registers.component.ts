import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { PeriodicElement } from '../../models/models'
import { Store } from '@ngrx/store'
import * as actions from '../../actions/registers.actions'

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})

export class RegistersComponent implements OnInit, AfterViewInit {
  public ELEMENT_DATA: PeriodicElement[] = []

  public displayedColumns: string[] = ['position', 'category', 'value', 'date']
  public dataSource: any

  @ViewChild(MatSort) public sort: MatSort

  constructor(
    private _sn: MatSnackBar,
    private _st: Store
  ) {
    this._st.dispatch(actions.GET_REGISTERS())
  }

  public ngOnInit(): void {
    this._st.select(({ registers }: any) => [...registers.all]).subscribe(register => {
      this.ELEMENT_DATA = register
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
    })
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
  }

  public listeningEventForm(event: any): void {
    let name: string = event['operation'] === 'incoming' ? 'Entrada' : 'Saída'
    let position = ((this.ELEMENT_DATA.length - 1) < 0) ? 1 : (this.ELEMENT_DATA.length + 1)
    this._sn.open(`Registro de "${name}" foi criado com sucesso.`, 'Ok', { duration: 3000 })
    this._st.dispatch(actions.ADD_REGISTERS({
      payload: {
        position,
        category: 'Outros',
        date: event['created_at'],
        type: event['operation'],
        value: event['value'],
        status: 'pending',
        id: position
      }
    }))
  }

  public getRowTable(row: any): void {
    console.log(row)
  }

}
